import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';


@Injectable()
export class EntityService <Entity, Key> {
  actionUrl = 'http://localhost:8080/api';

  constructor(protected http: HttpClient, protected url: string, protected authService: AuthService) {
    this.actionUrl = this.actionUrl + url;
  }
  getAll(): Observable<any[]> {
    return this.http.get(this.actionUrl + '/all', {headers: this.authService.getJSONAuthHeader()})
      .map(resp => resp as Entity[]);
  }
  getOne(id: Key): Observable<any> {
    return this.http.get(`${this.actionUrl}/${id}`, {headers: this.authService.getJSONAuthHeader()})
      .map(resp => resp as Entity);
  }
  insert(toInsert: any): Observable<Entity> {
    return this.http.post(this.actionUrl + '/insert', toInsert, {headers: this.authService.getJSONAuthHeader()})
      .map(resp => resp as Entity);
  }
  delete(toDelete: Key): Observable<any> {
    return this.http.delete(this.actionUrl + '/delete/' + toDelete, { headers: this.authService.getJSONAuthHeader(),
      observe: 'response', responseType: 'text' });
  }
  update(toUpdate: any): Observable<any> {
    return this.http.put(this.actionUrl + '/update/', toUpdate, {headers: this.authService.getJSONAuthHeader()});
  }

}
