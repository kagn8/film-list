import { IFilm } from "./film"

export interface IUser {
  username:string
  password:string
  email:string
  id?:number
  seen:[{film:IFilm, date: number}]|[]
  favorite:IFilm[]|[]
}
