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
  {position: 1, FirstName: 'Valentin', LastName:"Birac",CNP: "1930202394021", Sex:1,Address:"Str.Macinului"},
  {position: 2, FirstName: 'Mariana', LastName:"Gacinovic",CNP: "2830102394021", Sex:2,Address:"Str.Pinului"},
  {position: 3, FirstName: 'Alina', LastName:"Mergea",CNP: "2730202394021", Sex:2,Address:"Str.Victor Ansac"},
  {position: 4, FirstName: 'Gheorghe', LastName:"Tecau",CNP: "1880502394021", Sex:1,Address:"Str.Bulevardul Macului"},
  {position: 5, FirstName: 'Ion', LastName:"Stanciu",CNP: "1730202394021", Sex:1,Address:"Str.Mihai Eminescu"},
  {position: 6, FirstName: 'Darius', LastName:"Ionescu",CNP: "1630302394021", Sex:1,Address:"Str.Lugojului"},
];
