import { Injectable } from '@angular/core';
import { User } from '../modules/user';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  private usersUrl = '/api/users';

  constructor(private http: Http) {}

  // get("/api/users")
  getUsers(): Promise<void | User[]> {
    return this.http.get(this.usersUrl)
               .toPromise()
               .then(response => response.json() as User[])
               .catch(this.handleError);
  }

  // post("/api/users")
  createUser(newUser: User): Promise<void | User> {
    return this.http.post(this.usersUrl, newUser)
               .toPromise()
               .then(response => response.json() as User)
               .catch(this.handleError);
  }

  // get("/api/users/:id") endpoint not used by Angular app

  // delete("/api/users/:id")
  deleteUser(delUserId: String): Promise<void | String> {
    return this.http.delete(this.usersUrl + '/' + delUserId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/users/:id")
  updateUser(putUser: User): Promise<void | User> {
    var putUrl = this.usersUrl + '/' + putUser._id;
    return this.http.put(putUrl, putUser)
               .toPromise()
               .then(response => response.json() as User)
               .catch(this.handleError);
  }
  
  loginUser(loggedUser: User) /*: Promise<void | User> */{ }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

  create(user: User) {
            return this.http.post('/api/register', user, this.jwt()).map((response: Response) => response.json());
    }


    public jwt() {
            // create authorization header with jwt token
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.token) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
                    return new RequestOptions({ headers: headers });
            }
    }

    public getCurrentUserName() {
        if (localStorage.getItem('currentUser')){
            var token = localStorage.getItem('currentUser');
            var payload = JSON.parse(atob(token.split('.')[1]));
            return payload.name;
        }

    }

    
}