import { Injectable } from '@angular/core';
import {EntityService} from './entity-service.service';
import {TypeModel} from '../models/type.model';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TypeEntityService extends EntityService<TypeModel, number> {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/type', authService);
  }

}
