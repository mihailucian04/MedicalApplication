import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../components/user/user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:49498/';
  constructor(private http: HttpClient) { }
  ast;
  registerUser(user: User): Observable<User> {
    const body: User = {
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    };
    return this.http.post<User>(this.rootUrl + 'api/account/create-medic', body);
  }

  userAuthentication(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

}
