import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  displayedColumns = ['position', 'FirstName', 'LastName', 'CNP', 'Sex','Address'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  FirstName: string;
  LastName:string;
  CNP: string;
  Sex:number;
  position: number;
  Address:string;
  
}

const ELEMENT_DATA: Element[] = [
  {position: 1, FirstName: 'Hydrogen', LastName:"",CNP: "1.0079", Sex:1,Address:""},
  {position: 2, FirstName: 'Helium', LastName:"",CNP: "4.0026", Sex:1,Address:""},
  {position: 3, FirstName: 'Lithium', LastName:"",CNP: "6.941", Sex:1,Address:""},
  {position: 4, FirstName: 'Beryllium', LastName:"",CNP: "9.0122", Sex:1,Address:"",},
  {position: 5, FirstName: 'Boron', LastName:"",CNP: "10.811", Sex:1,Address:""},
  {position: 20, FirstName: 'Calcium', LastName:"",CNP: "40.078", Sex:1,Address:""},
];

