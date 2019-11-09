import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import{ AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutDetailsComponent } from './workouts/workout-details/workout-details.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExercisesDetailsComponent } from './exercises/exercises-details/exercises-details.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    WorkoutsComponent,
    WorkoutDetailsComponent,
    ExercisesComponent,
    ExercisesDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
