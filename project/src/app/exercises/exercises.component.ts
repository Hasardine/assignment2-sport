import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  constructor(
    private appComp: AppComponent ) { 
      this.appComp.bgSettings("Exercises");
    }

  ngOnInit() {
  }

}
