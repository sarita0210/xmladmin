import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

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
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.form.value.username, this.form.value.password).subscribe(
      resp => {
        this.authService.authResponse = resp;
        this.authService.storeToken();
      }, error => {this.error = 'Neispravno ime ili lozinka.'}
    );
  }
}
