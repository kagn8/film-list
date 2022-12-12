import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private serv:ServiceService){}
  condition:User = JSON.parse(localStorage.getItem('user')!)
  user:User|null = null

  ngOnInit(): void {
    if (this.condition) {
      this.serv.userSub.next(true)
    }
    this.serv.userObs.subscribe(res=> {
      if (res==false) {
        this.user=null
      }  else {this.user = JSON.parse(localStorage.getItem('user')!).user
      console.log(this.user);
    }
    })
  }

}
