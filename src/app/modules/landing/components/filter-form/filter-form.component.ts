import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Category } from '@modules/categories/models';

@Component({
	selector: 'app-filter-form',
	templateUrl: './filter-form.component.html',
	styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {
	public filterForm: FormGroup;

	@Input()
	public idForm: string;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	public categories: Category[];

	constructor() {
		this.filterForm = new FormGroup({
			word: new FormControl(''),
			category: new FormControl(null)
		});

		this.idForm = '';

		this.onSubmitEvent = new EventEmitter<null>();
		this.invalidForm = new EventEmitter<boolean>();

		this.categories = [];
	}

	ngOnInit(): void {}

	public submitEvent(): void {
		if (this.filterForm.valid) this.onSubmitEvent.emit(null);
	}

	get word() {
		return this.filterForm.get('word');
	}
	get category() {
		return this.filterForm.get('category');
	}
}
