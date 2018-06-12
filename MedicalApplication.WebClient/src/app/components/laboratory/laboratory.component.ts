import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientModel } from '../patient/patient.component';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISubscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { AddAnalysisDialogComponentComponent } from './add-analysis-dialog-component/add-analysis-dialog-component.component';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css'],
  providers: [PatientService]
})
export class LaboratoryComponent implements OnInit, OnDestroy {
  isLoaded = true;
  search: string;
  patientList: PatientModel[];
  analysisList: AnalysisModel[];
  private _selectionSubscription: ISubscription;
  page = {CurrentPage: 0, TableViewPage: 1, PageSize: 5, Length: 5, PageSizeOption: [5] };

  constructor(private patientService: PatientService, public dialog: MatDialog,
    private toastr: ToastrService, private router: Router) {
      this.analysisList = [];
     }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this._selectionSubscription) {
      this._selectionSubscription.unsubscribe();
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.isLoaded = false;
      this.searchMethod();
      // rest of your code
    }
  }

  searchMethod() {
    this._selectionSubscription = this.patientService
      .searchAllPatientsByFirstName(this.search, this.page.PageSize, this.page.TableViewPage)
      .subscribe(
        (res) => {
          console.log(res);
          this.patientList = res.Data;
          this.patientList.map(x => x.LocDeleted = false);
          this.page.Length = res.AllPatients;
          this.isLoaded = true;
       },
       (err: any) => {
         console.log('laboratory error');
       },
       () => {
       }
      );
  }

  isFirstTrue() {
    const selected = this.patientList.filter(x => x.LocDeleted === true);
    return selected.length === 1  ? true : false;
  }

  handlePage(event) {
    console.log(event);
    if (event.pageIndex > this.page.CurrentPage) {
      // to next page
      this.page.CurrentPage = event.pageIndex;
      this.page.TableViewPage += 1;
    } else {
      // to previous page
      this.page.CurrentPage = event.pageIndex;
      this.page.TableViewPage -= 1;
    }
    this.searchMethod();
  }
  sendToLab() {
    this._selectionSubscription = this.patientService
    .addAnalyzesToProcess(localStorage.getItem('medic_guid'),
    this.getSelectedPatientGuid(), this.getAnalyzesGuid())
    .subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('The analyze was sent to the laboratory.');
        this.patientList = [];
        this.analysisList = [];
     },
     (err: any) => {
       console.log('Please try later!');
     },
     () => {
     }
    );
  }

  getAnalyzesGuid(): string[] {
    const guids = this.analysisList.map(x => x.Guid);
    return guids;
  }
  addAnalysis() {
    const dialogRef = this.dialog.open<AddAnalysisDialogComponentComponent, AnalysisModel[]>(AddAnalysisDialogComponentComponent, {
      data: [].concat(this.analysisList), // this.analysisList,
      height: '600px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.analysisList = result;
        this.toastr.success('Analyzes added successfully');
        console.log(result);
      } else {
        if (this.analysisList.length === 0) {
          this.toastr.info('Please select at least one analyze and confirm!');
        }
      }
      console.log(`Dialog result: ${result}`);
    });
  }
  isPatientSelected() {
    if (this.patientList) {
      const selected = this.patientList.filter(x => x.LocDeleted === true);
      return selected.length > 0   ? true : false;
    }
    return false;
  }
  getSelectedPatientGuid (): string {
    return this.patientList.find(x => x.LocDeleted === true).Guid;
  }
  isAnalysisSelected() {
    if (this.analysisList) {
      return this.analysisList.length > 0   ? true : false;
    }
    return false;
  }
  removeAnalyze(analyze) {
    const index = this.analysisList.findIndex(x => x.Guid === analyze.Guid);
    if (index === 0) {
      this.analysisList.shift();
    } else if (index === this.analysisList.length - 1) {
      this.analysisList.pop();
    } else {
      this.analysisList.splice(index, 1);
    }
    this.toastr.success('Analyze removed!');
  }
}

export interface AnalysisModel {
  Guid: string;
  Name: string;
}

export interface AnalyzeResult {
  Data: AnalysisModel[];
  Count: number;
}
