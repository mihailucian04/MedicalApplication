import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../components/user/user.model';
import { HttpReq } from './httpReq.class';

@Injectable()
export class UserService extends HttpReq {
  readonly namePattern = '^[a-zA-Z0-9._%+-]{2,}$';
  readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private http: HttpClient) {
    super();
  }
  user: User;
  registerUser(user: User) {
     const body = new HttpParams()
    .set('Firstname', user.Firstname)
    .set('Password', user.Password)
    .set('Lastname', user.Lastname)
    .set('Email', user.Email)
    .set('Sex', user.Sex.toString())
    .set('Speciality', user.Speciality);
     return this.http.post(this.rootUrl + '/api/account/create-medic',
     body, { headers: this.noAuthReqHeader });
  }

  userAuthentication(userName, password) {
    localStorage.removeItem('access_token');
    const data = 'grant_type=password&username=' + userName + '&password=' + password;
    const link = this.rootUrl + '/token';
    // tslint:disable-next-line:no-var-keyword
    // tslint:disable-next-line:prefer-const
    let head = new HttpHeaders()
    .set('Content-Type' , 'application/X-www-form-urlencoded');
    return this.http.post(link, data, { headers: head} );
  }

  getDataAboutUser(email) {
    localStorage.removeItem('medic_guid');
    return this.http.get(this.getDataAboutLoggedMedicRoute(email));
  }

}
