import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChildActivationEnd, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SEOService } from './modules/app-common/services';

@Component({
	selector: 'app-root',
	template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
	constructor(
		private router: Router,
		private seoS: SEOService,
		@Inject(PLATFORM_ID) private platformId: any
	) {}

	ngOnInit() {
		this.routeDataUpdates();

		// In Browser
		if (isPlatformBrowser(this.platformId)) {
			this.scrollToTop();

			// Scripts
			this.google();
		}
	}

	private routeDataUpdates(): void {
		this.router.events
			.pipe(filter((event) => event instanceof ChildActivationEnd))
			.subscribe((event) => {
				let snapshot = (event as ChildActivationEnd).snapshot;

				while (snapshot.firstChild !== null) {
					snapshot = snapshot.firstChild;
				}

				this.seoS.updateTitle(snapshot.data.title || 'Javier Propiedades');
			});
	}

	private google(): void {
		// Google Fonts
		this.createComment('Google Fonts');

		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href =
			'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';

		document.getElementsByTagName('head')[0].appendChild(link);

		this.createComment('End Google Fonts');
	}

	private scrollToTop(): void {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}

			if (evt.url.indexOf('#') <= -1) {
				window.scrollTo(0, 0);
			}
		});
	}

	// Useful Methods

	private createComment(comment: string, inTag?: 'head' | 'body'): void {
		let message = document.createComment(comment);

		if (inTag == null) inTag = 'head';

		document.getElementsByTagName(inTag)[0].appendChild(message);
	}

	private createScript(url: string, inTag?: 'head' | 'body'): void {
		let script = document.createElement('script');
		script.src = url;
		script.type = 'text/javascript';
		script.async = true;

		if (inTag == null) inTag = 'head';

		document.getElementsByTagName(inTag)[0].appendChild(script);
	}
}
