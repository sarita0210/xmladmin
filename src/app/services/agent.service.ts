import { AgentUserModel } from "../models/agent-user.model";
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import { EntityService } from "./entity-service.service";

@Injectable()
export class AgentService extends EntityService<AgentUserModel, number>  {

  constructor(http: HttpClient, protected authService: AuthService) {
    super(http, '/agents', authService);
  }
}
