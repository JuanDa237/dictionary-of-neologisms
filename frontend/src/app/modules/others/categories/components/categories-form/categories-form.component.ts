import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models';

@Component({
	selector: 'app-categories-form',
	templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
	public categoryForm: FormGroup;

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	constructor() {
		this.categoryForm = new FormGroup({
			_id: new FormControl(''),
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			])
		});

		this.onSubmitEvent = new EventEmitter<null>();
		this.invalidForm = new EventEmitter<boolean>();
	}

	ngOnInit(): void {
		this.categoryForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.categoryForm.invalid);
		});
	}

	public submitEvent(): void {
		if (this.categoryForm.valid) this.onSubmitEvent.emit(null);
	}

	public getCategoryValues(): Category {
		return this.categoryForm.value as Category;
	}

	public setCategoryValues(category: Category): void {
		this.categoryForm.patchValue({
			_id: category._id,
			name: category.name
		});
	}
}
