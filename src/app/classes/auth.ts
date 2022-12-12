import { IAuth } from "../interface/auth";

export class Auth implements IAuth{
  email: string;
  password: string;

  constructor(e:string, p:string){
    this.email=e
    this.password=p
  }
}
