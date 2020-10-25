import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import { AuthService } from '@modules/main/landing/services';

@Injectable({
	providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(request: any, next: any) {
		const tokenizeRequest = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.authService.getToken()}`
			}
		});

		return next.handle(tokenizeRequest);
	}
}
