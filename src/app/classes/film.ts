import { IFilm } from "../interface/film";

export class Film implements IFilm {
  title:string
  favorite:[]
  watched:[]
  rating:number[]
  duration:string
  id?:number
  added:number
  description:string
  thumbnail:string
  vote:number

  constructor(title:string, duration:number){
    this.title=title;
    this.favorite =[];
    this.watched=[];
    this.rating = []
    this.duration= `${duration}"`
    this.added= Date.now()
    this.description = "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptatem labore quo reprehenderit possimus optio qui pariatur maiores vitae, culpa facilis esse dicta aspernatur temporibus, provident incidunt nobis hic voluptates?"
    this.thumbnail= "https://loremflickr.com/320/240/dog"
    this.vote = 0
  }
}
