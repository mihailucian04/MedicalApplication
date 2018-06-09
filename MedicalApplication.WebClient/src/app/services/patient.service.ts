import { Injectable } from '@angular/core';
import { HttpReq } from './httpReq.class';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  addPacient(patient: PatientModel) {
    const body = new HttpParams()
    .set('FirstName', patient.FirstName)
    .set('Address', patient.Address)
    .set('LastName', patient.LastName)
    .set('Assuranced', patient.Assuranced.toString())
    .set('Telephone', patient.Telephone)
    .set('MedicGuid', patient.MedicGuid)
    .set('PatientFile', patient.PatientFile)
    .set('DOB', patient.DOB.toLocaleDateString())
    .set('Sex', patient.Sex.toString())
    .set('CNP', patient.CNP);
     return this.http.post(this.getAddPatientRoute(),
     body);
  }
}

