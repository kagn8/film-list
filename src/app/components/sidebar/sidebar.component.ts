import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/auth/authservice.service';
import { User } from 'src/app/classes/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private serv:ServiceService, private authService:AuthserviceService, private route: Router){}
  condition:User = JSON.parse(localStorage.getItem('user')!)
  user:User|null = null

  light!:boolean

  modalx = false

  ngOnInit(): void {
    if (this.condition) {
      this.serv.userSub.next(true)
    }
    this.serv.userObs.subscribe(res=> {
      if (res==false) {
        this.user=null
      }  else {this.user = JSON.parse(localStorage.getItem('user')!).user}
    })
    this.serv.darkObs.subscribe(res=> this.light=res)
  }


  logout(){
    this.authService.userSub.next(false)
    localStorage.removeItem('user')
    this.serv.userSub.next(false)
    this.route.navigate(['/login'])
  }


}
