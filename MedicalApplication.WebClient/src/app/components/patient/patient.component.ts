import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginatorIntl } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { PatientService } from '../../services/patient.service';
import { ISubscription } from 'rxjs/Subscription';
import { AddPatientDialogComponent } from './add-patient-dialog/add-patient-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PermissionsService } from '../../services/permissions.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [PatientService]
})

export class PatientComponent implements OnInit, OnDestroy, DoCheck {
  displayedColumns = ['Select', 'FirstName', 'LastName', 'Sex', 'CNP', 'Address', 'Telephone'];
  dataSource: MatTableDataSource<PatientModel>;
  private _selectionSubscription: ISubscription;
  private isDirty = false;
  private patients: PatientModel[];
  page = {CurrentPage: 0, TableViewPage: 1, PageSize: 10, Length: 10, PageSizeOption: [10] };
  isLoaded = false;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private patientService: PatientService, public dialog: MatDialog,
    private toastr: ToastrService, private router: Router, public permission: PermissionsService) {

  }

  ngOnInit() {
    this.GetAllPatients();
  }

  ngDoCheck() {
    if (this.isDirty === true) {
      this.GetAllPatients();
      this.isDirty = false;
     }
  }

  private GetAllPatients() {
    this._selectionSubscription = this.patientService
    .getAllPatients(localStorage.getItem('medic_guid'), this.page.PageSize, this.page.TableViewPage)
    .subscribe(
      (res) => {
        console.log(res);
        this.patients = res.Data;
        this.page.Length = res.AllPatients;
        this.dataSource = new MatTableDataSource(this.patients);
        this.isLoaded = true;
     },
     (err: any) => {

     },
     () => {
     });
  }

  openDetails(param1,p) {
    console.log('sasd' + param1);
    console.log(  p);
    const patientDetails=p;
     //const  dsa = this.patientService.getPatientById(p.Guid);
     //console.log('dsa = ' + dsa);
    const dialogRef = this.dialog.open<PatientDetailsComponent, PatientModel>(PatientDetailsComponent, {
      data: patientDetails,
      height: '400px',
       width: '500px'
    });
  }
  addPatient() {
    const dialogRef = this.dialog.open<AddPatientDialogComponent, PatientModel>(AddPatientDialogComponent, {
      data: {
        Guid: '',
        MedicGuid: '',
        FirstName: '',
        LastName: '',
        Sex: 1,
        CNP: '',
        Address: '',
        Assuranced: false,
        Telephone: '',
        PatientFile: '',
        IsDeleted: false,
        DOB: new Date(),
        LocDeleted: false
      },
      height: '400px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.isDirty = true;
      } else {
      }
      console.log(`Dialog result: ${result}`);
    });
  }
  private unsubscribe() {
    if (this._selectionSubscription) {
      this._selectionSubscription.unsubscribe();
    }
    }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  isPatientSelectedForDelete() {
    if ( this.patients) {
    const t = this.patients.find(x => x.LocDeleted === true);
    return t;
  }
  }

  check(checkbox: any, elem: PatientModel) {
    console.log(checkbox,elem)
    const index = this.patients.findIndex(x => x.Guid === elem.Guid);
    this.patients[index].LocDeleted = checkbox.checked;
  }

  deletePatient() {
    this.patients.forEach(patient => {
      if (patient.LocDeleted === true) {
      this.patientService.deletePatients(patient.Guid)
      .subscribe(
        (data) => {
          console.log('deleted patient: ' + patient.FirstName);
          this.isDirty = true;
        },
        (err: any) => {
        },
        () => {
        });
      }
      });
  }

  handlePage(event) {
    console.log(event);
    if (event.pageIndex > this.page.CurrentPage) {
      // to next page
      this.page.CurrentPage = event.pageIndex;
      this.page.TableViewPage += 1;
      this.isDirty = true;
    } else {
      // to previous page
      this.page.CurrentPage = event.pageIndex;
      this.page.TableViewPage -= 1;
      this.isDirty = true;
    }
  }
}

export interface PatientModel {
  LocDeleted: boolean;
  Guid: string;
  MedicGuid: string;
  FirstName: string;
  LastName: string;
  Sex: number;
  CNP: string;
  Address: string;
  Assuranced: boolean;
  Telephone: string;
  PatientFile: string;
  IsDeleted: boolean;
  DOB: Date;
}

export interface APIPatientResponse {
  Data: PatientModel[];
  AllPatients: number;
}
