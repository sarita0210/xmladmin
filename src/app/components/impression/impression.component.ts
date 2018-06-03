import { Component, OnInit,ViewChild } from '@angular/core';
import { Pagination } from '../pagination';
import { NgForm } from '@angular/forms';
import { UserImpressionModel } from '../../models/user-impression.model';
import { UserImpressionService } from '../../services/user-impression';

@Component({
  selector: 'app-impression',
  templateUrl: './impression.component.html',
  styleUrls: ['./impression.component.css']
})
export class ImpressionComponent extends Pagination<UserImpressionModel>  implements OnInit {

  selected: UserImpressionModel;
  constructor(public impressionService: UserImpressionService) { 
    super(impressionService);
  }

  ngOnInit() {
    this.search(0);
  }
  allowComment(impr: UserImpressionModel) {
    impr.verified = true;
    this.impressionService.update(impr).subscribe(
      resp => {
        this.pageset.content.find(i => i.id === impr.id).verified = resp.verified;
      }, error => {
        this.error = JSON.stringify(error);
      }
    );
  }
}
