import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './log/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
    pathMatch:"full",
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch:"full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
