import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthResponse} from '../models/auth-response.model';
import {RegisterModel} from '../models/register.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RegisterResponse} from '../models/register-response.model';


@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:8085/';
  apiUrl = 'api/users/';
  public authResponse: AuthResponse;
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    this.authResponse = JSON.parse(window.localStorage.getItem('currentUser'));
    if (this.authResponse == null) {
      return null;
    }
    return this.authResponse.access_token;
  }
  getRole(): Array<string> {
    this.authResponse = JSON.parse(window.localStorage.getItem('currentUser'));
    if (this.authResponse == null) {
      return null;
    }
    return this.authResponse.Roles;
  }
  isRole(role: string): boolean {
    return this.getRole().indexOf(role) !== -1;
  }
  isLoggedIn(): boolean {
    this.authResponse = JSON.parse(window.localStorage.getItem('currentUser'));
    if (this.authResponse == null) {
      this.authResponse = null;
      window.localStorage.removeItem('currentUser');
      return false;
    }
    const now: Date = new Date();
    const expiresDate: Date = new Date(this.authResponse['.expires']);
    const nowUTC: Date = new Date(now.toUTCString());
    if (nowUTC > expiresDate) {
      this.authResponse = null;
      window.localStorage.removeItem('currentUser');
    }
    return nowUTC < expiresDate;
  }
  logout() {
    this.authResponse = null;
    window.localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  login(username: string, password: string) {
    const formData: FormData = new FormData();
    // const body = `username=$username}&password=${password}&`;
    return this.http.post(this.baseUrl + this.apiUrl + 'token', {username: username, password: password})
      .map(res => res as AuthResponse || {}).catch(this.handleError);
  }
  hasRole(role: string): boolean {
    if (this.getRole() == null) {
      return false;
    } else {
      return this.getRole().indexOf(role) !== -1;
    }
  }
  storeToken() {
    window.localStorage.setItem('currentUser', JSON.stringify(this.authResponse));
  }
  getJSONAuthHeader(): HttpHeaders {
    return new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token});
  }
  getFORMHeader(): HttpHeaders {
    return new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded'});
  }
  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({'Authorization': 'Bearer ' + this.authResponse.access_token});
  }
  getAuthHeaderMultipart(): HttpHeaders {
    return new HttpHeaders({'Authorization': 'Bearer ' + this.authResponse.access_token});
  }
  register(user: RegisterModel) {
    return this.http.post(this.baseUrl + this.apiUrl + 'register', user).map(this.extractUser).catch(this.handleError);
  }
  private extractUser(res: Response) {
    const body: RegisterResponse =  res.json();
    return body || {};
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    console.log(error);
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
