import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//Api
import { environment } from '@enviroment/environment';

//Models
import { Word, WordFile } from '../models/index';

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
	getVisibleWords(): Observable<Word[]> {
		return this.http.get<Word[]>(this.apiUrl + 'words', { headers: this.headers });
	}

	getWords(): Observable<Word[]> {
		return this.http.get<Word[]>(this.apiUrl + 'words/all', { headers: this.headers });
	}

	getMeWords(): Observable<Word[]> {
		return this.http.get<Word[]>(this.apiUrl + 'me/words', { headers: this.headers });
	}

	//Get one
	getVisibleWord(id: string): Observable<Word> {
		return this.http.get<Word>(this.apiUrl + 'word/visible/' + id, { headers: this.headers });
	}

	getWord(id: string): Observable<Word> {
		return this.http.get<Word>(this.apiUrl + 'word/' + id, { headers: this.headers });
	}

	//Post
	saveWord(word: WordFile): Observable<any> {
		const fd = new FormData();
		fd.append('idCategory', word.idCategory);
		fd.append('word', word.word);
		fd.append('definition', word.definition);
		fd.append('visible', word.visible ? 'true' : 'false');

		if (word.conceptVideoFile)
			fd.append('conceptVideo', word.conceptVideoFile, word.conceptVideoFile.name);

		if (word.meaningVideoFile)
			fd.append('meaningVideo', word.meaningVideoFile, word.meaningVideoFile.name);

		return this.http.post<any>(this.apiUrl + 'word/', fd);
	}

	// Update
	updateWord(word: WordFile): Observable<any> {
		const fd = new FormData();
		fd.append('idCategory', word.idCategory);
		fd.append('word', word.word);
		fd.append('definition', word.definition);
		fd.append('visible', word.visible ? 'true' : 'false');

		if (word.conceptVideoFile)
			fd.append('conceptVideo', word.conceptVideoFile, word.conceptVideoFile.name);

		if (word.meaningVideoFile)
			fd.append('meaningVideo', word.meaningVideoFile, word.meaningVideoFile.name);

		return this.http.put<any>(this.apiUrl + 'word/' + word._id, fd);
	}

	//Delete
	deleteWord(id: string): Observable<any> {
		return this.http.delete(this.apiUrl + 'word/' + id, { headers: this.headers });
	}
}
