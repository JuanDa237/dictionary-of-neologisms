import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { WordFilterService } from '@modules/others/words/services/index';

@Component({
	selector: 'app-home-nav',
	templateUrl: './home-nav.component.html',
	styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent {
	public filterWord: string;

	constructor(private wordFilterService: WordFilterService, public router: Router) {
		this.filterWord = '';

		this.router.events.subscribe((change) => {
			if (change instanceof NavigationEnd) this.filterWord = '';
		});
	}

	public onChangeFilter(): void {
		this.wordFilterService.setFilter(this.filterWord);
	}
}
