import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	template: '<router-outlet></router-outlet>'
})
export class AppComponent {
	constructor(private router: Router, private titleService: Title) {
		this.router.events
			.pipe(filter((event) => event instanceof ChildActivationEnd))
			.subscribe((event) => {
				let snapshot = (event as ChildActivationEnd).snapshot;

				while (snapshot.firstChild !== null) {
					snapshot = snapshot.firstChild;
				}

				this.titleService.setTitle(snapshot.data.title || 'Caja Registradora');
			});
	}
}
