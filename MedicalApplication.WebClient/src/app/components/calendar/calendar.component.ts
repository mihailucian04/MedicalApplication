import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import 'fullcalendar';
import { PatientService } from '../../services/patient.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [PatientService]
})
export class CalendarComponent implements OnInit {
	private _selectionSubscription: ISubscription;
	page = {CurrentPage: 0, TableViewPage: 1, PageSize: 10, Length: 10, PageSizeOption: [10] };
	patients = [];
  constructor(private patientService: PatientService) { }

  ngOnInit() {
  this.GetAllPatients();

   }

   private GetAllPatients() {
    this._selectionSubscription = this.patientService
    .getAllPatients(localStorage.getItem('medic_guid'), this.page.PageSize, this.page.TableViewPage)
    .subscribe(
      (res) => {
        console.log(res);
        this.patients = res.Data;
        this.getEvents(res.Data);
     },
     (err: any) => {

     },
     () => {
     });
  }

  private getEvents(patients){
   const data = [
	  {"Giud": 1, "Date":'2018-06-08T18:44:17.9200000' , "PacientGuid": "4bd2d9d0-d96b-e811-80c6-000d3ab15e2f", "DoctorGuid":"fe2252dd-f551-e811-80c6-000d3ab15e2f","Status":1},
	  {"Giud": 2, "Date": '2018-06-09T18:44:17.9200000', "PacientGuid": "98662f80-da6b-e811-80c6-000d3ab15e2f", "DoctorGuid":"fe2252dd-f551-e811-80c6-000d3ab15e2f","Status":1},
	  {"Giud": 3, "Date": '2018-06-05T18:44:17.9200000', "PacientGuid": "98662f80-da6b-e811-80c6-000d3ab15e2f", "DoctorGuid":"fe2252dd-f551-e811-80c6-000d3ab15e2f","Status":1}
	];
	var eventsObject = data.map(function(programare){
		var findPatient = patients.filter(function(patient){
			return patient.Guid === programare.PacientGuid;
		})[0];
		return {"title":findPatient.FirstName + " "+ findPatient.LastName, start:programare.Date};
	});
	$('#calendar').fullCalendar({
	defaultView: 'month',
	  eventSources: [
	    {
	      events: eventsObject,
	      color: 'black',     // an option!
	      textColor: 'yellow' // an option!
	    }

	  ]

	});
  }

}
