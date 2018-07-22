import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { SharedModule } from './shared/shared.module';
import { RentalModule } from './rental/rental.module';
import { VenueModule } from './venue/venue.module';
import { ManageModule } from './manage/manage.module';
import { ArrangeModule } from './arrange/arrange.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageComponent } from './manage/manage.component';
import { ArrangeComponent } from './arrange/arrange.component';
import { RentalComponent } from './rental/rental.component';
import { VenueComponent } from './venue/venue.component';

import { AuthGuard } from './shared/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';

import { DateFormatPipe } from './shared/pipe/date-format.pipe';
import { ProfileComponent } from './profile-component/profile-component.component';

 const routes: Routes = [
   { path: '', redirectTo: '/venues', pathMatch: 'full' },
   { path: 'rentals', component: RentalComponent },
   { path: 'venues', component: VenueComponent },
   { path: 'manage', component: ManageComponent },
   { path: 'arrange', component: ArrangeComponent },
   { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
   { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
   { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
 ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RentalModule,
    VenueModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    SharedModule,
    NgbModule.forRoot(),
    ManageModule,
    ArrangeModule
  ],
  providers: [
  AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

