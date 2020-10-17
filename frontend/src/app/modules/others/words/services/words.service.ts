import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

//Api
import { environment } from '@enviroment/environment';

//Models
import { Word } from '../models/index'

@Injectable({
    providedIn: 'root'
})
export class WordsService {

    private apiUrl: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
        this.headers = new HttpHeaders().set("Content-type", "application/json");
        this.apiUrl = environment.apiUrl;
    }

    //Get list
    getWords(): Observable<Word[]> {
        return this.http.get<Word[]>(this.apiUrl + "words", { headers: this.headers});
    }

    //Get one
    getWord(id: string): Observable<Word> {
        return this.http.get<Word>(this.apiUrl + "word/" + id, { headers: this.headers});
    }
}