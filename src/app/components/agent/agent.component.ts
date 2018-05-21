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

  @ViewChild('addForm') form: NgForm;
  @ViewChild('editForm') eForm: NgForm;

  constructor(public agentService: AgentService) { 
    super(agentService);
  }

  ngOnInit() {
  }

}
