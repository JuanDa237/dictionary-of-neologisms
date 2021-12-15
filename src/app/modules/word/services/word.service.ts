import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@enviroment/environment';
import { Word } from '../models';

@Injectable({
	providedIn: 'root'
})
export class WordService {
	private apiUrl: string;
	private headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;
	}

	getWords(): Observable<Word[]> {
		return this.http.get<Word[]>(this.apiUrl + 'words', { headers: this.headers });
	}
}
