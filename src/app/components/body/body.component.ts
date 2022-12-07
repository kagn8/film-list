import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Film } from 'src/app/classes/film';
import { IFilm } from 'src/app/interface/film';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{

  constructor(private serv:ServiceService, private route : Router){}
  filmForm!: FormGroup;
  patchFilmForm!:FormGroup
  add=false
  home!:Film[]
  film!:Film


  deleted:boolean= false
  edit:boolean= false
  editId!:number
  edited:boolean=false


  average(array:number[]){
    if (array.length>0) {
      return (array.reduce((a, b) => a + b) / array.length).toFixed(1)
      } else return "N.C."
    }


  ngOnInit(): void {
    this.resetForm()
    this.getHome()
}

  addFilm(){
    this.film = new Film(this.filmForm.value.filmTitle, this.filmForm.value.duration)
    this.serv.postFilm(this.film).subscribe(res=>console.log(res))
    this.getHome()
  }

  patchFilm(id:number){
    this.serv.getFilm(id).subscribe((res:any)=>{
      res.rating.push(this.patchFilmForm.value.vote);
    this.serv.patchFilm(res.id, res).subscribe(res=> {this.resetForm();this.getHome()})})
  }

  resetForm(){
    this.filmForm = new FormGroup({
      filmTitle: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
    })
    this.patchFilmForm = new FormGroup({
      vote: new FormControl(null, Validators.required)})
  }

  deleteFilm(id:number){
    this.serv.deleteFilm(id).subscribe(res=>console.log(res))
    this.getHome()
    this.deleted=!this.deleted
  }

  getHome(){
    this.serv.searchObs.subscribe(req=>{
      this.serv.getFilms().subscribe((res:any)=>{
        if (req) {
          this.home =res.filter((item:IFilm)=> item.title.toLowerCase().includes(req.toLowerCase()) )
        } else this.home=res
      })
    }
    )
  }
}
