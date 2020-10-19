import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

//Api
import { environment } from '@enviroment/environment';

import { User } from "../models";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private apiUrl: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
        this.headers = new HttpHeaders().set("Content-type", "application/json");
        this.apiUrl = environment.apiUrl;
    }

    //Get logged user
    getUser(): Observable<User> {
        return this.http.get<User>(this.apiUrl + "user", { headers: this.headers});
    }
}