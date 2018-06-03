import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesEntityService } from '../../services/services-entity.service';
import { Pagination } from '../pagination';
import { ServicesModel } from '../../models/services.model';

@Component({
  selector: 'app-additional-service',
  templateUrl: './additional-service.component.html',
  styleUrls: ['./additional-service.component.css']
})
export class AdditionalServiceComponent extends Pagination<ServicesModel> implements OnInit {
  name = '';
  @ViewChild('addForm') form: NgForm;
  @ViewChild('editForm') eForm: NgForm;
  selected : ServicesModel;
  constructor(public servicesEntityService: ServicesEntityService) { 
    super(servicesEntityService);
  }

  ngOnInit() {
    console.log('ngOnInit service list');
    this.search(0);
  }

  addService() {
    const dir : ServicesModel = new ServicesModel( 0, this.form.value['name']);
    this.servicesEntityService.insert(dir).subscribe(
      resp => {
        this.pageset.content.push(resp);
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  deleteService(id, index) {
    this.servicesEntityService.delete(id).subscribe(
      resp => {
        this.pageset.content.splice(index, 1);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
  fillField(selected: ServicesModel){
    this.eForm.controls['name'].setValue(selected.serviceName);
    this.selected = selected;
  }
  editService() {
    this.selected.serviceName = this.eForm.controls['name'].value;
    this.servicesEntityService.update(this.selected).subscribe(
        resp => {
          console.log(resp);
        }, error => {
          this.message = JSON.stringify(error);
        }
      );
    }
}
