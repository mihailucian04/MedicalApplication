import { HttpHeaders } from '@angular/common/http';
import { HttpRequest } from 'selenium-webdriver/http';


export class HttpReq {
    readonly reqHeader: HttpHeaders;
    readonly noAuthReqHeader: HttpHeaders;
    readonly rootUrl: string ;
    constructor() {
        this.reqHeader = new HttpHeaders({// 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        // 'No-Auth': 'True'
        });
        this.noAuthReqHeader = new HttpHeaders({'No-Auth': 'True'}); // ,
       // 'Access-Control-Allow-Origin': '*',
       // ' Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'});
        this.rootUrl = 'http://localhost:49498'; // 'http://medappapi.azurewebsites.net';
    }
}
