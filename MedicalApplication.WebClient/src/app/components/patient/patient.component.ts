import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { PatientService } from '../../services/patient.service';
import { ISubscription } from 'rxjs/Subscription';
import { AddPatientDialogComponent } from './add-patient-dialog/add-patient-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [PatientService]
})

export class PatientComponent implements OnInit, OnDestroy, DoCheck {
  displayedColumns = ['FirstName', 'LastName', 'Sex', 'CNP', 'Address', 'Telephone'];
  dataSource: MatTableDataSource<PatientModel>;
  private _selectionSubscription: ISubscription;
  private isDirty = false;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private patientService: PatientService, public dialog: MatDialog,
    private toastr: ToastrService, private router: Router) {

  }

  ngOnInit() {
    this.GetAllPatients();
  }

  ngDoCheck() {
    if (this.isDirty === true) {
      this.isDirty = false;
      this.GetAllPatients();
     }
  }

  private GetAllPatients() {
    this._selectionSubscription = this.patientService.getAllPatients(localStorage.getItem('medic_guid'))
    .subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
     },
     (err: any) => {

     },
     () => {
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
        DOB: new Date()
      },
      height: '400px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.isDirty = true;
      } else {
        // this.toastr.error('Please try again later!');
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
}

export interface PatientModel {
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
