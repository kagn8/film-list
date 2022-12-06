import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Film } from 'src/app/classes/film';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{

  constructor(private serv:ServiceService, private route : Router){}
  filmForm!: FormGroup;
  add=false
  home!:Film[]
  film!:Film


  average(array:number[]){
    if (array.length>0) {
      return (array.reduce((a, b) => a + b) / array.length).toFixed(1)
      } else return "N.C."
    }


  ngOnInit(): void {
    this.resetForm()
    this.serv.getFilms().subscribe((res:any) => this.home=res)
    this.route.navigate(['login'])
}

  addFilm(){
    this.film = new Film(this.filmForm.value.filmTitle, this.filmForm.value.duration)
    this.serv.postFilm(this.film).subscribe(res=>console.log(res))
    this.serv.getFilms().subscribe((res:any) => this.home=res)
  }

  resetForm(){
    this.filmForm = new FormGroup({
      filmTitle: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
    })
  }

}
