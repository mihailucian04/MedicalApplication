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

    getTokenHeader() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    }
}
