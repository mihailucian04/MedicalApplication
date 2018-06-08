import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { PatientService } from '../../services/patient.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers: [PatientService]
})

export class PatientComponent implements OnInit, OnDestroy {
  displayedColumns = ['FirstName', 'LastName', 'Sex', 'CNP', 'Address', 'Telephone'];
  dataSource: MatTableDataSource<PatientModel>;
  private _selectionSubscription: ISubscription;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private patientService: PatientService) {

  }

  ngOnInit() {
    this.GetAllPatients();
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

  ngOnDestroy(): void {
    if (this._selectionSubscription) {
        this._selectionSubscription.unsubscribe();
    }
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
}
