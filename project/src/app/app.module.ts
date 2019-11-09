import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExercisesDetailsComponent } from './exercises/exercises-details/exercises-details.component';
import { WorkoutDetailsComponent } from './workouts/workout-details/workout-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ExercisesComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    WorkoutsComponent,
    ExercisesDetailsComponent,
    WorkoutDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
