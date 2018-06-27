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

  firstName = '';
  lastName = '';
  email = '';
  username = '';
  registrationDate = '';
  verified = false;
  pib = '';
  public barLabel = 'Password strength:';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strengthLabels = ['(Useless)', '(Weak)', '(Normal)', '(Strong)', '(Great!)'];
  selected: AgentUserModel;
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
    const dir : AgentUserModel = new AgentUserModel(0, this.form.value['firstName'],  this.form.value['lastName'],
    this.form.value['email'],   this.form.value['username'],  null , this.verified ,  this.form.value['pib'], this.form.value['password']);
    this.agentService.insert(dir).subscribe(
      resp => {
        this.pageset.content.push(resp);
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  blockAgent(agent: AgentUserModel) {
    agent.blocked = true;
    this.agentService.update(agent).subscribe(
      resp => {
        this.pageset.content.find(a => a.id === agent.id).blocked = true;
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  unblockAgent(agent: AgentUserModel) {
    agent.blocked = false;
    this.agentService.update(agent).subscribe(
      resp => {
        this.pageset.content.find(a => a.id === agent.id).blocked = false;
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }

  deleteAgent(id, index) {
    this.agentService.delete(id).subscribe(
      resp => {
        this.pageset.content.splice(index, 1);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }

  fillField(selected: AgentUserModel) {
    this.eForm.controls['firstName'].setValue(selected.firstName);
    this.eForm.controls['lastName'].setValue(selected.lastName);
    this.eForm.controls['email'].setValue(selected.email);
    this.eForm.controls['username'].setValue(selected.username);
    this.eForm.controls['pib'].setValue(selected.pib);
    this.selected = selected;
  }
  editAgent() {
    this.selected.firstName = this.eForm.controls['firstName'].value;
    this.selected.lastName = this.eForm.controls['lastName'].value;
    this.selected.email = this.eForm.controls['email'].value;
    this.selected.username = this.eForm.controls['username'].value;
    this.selected.pib = this.eForm.controls['pib'].value;
    this.agentService.update(this.selected).subscribe(
      resp => {
        this.selected = resp;
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
}
