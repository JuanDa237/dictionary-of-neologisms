import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WordFilterService {

    private filterChange: Subject<string>;

    public filter$: Observable<string>;

    constructor() {
        this.filterChange = new Subject<string>();
        this.filter$ = this.filterChange.asObservable();
    }

    public setFilter(filter: string): void {
        this.filterChange.next(filter);
    }
}