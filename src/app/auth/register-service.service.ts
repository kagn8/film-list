import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IUser } from '../interface/user';
import { AuthData } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {


  constructor(private http: HttpClient) { }
  ApiUrlUser:string = 'http://localhost:3000/user/'
  ApiUrlGetUser:string = 'http://localhost:3000/'


  register(data:IUser) {
    return this.http.post<AuthData>(this.ApiUrlUser+"register", data).pipe(
      tap((data)=>{
        console.log("Signup", data);
        localStorage.setItem("user", JSON.stringify(data));
        this.loginSub.next(data);
      })
    )
  }

  private loginSub = new BehaviorSubject<null|AuthData>(null);

  loginObs = this.loginSub.asObservable();
}
