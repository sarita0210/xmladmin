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
  selected: TypeModel;
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
        this.pageset.content.push(resp);
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  deleteType(id, index) {
    this.typeService.delete(id).subscribe(
      resp => {
        this.pageset.content.splice(index, 1);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
  fillField(selected){
    console.log('aaaaaaaaaaa' + selected + selected.name);
    this.eForm.controls['name'].setValue(selected.name);
    this.selected = selected;
  }
  editType(index) {
    this.selected.name = this.eForm.controls['name'].value;
    this.typeService.update(this.selected).subscribe(
        resp => {
          console.log(resp);
        }, error => {
          this.message = JSON.stringify(error);
        }
      );
    }
}
