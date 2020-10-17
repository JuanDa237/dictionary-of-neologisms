import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

//Api
import { environment } from '@enviroment/environment';

import { Category } from "../models/index";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    private apiUrl: string;
    private headers: HttpHeaders;

    constructor (
        private http: HttpClient
    ) {
        this.headers = new HttpHeaders().set("Content-type", "application/json");
        this.apiUrl = environment.apiUrl;
    }

    //Get List
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl + "categories", { headers: this.headers});
    }

    //Get One
    getCategory(id: number): Observable<Category> {
        return this.http.get<Category>(this.apiUrl + "category/" + id, { headers: this.headers});
    }

    //Post
    saveCategory(newCategory: Category): Observable<any> {
        let params = JSON.stringify(newCategory);
        return this.http.post(this.apiUrl + "category", params, { headers: this.headers});
    }

    //Update
    updateCategory(category: Category): Observable<any> {
        var params = JSON.stringify(category);
        return this.http.put(this.apiUrl + "category/" + category._id, params, { headers: this.headers});
    }

    //Delete
    deleteCategory(id: number): Observable<any> {
        return this.http.delete(this.apiUrl + "category/" + id, { headers: this.headers});
    }
}