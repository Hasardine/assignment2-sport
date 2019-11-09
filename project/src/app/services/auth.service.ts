import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  loggedin: boolean;
  constructor(private http: Http) {
    this.loggedin = false;
  }


  login(password: string) {
    const body = {password: password }; 
    return this.http.post('/api/login', body).map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json();
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.loggedin = true;
      }
      return user;

    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedin = false;
  }

  isloggedin() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
    
}
