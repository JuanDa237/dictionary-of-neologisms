import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, OnChanges {
	@Input()
	public idModal: string;

	@Input()
	public title: string;

	constructor() {
		this.title = '';
		this.idModal = '';
	}

	ngOnInit() {
		this.checkRequiredFields();
	}

	ngOnChanges() {
		this.checkRequiredFields();
	}

	checkRequiredFields(): void {
		if (this.idModal === '') {
			this.idModal = 'modal';
			throw new Error("Attribute 'idModal' is required.");
		}
	}
}
