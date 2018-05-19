import { Injectable } from '@angular/core';
import {ServicesModel} from '../models/services.model';
import {EntityService} from './entity-service.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class ServicesEntityService extends EntityService<ServicesModel, number> {

  constructor(protected http: HttpClient, protected authService: AuthService) {
    super(http, 'additionalservices', authService);
  }

}
