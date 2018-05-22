import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentUserModel } from '../../models/agent-user.model';
import { Pagination } from '../pagination';
import { NgForm } from '@angular/forms';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent extends Pagination<AgentUserModel>  implements OnInit {

  firstName ='';
  lastName = '';
  email = '';
  username = '';
  registrationDate = '';
  verified = false;
  pib = '';
  @ViewChild('addForm') form: NgForm;
  @ViewChild('editForm') eForm: NgForm;

  constructor(public agentService: AgentService) { 
    super(agentService);
  }

  ngOnInit() {
    console.log('ngOnInit agents list');
    this.search(0);
  }

  addAgent() {
    const dir : AgentUserModel = new AgentUserModel( 0, this.form.value['firstName'],  this.form.value['lastName'],
    this.form.value['email'],   this.form.value['username'],  null , this.verified ,  this.form.value['pib']);
    this.agentService.insert(dir).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }

}
