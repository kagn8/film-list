import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/auth/authservice.service';
import { Film } from 'src/app/classes/film';
import { IFilm } from 'src/app/interface/film';
import { IUser } from 'src/app/interface/user';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-best-rated',
  templateUrl: './best-rated.component.html',
  styleUrls: ['./best-rated.component.scss']
})
export class BestRatedComponent {
  constructor(private serv:ServiceService, private route : Router, private authService: AuthserviceService){}
  filmForm!: FormGroup;
  patchFilmForm!:FormGroup
  add=false
  home!:Film[]
  film!:Film

  deleted:boolean= false
  edit:boolean= false
  editId!:number
  edited:boolean=false

  userMod:IUser = JSON.parse(localStorage.getItem('user')!).user
  realUser!:IUser


  light!:boolean


  ngOnInit(): void {
    this.resetForm()
    this.getHome()
    this.serv.getUser(this.userMod.id!).subscribe((res:any) => this.userMod = res)
    this.serv.darkObs.subscribe(res=> this.light = res)
  }

    average(array:number[]):number{
      if (array.length>0) {
        return parseInt((array.reduce((a, b) => a + b) / array.length).toFixed(1))
        } else return parseInt("0.0")
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
          console.log(this.home);
        } else {this.home=res.sort((a:any, b:any)=> {return this.average(a.rating) - this.average(b.rating)}).reverse()}
      })
    }
    )

  }

  logout(){
    this.authService.userSub.next(false)
    localStorage.removeItem('user')
    alert("slogged")
    this.serv.userSub.next(false)
  }
  favorite(film:IFilm){
    film.favorite.push(this.userMod.id!)
    this.serv.patchFilm(film.id!, film).subscribe(res => {console.log(res)
      this.userMod.favorite.push(film)
      this.serv.patchUser(this.userMod.id!, this.userMod).subscribe(res => console.log(res))
    })

  }

  favControl(film:IFilm){
    var red = false
    this.userMod.favorite.map(x =>{
      if (x.title == film.title) {
        red=true
      }
    } )
    return red
  }

  removeFav(film:IFilm){
    this.userMod.favorite.splice(this.userMod.favorite.findIndex(x => x.title == film.title), 1)
    this.serv.patchUser(this.userMod.id!, this.userMod).subscribe(res => {console.log(res)
      film.favorite.splice(film.favorite.findIndex(x => x == this.userMod.id), 1)
      this.serv.patchFilm(film.id!, film).subscribe(res => console.log(res))
    })

  }

  watched(id:number){
    this.serv.getFilm(id).subscribe((res:any)=>{
      res.watched.push(this.userMod.id)
      this.serv.patchFilm(id, res).subscribe(res=> console.log(res))
    })
  }

  controlWatch(id:number){
    var variable = false


    return variable
  }


}
