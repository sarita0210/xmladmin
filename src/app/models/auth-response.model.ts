export class AuthResponse {
  constructor(public token: string, public roles: Array<string>, public username: string) {}
}
