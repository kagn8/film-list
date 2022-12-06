import { IUser } from "../interface/user";

export class User implements IUser{
  username: string;
  password: string;
  email: string;

  constructor(u:string, p:string, e:string){
    this.username=u
    this.email=e
    this.password=p
  }
}
