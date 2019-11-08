import { Component, OnInit, Input } from '@angular/core';
import { User } from '../modules/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  createHandler: Function;

  constructor(private userService: UserService) {}

  createUser(user: User) {
    this.userService.createUser(user).then((newUser: User) => {
      this.createHandler(newUser);
    });
  }

  ngOnInit() {}

}
