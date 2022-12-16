import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../classes/user';
import { IFilm } from '../interface/film';
import { IUser } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  searchSub = new BehaviorSubject<null|string>(null)
  searchObs = this.searchSub.asObservable()

  userSub = new BehaviorSubject<boolean>(false)
  userObs = this.userSub.asObservable()

  darkSub = new BehaviorSubject<boolean>(true)
  darkObs = this.darkSub.asObservable()

  isLogged= false


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

  isAutenticated(){
    this.userObs.subscribe(res=> this.isLogged=res)
  }

  ///USER

  patchUser(id:number, user:IUser){
    return this.http.patch('http://localhost:3000/users/'+id, user)
  }

  getUser(id:number){
    return this.http.get('http://localhost:3000/users/' + id)
  }
}
