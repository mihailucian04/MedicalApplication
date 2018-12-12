import { Injectable } from '@angular/core';
import { HttpReq } from './httpReq.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PatientModel, APIPatientResponse } from '../components/patient/patient.component';
import { AnalyzeResult } from '../components/laboratory/laboratory.component';

@Injectable()
export class PatientService extends HttpReq {



  addAnalyzesToProcess(medicGuid: string, patientGuid: string, analyzeGuids: string[]) {
       const body = new HttpParams()
      .set('MedicGuid', medicGuid)
       .set('PatientGuid', patientGuid)
       .set('Result', analyzeGuids.toString());
         return this.http.post(this.getAddAnalyzezMappingRoute(), body);
       }

       GetAnalyzes(items: number, page: number): Observable<AnalyzeResult> {
           return this.http.get<AnalyzeResult>(this.getAnalyzesByItemsPage(items, page));
         }
           searchAllPatientsByFirstName(search: string, items: number, page: number): Observable<APIPatientResponse> {
             return this.http.get<APIPatientResponse>(this.getAllPatientsPathByFirstName(search, items, page));
           }
           getAnalyzesForLab(items, page): Observable<any> {
            return this.http.get<APIPatientResponse>(this.getAllMappingAnalyzessLabRoute(items, page));
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

  getPatientById(patientGuid: string): any {
      return this.http.get(this.getPatientById(patientGuid));
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

