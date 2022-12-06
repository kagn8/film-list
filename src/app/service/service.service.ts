import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFilm } from '../interface/film';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getFilms(){
    return this.http.get('http://localhost:3000/films')
  }
  getFilm(id:number){
    return this.http.get('http://localhost:3000/films/' + id)
  }

  postFilm(film:IFilm){
    return this.http.post('http://localhost:3000/films', film)
  }

  deleteFilm(id:number){
    return this.http.delete('http://localhost:3000/films/'+ id)
  }

  patchFilm(id:number, film:Partial<IFilm>){
    return this.http.patch('http://localhost:3000/films/'+id, film)
  }
}
