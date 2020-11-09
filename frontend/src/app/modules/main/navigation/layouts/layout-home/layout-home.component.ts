import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-layout-home',
	templateUrl: './layout-home.component.html',
	styleUrls: ['./layout-home.component.scss']
})
export class LayoutHomeComponent {
	constructor(public router: Router) {}
}
