import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private navService:ServiceService, private serv: ServiceService){}

  condition:User = JSON.parse(localStorage.getItem('user')!)
  user:User|null = null

  light!:boolean


  ngOnInit(): void {
    if (this.condition) {
      this.serv.userSub.next(true)
    }
    this.serv.userObs.subscribe(res=> {
      if (res==false) {
        this.user=null
      }  else {this.user = JSON.parse(localStorage.getItem('user')!).user
    }
    })
    this.serv.darkObs.subscribe( res => this.light = res)
  }

  search!:string

  searchText(){
    this.navService.searchSub.next(this.search)
  }

  darkMode(){
    this.serv.darkSub.next(!this.light)
  }

}
