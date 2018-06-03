import {UserModel} from './user.model';

export class AgentUserModel extends UserModel {
  constructor(public id: number,
              public firstName: string,
              public lastName: string,
              public email: string,
              public username: string,
              public registrationDate: Date,
              public blocked: boolean,
              public pib: string,
              public password: string) {
    super(id, firstName, lastName, email, username, registrationDate, blocked);
  }
}
