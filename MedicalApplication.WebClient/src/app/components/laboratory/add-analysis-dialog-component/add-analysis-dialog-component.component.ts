import { Component, OnInit, Output, Inject, OnDestroy } from '@angular/core';
import { AnalysisModel } from '../laboratory.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PatientService } from '../../../services/patient.service';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-analysis-dialog-component',
  templateUrl: './add-analysis-dialog-component.component.html',
  styleUrls: ['./add-analysis-dialog-component.component.css'],
  providers: [PatientService]
})
export class AddAnalysisDialogComponentComponent implements OnInit, OnDestroy {

  private analysisSelected: AnalysisModel[];
  private _selectionSubscription: ISubscription;
  page = {CurrentPage: 0, TableViewPage: 1, PageSize: 5, Length: 5, PageSizeOption: [5] };
  analyzesList: AnalysisModel[];

  constructor(private dialogRef: MatDialogRef<AddAnalysisDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) data, private patientService: PatientService,
    private toastr: ToastrService) {
      this.analysisSelected = data;
     }

  ngOnInit() {
    this.getAnalyzes();
  }

  getAnalyzes() {
    this._selectionSubscription = this.patientService.GetAnalyzes(this.page.PageSize, this.page.TableViewPage)
    .subscribe(
      (res) => {
        console.log(res);
        this.analyzesList = res.Data;
        this.page.Length = res.Count;
     },
     (err: any) => {
     },
     () => {
     });
  }

  ngOnDestroy(): void {
    if (this._selectionSubscription) {
      this._selectionSubscription.unsubscribe();
    }
  }

  onFinish() {
    this.dialogRef.close(this.analysisSelected);
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
    this.getAnalyzes();
  }
  addAnalyze(analyze: AnalysisModel) {
    this.analysisSelected.push(analyze);
    this.toastr.success('Analyze added successfully');
  }

  wasAddedBefore(analyze: AnalysisModel) {
    if (this.analysisSelected) {
      const count = this.analysisSelected.filter(x => x.Guid === analyze.Guid );
      return count.length > 0 ? true : false;
    } else {
      return false;
    }
  }
}
