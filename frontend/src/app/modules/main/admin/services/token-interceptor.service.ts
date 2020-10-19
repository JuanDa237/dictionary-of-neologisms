import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { AuthenticationService } from '@modules/main/landing/services/index';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ){}

  intercept(request: any, next: any) {
    
    const tokenizeRequest = request.clone({
      setHeaders: {
        "Authorization": `Bearer ${this.authenticationService.getToken()}`
      }
    });

    return next.handle(tokenizeRequest);
  }
}
