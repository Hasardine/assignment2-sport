import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExercisesComponent } from './exercises/exercises.component';

import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    RegisterComponent,
    WorkoutsComponent,
    ExercisesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
