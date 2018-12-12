import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import { PatientService } from '../../services/patient.service';
import { ISubscription } from 'rxjs/Subscription';
import { PatientModel } from '../patient/patient.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [PatientService]
})
export class CalendarComponent implements OnInit, OnDestroy {

  private _selectionSubscription: ISubscription;
  patients: PatientModel[];
  constructor(private patientService: PatientService) {

   }

  ngOnInit() {
  this.GetAllPatients();

   }
   ngOnDestroy(): void {
    this._selectionSubscription.unsubscribe();
  }
   private GetAllPatients() {
    this._selectionSubscription = this.patientService
    .getAllPatientsByMedic(localStorage.getItem('medic_guid'))
    .subscribe(
      (res: PatientModel[]) => {
        console.log(res);
        this.patients = res;
        this.getEvents(res);
     },
     (err: any) => {},
     () => {
     });
  }

  private getEvents(patients) {
   const data = [
    { Guid: 1, Date: '2018-06-08T18:44:17.9200000', PacientGuid: '4bd2d9d0-d96b-e811-80c6-000d3ab15e2f',
    DoctorGuid: 'fe2252dd-f551-e811-80c6-000d3ab15e2f', Status: 1},
    { Guid: 2, Date: '2018-06-09T18:44:17.9200000', PacientGuid: '98662f80-da6b-e811-80c6-000d3ab15e2f',
     DoctorGuid: 'fe2252dd-f551-e811-80c6-000d3ab15e2f', Status: 1},
    { Guid: 3, Date: '2018-06-05T18:44:17.9200000', PacientGuid: '98662f80-da6b-e811-80c6-000d3ab15e2f',
     DoctorGuid: 'fe2252dd-f551-e811-80c6-000d3ab15e2f', Status: 1}
];
  const eventsObject = data.map(function(programare) {
    const findPatient = patients.filter(function(patient) {
      return patient.Guid === programare.PacientGuid;
    });
    return {'title': findPatient.FirstName + ' ' + findPatient.LastName, start: programare.Date};
  });
  $('#calendar').fullCalendar({
  defaultView: 'month',
    eventSources: [
    {
     events: eventsObject,
      color: 'black',     // an option!
      textColor: 'yellow' // an option!
    }]
  });
  }
}
