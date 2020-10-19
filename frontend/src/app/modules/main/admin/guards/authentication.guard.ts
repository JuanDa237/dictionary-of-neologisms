import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from "@modules/main/landing/services/index";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  canActivate(): boolean {
    
    var canContinue: boolean = this.authenticationService.loggedIn();

    if(!canContinue) this.router.navigate(['/error/401']);

    return canContinue;
  }
}
