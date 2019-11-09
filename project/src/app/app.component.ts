import { Component } from '@angular/core';
import { User } from './modules/user';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User

  title: string;
  collapsed: boolean = true;

  constructor( ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  bgSettings(conf) {
    switch(conf) {
      case "Index":
        this.title = "Fitness Website";
        break;
      case "Login":
        this.title = "Login page";
        break;
      case "Register":
        this.title = "Registration form";
        break;
      case "Workouts":
        this.title = "Workouts";
        break;
      case "Exercises":
        this.title = "Exercises";
        break;      
    }
  }
}
