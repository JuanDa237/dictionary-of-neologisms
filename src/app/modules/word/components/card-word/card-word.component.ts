import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-card-word',
	templateUrl: './card-word.component.html',
	styleUrls: ['./card-word.component.scss']
})
export class CardWordComponent implements OnInit {
	public text: string;

	constructor() {
		this.text =
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus sapiente exercitationem odio ratione nam vitae dolore a ad voluptatum hic, odit magnam asperiores architecto esse illum eum repellat iste quisquam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus sapiente exercitationem odio ratione nam vitae dolore a ad voluptatum hic, odit magnam asperiores architecto esse illum eum repellat iste quisquam.';
	}

	ngOnInit(): void {}
}
