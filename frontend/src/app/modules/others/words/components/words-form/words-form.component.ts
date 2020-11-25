import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	OnInit,
	Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Category } from '@modules/others/categories/models';
import { CategoriesService } from '@modules/others/categories/services';

import { WordsService } from '../../services';
import { Word, WordFile } from '../../models';
import { Role, User } from '@modules/main/navigation/models';
import { UsersService } from '@modules/main/navigation/services';

@Component({
	selector: 'app-words-form',
	templateUrl: './words-form.component.html',
	styleUrls: ['./words-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class WordsFormComponent implements OnInit {
	public wordForm: FormGroup;

	public selectedFiles: File[];

	@Output()
	private onSubmitEvent: EventEmitter<null>;

	@Output()
	private creatingForm: EventEmitter<boolean>;

	@Output()
	private invalidForm: EventEmitter<boolean>;

	public creating: boolean;
	public categories: Category[];

	public preview: string;

	public user: User;

	constructor(
		private wordsService: WordsService,
		private categoriesService: CategoriesService,
		private activatedRoute: ActivatedRoute,
		private ref: ChangeDetectorRef,
		private usersService: UsersService
	) {
		this.wordForm = new FormGroup({
			_id: new FormControl(null),
			idCategory: new FormControl(null, Validators.required),
			word: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30)
			]),
			definition: new FormControl(null),
			visible: new FormControl(false),
			conceptVideo: new FormControl(null),
			meaningVideo: new FormControl(null)
		});

		this.onSubmitEvent = new EventEmitter<null>();
		this.creatingForm = new EventEmitter<boolean>();
		this.invalidForm = new EventEmitter<boolean>();

		this.creating = true;
		this.categories = new Array<Category>(0);
		this.preview = '';
		this.selectedFiles = new Array<File>(2);

		this.user = this.usersService.getUser();
	}

	ngOnInit(): void {
		this.wordForm.valueChanges.subscribe(() => {
			this.invalidForm.emit(this.wordForm.invalid);
		});

		this.getUrlParams();
		this.getCategories();
	}

	//Private methods
	private getUrlParams(): void {
		const id: string = this.activatedRoute.snapshot.params.id;
		this.creating = id == null;

		this.creatingForm.emit(this.creating);

		if (!this.creating) {
			this.wordsService.getWord(id).subscribe(
				(response) => {
					this.setWordValues(response);
				},
				(error) => {
					throw new Error(error);
				}
			);
		}
	}

	private getCategories(): void {
		this.categoriesService.getCategories().subscribe(
			(response) => {
				this.categories = response;
				this.ref.markForCheck();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	//Component methods
	public submitEvent(): void {
		if (this.wordForm.valid) this.onSubmitEvent.emit(null);
	}

	//Public methods
	public getWordValues(): WordFile {
		var word = this.wordForm.value as WordFile;
		word.conceptVideoFile = this.selectedFiles[0];
		word.meaningVideoFile = this.selectedFiles[1];
		return word;
	}

	public setWordValues(word: Word): void {
		this.wordForm.patchValue({
			_id: word._id,
			idCategory: word.idCategory,
			word: word.word,
			definition: word.definition,
			visible: word.visible
		});
	}

	// Html methods

	public onFileChange(event: any, input: number): void {
		if (input >= 0 && input <= 1) this.selectedFiles[input] = event.target.files[0];
	}

	public isLogogenist(): boolean {
		return this.user.role == Role.LOGOGENIST;
	}
}
