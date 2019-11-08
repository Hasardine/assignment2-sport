import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ExercisesComponent } from './exercises/exercises.component';


const routes: Routes = [
  {
    path:'',
    component: IndexComponent
  } ,
  {
    path:'register',
    component: RegisterComponent
  } ,
  {
    path:'login',
    component: LoginComponent
  } ,
  {
    path:'exercises',
    component: ExercisesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
