import { Injectable } from '@angular/core';
import { HttpReq } from './httpReq.class';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PatientModel } from '../components/patient/patient.component';

@Injectable()
export class PatientService extends HttpReq {

  constructor(private http: HttpClient) {
    super();
   }
  getAllPatients(medicGuid: string): Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(this.getAllPatientsPathByMedicRoute(medicGuid));
  }
}

