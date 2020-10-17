import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {

  public user: User;
  public error: Array<boolean>;
  public rememberUser: boolean;

  constructor(
    private router: Router
  ){
    this.user = {
      username: '',
      password: ''
    }
    this.error = new Array<boolean>(2);
    this.rememberUser = false;
  }

  ngOnInit(): void { }

  public signIn(): void { 
    this.router.navigate(["/"]);
  }
}