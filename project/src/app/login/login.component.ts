import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../modules/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  model: any = {};
  loggedUser: User
  aS: AuthService
  returnUrl: string;
  loggedin = false;

  constructor(
    private appComp: AppComponent,
    private route: ActivatedRoute,
    private router: Router ) {
      this.appComp.bgSettings("Login");
    }


  ngOnInit() {
    
        // reset login status
        this.aS.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loggedin = true;
    this.aS.login(this.model.password)
      .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      });
  }

}
