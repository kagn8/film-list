import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { BestRatedComponent } from './components/best-rated/best-rated.component';
import { BodyComponent } from './components/body/body.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SeenComponent } from './components/seen/seen.component';
import { UnseenComponent } from './components/unseen/unseen.component';
import { LoginComponent } from './log/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home',},
  {
    path: 'home',
    component: BodyComponent,
    pathMatch:"full",
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch:"full"
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    pathMatch:"full",
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'best-rated',
    component: BestRatedComponent,
    pathMatch:"full",
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'seen',
    component: SeenComponent,
    pathMatch:"full",
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'unseen',
    component: UnseenComponent,
    pathMatch:"full",
    canActivate:[AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
