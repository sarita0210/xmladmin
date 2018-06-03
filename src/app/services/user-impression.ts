import { AgentUserModel } from "../models/agent-user.model";
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import { UserModel } from "../models/user.model";
import { EntityService } from "./entity-service.service";
import { Page } from "../models/page.model";
import {Observable} from 'rxjs/Observable';
import { UserImpressionModel } from "../models/user-impression.model";


@Injectable()
export class UserImpressionService extends EntityService<UserImpressionModel, number>  {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/userimpression', authService);
  }
}