import { IFilm } from "../interface/film";

export class Film implements IFilm {
  title:string
  favorite:[]
  watched:[]
  rating:number[]
  duration:string

  constructor(title:string, duration:number){
    this.title=title;
    this.favorite =[];
    this.watched=[];
    this.rating = []
    this.duration= `${duration}"`
  }
}
