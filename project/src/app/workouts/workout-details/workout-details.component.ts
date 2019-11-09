import { Component, OnInit } from '@angular/core';

import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {

  wS: WorkoutService

  constructor() { }

  ngOnInit() {
  }

  async deleteWorkout(workoutId) {
    this.wS.deleteWorkout(workoutId);
    await sleep(200); //We do that to wait the first request to finish
    //this.getList();
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
