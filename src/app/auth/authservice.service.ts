import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { IAuth } from '../interface/auth';
import { IUser } from '../interface/user';

export interface AuthData {
  accessToken: string;
  user:IUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  // ApiUrlUser:string = 'http://localhost:3000/login'
  jwtHelper = new JwtHelperService()
  // autoLogoutTimer:any
  userSub = new BehaviorSubject<boolean>(false)
  userObs = this.userSub.asObservable()
  isLogged=false

  constructor(private http: HttpClient, private router: Router, ) { }
  apiUrlLogin:string = 'http://localhost:3000/login';

  login(authData:IAuth) {
    return this.http.post(this.apiUrlLogin, authData).pipe(
      tap((res) => {
        localStorage.setItem("user", JSON.stringify(res))
        this.router.navigate(['/'])
      })
    )
  }

  logUser(token:string){
    localStorage.setItem('token',token)
  }

  logout():boolean{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  isUserLogged(){
    if (localStorage.getItem('user') != null) {
      this.userSub.next(true)
      this.userObs.subscribe(res=> this.isLogged=res)
    }else{
      this.userObs.subscribe(res=> this.isLogged=res)
    }
    console.log(this.isLogged + "ciao");
    return this.isLogged
  }

}
