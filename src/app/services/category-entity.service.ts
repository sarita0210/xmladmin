import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {CategoryModel} from '../models/category.model';
import {EntityService} from './entity-service.service';

@Injectable()
export class CategoryEntityService extends EntityService<CategoryModel, number> {

  constructor(protected http: HttpClient, protected authService: AuthService) {
    super(http, 'category', authService);
  }

}
