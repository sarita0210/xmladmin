import { AgentUserModel } from "../models/agent-user.model";
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import { UserModel } from "../models/user.model";
import { EntityService } from "./entity-service.service";
import { Page } from "../models/page.model";
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserService extends EntityService<UserModel, number>  {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/regularuser', authService);
  }
}