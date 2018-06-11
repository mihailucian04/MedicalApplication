import { Injectable } from '@angular/core';
import { HttpReq } from './httpReq.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PatientModel, APIPatientResponse } from '../components/patient/patient.component';

@Injectable()
export class PatientService extends HttpReq {

  searchAllPatientsByFirstName(search: string, items: number, page: number): Observable<APIPatientResponse> {
    return this.http.get<APIPatientResponse>(this.getAllPatientsPathByFirstName(search, items, page));
  }
  deletePatients(patientGuid: string): any {
      return this.http.delete(this.getDeletePatientRoute(patientGuid));
  }
  constructor(private http: HttpClient) {
    super();
   }
  getAllPatients(medicGuid: string, items: number, page: number): Observable<APIPatientResponse> {
    return this.http.get<APIPatientResponse>(this.getPageAllPatientsPathByMedicRoute(medicGuid, items, page));
  }

  getAllPatientsByMedic(medicGuid: string): Observable<PatientModel[]> {
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

