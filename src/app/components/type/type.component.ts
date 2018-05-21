import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '../pagination';
import { NgForm } from '@angular/forms';
import { TypeEntityService } from '../../services/type-entity.service';
import { TypeModel } from '../../models/type.model';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent extends Pagination<TypeModel> implements OnInit {
  name = '';
  @ViewChild('addForm') form: NgForm;
  @ViewChild('editForm') eForm: NgForm;

  constructor(public typeService: TypeEntityService) {
    super(typeService);
   }

  ngOnInit() {
    console.log('ngOnInit type list');
    this.search(0);
  }

  addType() {
    const dir : TypeModel = new TypeModel( 0, this.form.value['name']);
    this.typeService.insert(dir).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  deleteType(index) {
    console.log('delete type');
    this.typeService.delete(index).subscribe(
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
  editType(index) {
    console.log('edit type');
      console.log('broj indexa je : ' + index);
      const typeUpdate : TypeModel = new TypeModel(index, this.eForm.value['name'],);
      this.typeService.update(typeUpdate).subscribe(
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
