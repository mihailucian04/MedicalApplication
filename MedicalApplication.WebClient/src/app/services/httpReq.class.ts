import { HttpHeaders } from '@angular/common/http';
import { HttpRequest } from 'selenium-webdriver/http';

export class HttpReq {
    readonly reqHeader: HttpHeaders;
    readonly noAuthReqHeader: HttpHeaders;
    readonly rootUrl: string ;
    constructor() {
        this.reqHeader = new HttpHeaders()
        .set('Content-Type' , 'application/x-www-form-urlencoded')
          .set('No-Auth' , 'True');
        this.noAuthReqHeader = new HttpHeaders()
        .append('No-Auth' , 'True');
        this.rootUrl = 'http://localhost:49498';
        // 'http://localhost:49498'; // 'http://medappapi.azurewebsites.net';
    }
    getAllPatientsPathByMedicRoute(medicGuid: string ): string {
        return this.rootUrl + '/api/patient/get-patients-by-medic/{' + medicGuid + '}';
    }
    getTokenHeader() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    }

    getDataAboutLoggedMedicRoute(emailLogged: string): string {
        const uint8array = btoa(emailLogged);
        return this.rootUrl + '/api/account/' + uint8array ;
    }

    getPageAllPatientsPathByMedicRoute(medicGuid: string, items: number, page: number): string {
        return this.rootUrl + '/api/patient/get-patients-by-medic/' + items + '/' + page + '/' + medicGuid ;
    }

    getAllPatientsPathByFirstName(search: string, items: number, page: number): string {
        return this.rootUrl + '/api/patient/search-patients/' + search + '/' + items + '/' + page ;
      }

    getAddPatientRoute() {
        return this.rootUrl + '/api/patient/add-patient';
    }


    getDeletePatientRoute(patientGuid: string) {
        return this.rootUrl + '/api/patient/delete-patient/' + patientGuid;
    }

    getAnalyzesByItemsPage(items: number, page: number): string {
        return this.rootUrl + '/api/analyze/' + items + '/' + page;
    }

  getAddAnalyzezMappingRoute(): any {
    return this.rootUrl + '/api/analyze/add-analyzeOfPatient';
  }
}
