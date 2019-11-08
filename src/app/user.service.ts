import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4200/register';

  constructor(private http: HttpClient) { }

  addUser(UserName, UserPassword) {
    const obj = {
      UserName,
      UserPassword
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
}
