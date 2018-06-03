import { Component, OnInit, Input } from '@angular/core';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  private isAdmin: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  
  logout(event) {
    this.auth.logout();
  }
}
