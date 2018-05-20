import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import { Page } from '../models/page.model';


@Injectable()
export class EntityService <Entity, Key> {
  actionUrl = 'http://localhost:8085/api';

  constructor(protected http: HttpClient, protected url: string, protected authService: AuthService) {
    this.actionUrl = this.actionUrl + url;
  }
  getAll(page: number, pageSize: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', pageSize.toString());
    return this.http.get(this.actionUrl + '/all', {params})
      .map(resp => resp as Page<Entity>);
  }
  getOne(id: Key): Observable<any> {
    return this.http.get(`${this.actionUrl}/${id}`, {headers: this.authService.getJSONAuthHeader()})
      .map(resp => resp as Entity);
  }
  insert(toInsert: any): Observable<Entity> {
    return this.http.post(this.actionUrl + '/insert', toInsert)
      .map(resp => resp as Entity);
  }
  delete(id: Key): Observable<any> {
   // let params = new HttpParams();
  //  params = params.append('id', id.toString());
    return this.http.delete(this.actionUrl + '/delete/'+ id );
  }
  update(toUpdate: any): Observable<any> {
    return this.http.put(this.actionUrl + '/update/', toUpdate);
  }

}
