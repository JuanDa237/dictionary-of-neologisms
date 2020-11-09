import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//Api
import { environment } from '@enviroment/environment';

//Models
import { Word } from '../models/index';

@Injectable({
	providedIn: 'root'
})
export class WordsService {
	private apiUrl: string;
	private headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders().set('Content-type', 'application/json');
		this.apiUrl = environment.apiUrl;
	}

	//Get list
	getWords(): Observable<Word[]> {
		return this.http.get<Word[]>(this.apiUrl + 'words', { headers: this.headers });
	}

	getMeWords(): Observable<Word[]> {
		return this.http.get<Word[]>(this.apiUrl + 'me/words', { headers: this.headers });
	}

	//Get one
	getWord(id: string): Observable<Word> {
		return this.http.get<Word>(this.apiUrl + 'word/' + id, { headers: this.headers });
	}

	//Post
	saveWord(newWord: Word, conceptVideo: File, meaningVideo?: File): Observable<any> {
		var params: FormData = new FormData();

		params.append('idCategory', newWord.idCategory);
		params.append('word', newWord.word);
		params.append('definition', newWord.definition);
		params.append('visible', newWord.visible ? 'true' : 'false');

		// Videos
		params.append('conceptVideo', conceptVideo);

		if (typeof meaningVideo != 'undefined') params.append('meaningVideo', meaningVideo);

		console.log(params);
		return this.http.post(this.apiUrl + 'word', params, {
			headers: this.headers,
			reportProgress: true,
			observe: 'events'
		});
	}

	//Delete
	deleteWord(id: string): Observable<any> {
		return this.http.delete(this.apiUrl + 'word/' + id, { headers: this.headers });
	}
}
