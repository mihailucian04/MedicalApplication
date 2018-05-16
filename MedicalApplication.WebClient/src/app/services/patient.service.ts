import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Patient } from '../components/patient/patient.model';

@Injectable()
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  public getPatientData() {
    console.log('in service');
    return this.httpClient.get('http://medappapi.azurewebsites.net/api/patient/get-patients-by-medic/FE2252DD-F551-E811-80C6-000D3AB15E2F');
  }

}
