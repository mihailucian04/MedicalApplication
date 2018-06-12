import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-user-role-laboratory',
  templateUrl: './user-role-laboratory.component.html',
  styleUrls: ['./user-role-laboratory.component.css'],
  providers: [PatientService]
})
export class UserRoleLaboratoryComponent implements OnInit, OnDestroy {


  mappingMedicAnalyzes: MappingMedigAnalyze[];
  page = {CurrentPage: 0, TableViewPage: 1, PageSize: 10, Length: 10, PageSizeOption: [10] };
  private _selectionSubscription: ISubscription;

  constructor(private toastr: ToastrService, private patientService: PatientService) { }

  ngOnInit() {
    this.getAnalyzes();
  }

  getAnalyzes(): any {
    this._selectionSubscription = this.patientService
    .getAnalyzesForLab(this.page.PageSize, this.page.TableViewPage)
    .subscribe(
      (res) => {
        console.log(res);
        this.mappingMedicAnalyzes = res.Data;
        this.page.Length = res.Count;

     },
     (err: any) => {
       console.log('laboratory error');
     },
     () => {
     }
    );
  }
  ngOnDestroy(): void {
    if (this._selectionSubscription) {
      this._selectionSubscription.unsubscribe();
    }
  }

  updateAnalyze(analyze) {

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
  }
}

export interface MappingMedigAnalyze {
    MappingGuid: string;
    MedicName: string;
    PatientName: string;
    CNP: string;
    AnalysisName: string;
    Result: string;
}
