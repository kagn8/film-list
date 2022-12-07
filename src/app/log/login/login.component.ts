import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/auth/authservice.service';
import { RegisterServiceService } from 'src/app/auth/register-service.service';
import { User } from 'src/app/classes/user';
import { IUser } from 'src/app/interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private regServ:RegisterServiceService, private AuthService:AuthserviceService, private router:Router){}

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
      username: new FormControl(null, Validators.required),
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

  signIn(){
    this.authUser= new User(this.signUpForm.value.username, this.signUpForm.value.password, this.signUpForm.value.email)
    console.log(this.authUser);

    this.regServ.register(this.authUser).subscribe(res=>{console.log(res);})
  }

    seiLoggato(){
      if(localStorage.getItem("token") != null){this.logged=false}
    }
    entra(){
      this.AuthService.login(this.authLogin).subscribe((res:any)=>{console.log(res);

        this.AuthService.saveUser(res.accessToken); this.seiLoggato()
        if (!this.logged) {
          ;

          this.router.navigate([''])
        }
  })
    }}
