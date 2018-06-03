import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationRequest } from '../../models/authentication-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string;
  user: string;
  pass: string;
  private logInfo = {
    user: '',
    pass: ''
  };
  @ViewChild('f') form: NgForm;
  constructor(private authService: AuthService, protected router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(new AuthenticationRequest(this.logInfo.user, this.logInfo.pass)).subscribe(
      resp => {
    //    this.authService.authResponse = resp;
        this.authService.storeToken();
        this.error = null;
        this.router.navigate(['/home']);
      }, error => {this.error = 'Neispravno ime ili lozinka.'}
    );
  }
}
