import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'film-list';

  constructor(private serve: ServiceService){}

  light!:boolean

  ngOnInit(): void {

    this.serve.darkObs.subscribe(res=> this.light = res)
  }


}
