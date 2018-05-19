export class UserImpressionModel {
  constructor(public id: number, public rating: number, public comment: string, public accommodationName: string,
              public registeredUserUsername: string, public verified: boolean) {}
}
