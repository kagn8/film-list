import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/auth/authservice.service';
import { RegisterServiceService } from 'src/app/auth/register-service.service';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/classes/user';
import { IAuth } from 'src/app/interface/auth';

import { IUser } from 'src/app/interface/user';
import { ServiceService } from 'src/app/service/service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor( private auth:AuthserviceService, private router:Router, private userService: UserService, private serv:ServiceService){}

  ngOnInit(): void {
    this.resetForm()
  }
  animate = false

  logged:boolean=true

  authUser!:IUser
  authLogin={
    email: '',
    password: ''
  }

  loginForm!:FormGroup
  signUpForm!:FormGroup

  resetForm(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl(null, Validators.required),
    })
    this.signUpForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    })
  }

  ciao(){ console.log(this.signUpForm.value.username);
    }
    authData!:User

  signIn(){
    this.authData = new User(this.signUpForm.value.username, this.signUpForm.value.password, this.signUpForm.value.email )
    console.log(this.authData);

    this.userService.registerUser(this.authData)
    .subscribe(data => {
      console.log(data);
      var logUser:IAuth = new Auth(this.signUpForm.value.email, this.signUpForm.value.password)
      this.auth.login(logUser).subscribe(res=> console.log(res))
    })
  }
  login(){
    var logUser:IAuth = new Auth(this.loginForm.value.email, this.loginForm.value.password)
    this.auth.login(logUser).subscribe((res:any)=> {console.log(res)
      this.serv.userSub.next(res)
      this.router.navigate(['home'])
    })
  }

}
