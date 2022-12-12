import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private authService: AuthserviceService,
    private router: Router,
    private serv:ServiceService
    ){}

    guard:boolean = false
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.serv.userObs.subscribe(res=> {
      if (res == true) {
        this.guard= res
        return this.guard
      } else {
        this.router.navigate([state.url, 'login'])
        return this.guard
      }
    });return this.guard
    }
}
