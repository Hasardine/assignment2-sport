import { Component , OnInit} from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../modules/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  model: any = {};
  loading = false;

  newUser: User
  uS: UserService

  constructor(
    private appComp: AppComponent,
    private router: Router) { 
      this.appComp.bgSettings("Register");
    }

  register() {
    this.loading = true;
    this.uS.create(this.model)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.router.navigate(['/login']);
      },
      error => {
        this.loading = false;
      });
  }

  addUser(UserName, UserPassword) {
    this.newUser.name = UserName;
    this.newUser.password = UserPassword;
    this.uS.createUser(this.newUser);
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
