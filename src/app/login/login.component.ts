import { Component, OnInit, Input } from '@angular/core';
import { User } from '../modules/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  createHandler: Function;

  constructor(private userService: UserService) {}

  loginUser(user: User) {
    this.userService.loginUser(user)/*.then((newUser: User) => {
      this.createHandler(newUser);
    })*/;
  }

  ngOnInit() {
  }

}
