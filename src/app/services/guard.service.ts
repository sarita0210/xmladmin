import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class GuardService implements CanActivate {

  constructor(private service: AuthService, private router: Router) {
    
  }

  canActivate() {
    const isLogged = this.service.isLoggedInSimple();
    const hasRights = this.service.hasRole('admin');

    if (!isLogged || !hasRights) {
      this.router.navigate(['/login']);
    }

    return true;
  }
}
