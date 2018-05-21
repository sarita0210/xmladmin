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
        console.log(resp);
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  deleteType(index) {
    console.log('delete service');
    this.servicesEntityService.delete(index).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
  fillField(selected){
    console.log('aaaaaaaaaaa' + selected + selected.name);
    this.name = selected.name;
  }
  editService(index) {
    console.log('edit serice');
      console.log('broj indexa je : ' + index);
      const serviceUpdate : ServicesModel = new ServicesModel(index, this.eForm.value['name'],);
      this.servicesEntityService.update(serviceUpdate).subscribe(
        resp => {
    //  const idx = this.cinemas.map(cin => cin.id).findIndex(id => id === resp.id);
    //  this.cinemas[idx] = resp;
          console.log(resp);
        }, error => {
          this.message = JSON.stringify(error);
        }
      );
    }
}
