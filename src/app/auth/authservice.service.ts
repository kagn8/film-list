import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { IUser } from '../interface/user';

export interface AuthData {
  accessToken: string;
  user:IUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  ApiUrlUser:string = 'http://localhost:3000/login'
  jwtHelper = new JwtHelperService()
  autoLogoutTimer:any

  constructor(private http: HttpClient, private router: Router, ) { this.restore() }
  restore(){
    let userJson = localStorage.getItem("user");
    if(!userJson)return

    const user:AuthData = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(user.accessToken)){
      this.logout()
      return
  }
  this.loginSub.next(user)
    this.autoLogout(user.accessToken)
}



  saveUser(t:string){
    localStorage.setItem("token", t)
  }
  isUserLoggedIn(){
    return localStorage.getItem("token") != null
  }


  logout() {
    localStorage.removeItem("user")
    this.loginSub.next(null)
    this.router.navigate(['login'])
  }
  private loginSub = new BehaviorSubject<null|AuthData>(null);

  loginObs = this.loginSub.asObservable();



  login(data:{email:string; password:string}) {
    return this.http.post<AuthData>(this.ApiUrlUser, data).pipe(
      tap((data)=>{
        localStorage.setItem("user", JSON.stringify(data))
        this.autoLogout(data.accessToken)
        this.loginSub.next(data)
      }),
    )
  }

  autoLogout(at:string) {
    const exDate = this.jwtHelper.getTokenExpirationDate(at) as Date;
    const exMs = exDate.getTime() - new Date().getTime()

    this.autoLogoutTimer = setTimeout(()=>{
      this.logout();
    }, exMs)
  }



}
