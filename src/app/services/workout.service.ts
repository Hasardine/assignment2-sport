import { Injectable } from '@angular/core';
import { Workout } from '../modules/workout';
import { Http, Response } from '@angular/http';

@Injectable()
export class WorkoutService {
  
  private workoutsUrl = '/api/workouts';

  constructor (private http: Http) {}

  // get("/api/workouts")
  getWorkouts(): Promise<void | Workout[]> {
    return this.http.get(this.workoutsUrl)
               .toPromise()
               .then(response => response.json() as Workout[])
               .catch(this.handleError);
  }

  // post("/api/workouts")
  createWorkout(newWorkout: Workout): Promise<void | Workout> {
    return this.http.post(this.workoutsUrl, newWorkout)
               .toPromise()
               .then(response => response.json() as Workout)
               .catch(this.handleError);
  }

  // get("/api/workouts/:id") endpoint not used by Angular app

  // delete("/api/workouts/:id")
  deleteWorkout(delWorkoutId: String): Promise<void | String> {
    return this.http.delete(this.workoutsUrl + '/' + delWorkoutId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
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
