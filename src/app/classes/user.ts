import { IFilm } from "../interface/film";
import { IUser } from "../interface/user";

export class User implements IUser{
  username: string;
  password: string;
  email: string;
  id?:number
  seen: [{ film: IFilm; date: number; }]|[];
  favorite: IFilm[]|[];


  constructor(u:string, p:string, e:string){
    this.username=u
    this.email=e
    this.password=p
    this.seen=[]
    this.favorite=[]
  }
}
