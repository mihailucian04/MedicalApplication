import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  displayedColumns = ['position', 'name', 'surname', 'salon', 'bedNr'];
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
  name: string;
  surname: string;
  position: number;
  salon: string;
  bedNr: number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Daniel',surname: 'Ionescu', salon: '2A', bedNr: 1},
  {position: 2, name: 'Gheorghe',surname: 'Bacinovic', salon:'4B', bedNr: 1},
  {position: 3, name: 'Mariana',surname: 'Stanciu', salon: '2A', bedNr: 3},
  {position: 4, name: 'Roxana',surname: 'Tecau', salon: '2A', bedNr: 4},
  {position: 5, name: 'Valentin',surname: 'Mergea', salon: '1A', bedNr: 3},
  {position: 6, name: 'Ion',surname: 'Novac', salon: '3C', bedNr: 2},
];
