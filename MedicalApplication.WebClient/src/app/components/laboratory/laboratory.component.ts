import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientModel } from '../patient/patient.component';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISubscription } from 'rxjs/Subscription';

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
  private _selectionSubscription: ISubscription;
  page = {CurrentPage: 0, TableViewPage: 1, PageSize: 5, Length: 5, PageSizeOption: [5] };

  constructor(private patientService: PatientService,
    private toastr: ToastrService, private router: Router) { }

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

}
