import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../modules/workout';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  wS: WorkoutService
  workoutsList: Workout[]

  constructor(
    private appComp: AppComponent  ) { 
      this.appComp.bgSettings("Workouts");

      this.getList();
    }

  ngOnInit() {
  }

  getList() {
    this.wS.getWorkouts().subscribe(workouts => {
        this.workoutsList = workouts;
    });
  }

  async deleteWorkout(workoutId) {
    this.wS.deleteWorkout(workoutId);
    await sleep(200); //We do that to wait the first request to finish
    this.getList();
  }
  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
