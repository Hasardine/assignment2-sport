import { Injectable } from '@angular/core';
import { Exercise } from '../modules/exercise';
import { Http, Response } from '@angular/http';

@Injectable()
export class ExerciseService {

  private exercisesUrl = '/api/exercises';

  constructor(private http: Http) {}

  // get("/api/exercises")
  getExercises(): Promise<void | Exercise[]> {
    return this.http.get(this.exercisesUrl)
               .toPromise()
               .then(response => response.json() as Exercise[])
               .catch(this.handleError);
  }

  // post("/api/exercises")
  createExercise(newExercise: Exercise): Promise<void | Exercise> {
    return this.http.post(this.exercisesUrl, newExercise)
               .toPromise()
               .then(response => response.json() as Exercise)
               .catch(this.handleError);
  }

  // get("/api/exercises/:id") endpoint not used by Angular app

  // delete("/api/exercises/:id")
  deleteExercise(delExerciseId: String): Promise<void | String> {
    return this.http.delete(this.exercisesUrl + '/' + delExerciseId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/users/:id")
  updateExercise(putExercise: Exercise): Promise<void | Exercise> {
    var putUrl = this.exercisesUrl + '/' + putExercise._id;
    return this.http.put(putUrl, putExercise)
               .toPromise()
               .then(response => response.json() as Exercise)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}