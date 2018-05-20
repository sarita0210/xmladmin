import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryEntityService } from '../../services/category-entity.service';
import { CategoryModel } from '../../models/category.model';
import { Pagination } from '../pagination';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends Pagination<CategoryModel> implements OnInit {
  name = 'asdf';
  @ViewChild('addForm') form: NgForm;
  @ViewChild('editForm') eForm: NgForm;
  constructor(public categoryService: CategoryEntityService) {
    super(categoryService);
  }

  ngOnInit() {
    console.log('ngOnInit category list');
    this.search(0);
  }

  addCategory() {
    const dir : CategoryModel = new CategoryModel( 0, this.form.value['name']);
    this.categoryService.insert(dir).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  deleteCategory(index) {
    console.log('delete category');
    this.categoryService.delete(index).subscribe(
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
editCategory(index) {
  console.log('edit category');
    console.log('broj indexa je : ' + index);
    const catUpdate : CategoryModel = new CategoryModel(index, this.eForm.value['name'],);
    this.categoryService.update(catUpdate).subscribe(
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
