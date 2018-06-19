import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthResponse } from '../../models/auth-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string;
  user: string;
  pass: string;
  @ViewChild('f') form: NgForm;
  constructor(private authService: AuthService, protected router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(new AuthenticationRequest(this.form.value.username, this.form.value.password)).subscribe(
      (resp: AuthResponse) => {
        if(resp.roles === undefined || resp.roles.findIndex(r=> r==='admin') === -1) {
          this.error = 'Korisnik nije administrator';
          return;
        }
        this.authService.storeToken(resp);
        this.error = null;
        this.router.navigate(['/adminPanel']);
      }, error => {this.error = 'Neispravno ime ili lozinka.'}
    );
  }
}
