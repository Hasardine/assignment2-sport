import { Injectable } from '@angular/core';
import { Workout } from '../modules/workout';
import { Http, Response } from '@angular/http';
import { UserService } from './user.service';

import 'rxjs/add/operator/map';

@Injectable()
export class WorkoutService {
  
  uS: UserService
  private workoutsUrl = '/api/workouts';

  constructor (private http: Http) {}

  // get("/api/workouts")
  getWorkouts() {
    return this.http.get(this.workoutsUrl).map(res => res.json());
  }

  // post("/api/workouts")
  createWorkout(newWorkout){
    return this.http.post(this.workoutsUrl, newWorkout, this.uS.jwt()).map(res => res.json());
  }

  // get("/api/workouts/:id") endpoint not used by Angular app

  // delete("/api/workouts/:id")
  deleteWorkout(workoutId) {
    return this.http.delete(this.workoutsUrl + workoutId, this.uS.jwt()).subscribe(res => console.log(res));
  }

  // put("/api/workouts/:id")
  updateWorkout(putWorkout: Workout): Promise<void | Workout> {
    var putUrl = this.workoutsUrl + '/' + putWorkout._id;
    return this.http.put(putUrl, putWorkout)
               .toPromise()
               .then(response => response.json() as Workout)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}