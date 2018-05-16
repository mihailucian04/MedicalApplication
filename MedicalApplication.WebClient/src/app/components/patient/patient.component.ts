import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { PatientService } from '../../services/patient.service';
//import * as X2JS from 'x2js';
import {Patient} from './patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  displayedColumns = ['FirstName', 'LastName', 'CNP', 'Sex', 'DateTime','Address','Telephone'];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor(private service: PatientService) { }

  ngOnInit() {
    console.log('in ngoninit');
    this.service.getPatientData()
    .subscribe(
      (result: Patient[]) => {
        this.dataSource = new MatTableDataSource(result);
      }
      );
  }

}
