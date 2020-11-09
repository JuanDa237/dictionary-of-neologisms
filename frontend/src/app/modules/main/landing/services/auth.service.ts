import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

//Models
import { User } from '../models/index';

//Api
import { environment } from '@enviroment/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl: string;
	private headers: HttpHeaders;

	constructor(private http: HttpClient, private router: Router) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;
	}

	//Post
	signIn(user: User): Observable<any> {
		return this.http.post(this.apiUrl + 'auth/singIn', user, {
			headers: this.headers,
			observe: 'response'
		});
	}

	loggedIn(): boolean {
		return !!localStorage.getItem('token'); //Verify if exists
	}

	getToken(): string {
		var token: string | null = localStorage.getItem('token');
		return token ? token : '';
	}

	logOut(redirection: boolean): void {
		localStorage.removeItem('token');
		localStorage.removeItem('loggedUser');

		if (redirection) {
			this.router.navigate(['/']);
		}
	}
}
