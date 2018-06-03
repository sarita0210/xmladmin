import {UserModel} from './user.model';
import {UserImpressionModel} from './user-impression.model';

export class RegularUserModel extends UserModel {
  constructor(public id: number, public firstName: string, public lastName: string,
              public email: string,
              public username: string,
              public registrationDate: Date,
              public blocked: boolean,
              public userImpression: Array<UserImpressionModel>) {
    super(id, firstName, lastName, email, username, registrationDate, blocked);
  }
}
