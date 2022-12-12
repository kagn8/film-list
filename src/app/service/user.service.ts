import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private serv:ServiceService) { }

  apiUrlRegister:string = 'http://localhost:3000/register';
  apiUrlLogin:string = 'http://localhost:3000/Login';
  apiUrl:string = 'http://localhost:3000/users';

  getCommonHeaders(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return headers;
  }

  registerUser(user:User):Observable<any> {
    return this.http.post(this.apiUrlRegister, JSON.stringify(user))
  }
  loginUser(user:User):Observable<any> {
    this.serv.userSub.next(true)
    return this.http.post(this.apiUrlLogin, JSON.stringify(user))
  }
  getUser(id:number) {
    return this.http.get(this.apiUrl+'/'+id)
  }

  deleteUser(id:number){
    return this.http.delete(this.apiUrl + '/' + id)
  }

  PostUser(user:User){}
}
