import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { AuthenticationService } from '../../services/index';

//Models
import { User } from '../../models/index';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {

  public user: User;
  public error: Array<boolean>;
  public rememberUser: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.user = {
      username: '',
      password: ''
    }
    this.error = new Array<boolean>(2);
    this.rememberUser = false;
  }

  ngOnInit(): void {

    this.authenticationService.logOut(false);
    
    //Get the old user
    var oldUser: string | null = localStorage.getItem("user");
    if(oldUser) {
      this.user = JSON.parse(oldUser);
      this.rememberUser = true;
    }
  }

  public signIn(): void {
    
    this.authenticationService.signIn(this.user).subscribe(
      resolve => {
        
        localStorage.setItem("token", resolve.headers.get("token"));

        if(this.rememberUser) {
          localStorage.setItem("user", JSON.stringify(this.user));
        }
        else {
          localStorage.removeItem("user");
        }

        this.router.navigate(["admin/words"]);
      },
      error => {
        if(error.status == 404) {
          this.error[0] = true;
          this.error[1] = false;
        }
        else if(error.status == 401) {
          this.error[0] = false;
          this.error[1] = true;
        }
      }
    );
  }

  public enterEvent(event: any): void {
    this.signIn();    
  }
}