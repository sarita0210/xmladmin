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
  name = '';
  @ViewChild('addForm') form: NgForm;
  @ViewChild('editForm') eForm: NgForm;
  selected: CategoryModel;
  constructor(public categoryService: CategoryEntityService) {
    super(categoryService);
  }

  ngOnInit() {
    console.log('ngOnInit category list');
    this.search(0);
  }

  addCategory() {
    const dir: CategoryModel = new CategoryModel(0, this.form.value['name']);
    this.categoryService.insert(dir).subscribe(
      resp => {
        this.pageset.content.push(resp);
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  deleteCategory(id, index) {
    this.categoryService.delete(id).subscribe(
      resp => {
        this.pageset.content.splice(index, 1);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }
  fillField(selected) {
    console.log('aaaaaaaaaaa' + selected + selected.name);
    this.eForm.controls['name'].setValue(selected.name);
    this.selected = selected;
  }
  editCategory() {
    this.selected.name = this.eForm.controls['name'].value;
    this.categoryService.update(this.selected).subscribe(
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
