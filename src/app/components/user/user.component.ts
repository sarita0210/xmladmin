import { Component, OnInit,ViewChild } from '@angular/core';
import { Pagination } from '../pagination';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends Pagination<UserModel>  implements OnInit {


  @ViewChild('editForm') eForm: NgForm;
  selected : UserModel;
  constructor(public userService: UserService) {
    super(userService);
   }

  ngOnInit() {
    this.search(0);
  }

  blockUser(user: UserModel) {
    user.blocked = true;
    this.userService.update(user).subscribe(
      resp => {
        this.pageset.content.find(a => a.id === user.id).blocked = true;
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
  unblockUser(user: UserModel) {
    user.blocked = false;
    this.userService.update(user).subscribe(
      resp => {
        this.pageset.content.find(a => a.id === user.id).blocked = false;
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }

  deleteUser(id, index) {
    this.userService.delete(id).subscribe(
      resp => {
        this.pageset.content.splice(index, 1);
      }, error => {
        this.message = JSON.stringify(error);
      }
    );
  }


}
