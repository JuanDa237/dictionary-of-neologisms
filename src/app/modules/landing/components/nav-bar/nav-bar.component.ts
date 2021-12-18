import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
	constructor(@Inject(PLATFORM_ID) private platformId: any) {}

	ngOnInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.navbarColorChange();
			this.navbarScrollTransitions();
		}
	}

	private navbarColorChange(): void {
		var nav = document.querySelector('nav');
		var welcome = document.getElementById('welcome');
		var heightForChange: number = 60;

		if (welcome) {
			heightForChange = welcome.offsetHeight;
		}

		window.addEventListener('scroll', function () {
			if (nav != null) {
				if (window.pageYOffset > heightForChange) {
					nav.classList.add('bg-primary', 'shadow');
				} else {
					nav.classList.remove('bg-primary', 'shadow');
				}
			}
		});
	}

	private navbarScrollTransitions(): void {
		var newScrollPosition = 0;
		var lastScrollPosition = 0;
		var navbar = document.getElementById('principal-nav');

		window.addEventListener('scroll', function (e) {
			if (navbar) {
				lastScrollPosition = window.scrollY;

				if (newScrollPosition < lastScrollPosition && lastScrollPosition > 100) {
					// Scrolling down
					navbar.classList.remove('slideDown');
					navbar.classList.add('slideUp');

					// Close nav in mobile
					var toggler = document.getElementById('navbar-toggler');

					if (toggler?.getAttribute('aria-expanded') == 'true') {
						toggler.click();
					}
				} else if (newScrollPosition > lastScrollPosition) {
					// Scrolling up
					navbar.classList.remove('slideUp');
					navbar.classList.add('slideDown');
				}

				newScrollPosition = lastScrollPosition;
			}
		});
	}
}
