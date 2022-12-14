import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BodyComponent } from './components/body/body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './log/login/login.component';
import { AuthinterceptorInterceptor } from './auth/authinterceptor.interceptor';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { BestRatedComponent } from './components/best-rated/best-rated.component';
import { SeenComponent } from './components/seen/seen.component';
import { UnseenComponent } from './components/unseen/unseen.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    BodyComponent,
    LoginComponent,
    FavoritesComponent,
    BestRatedComponent,
    SeenComponent,
    UnseenComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthinterceptorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
