import {
	AfterContentInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { WordsFormComponent } from '../../components';
import { WordsService } from '../../services';

@Component({
	selector: 'app-admin-form-word',
	templateUrl: './admin-form-word.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFormWordComponent implements AfterContentInit {
	public invalidForm: boolean;
	public creating: boolean;

	@ViewChild(WordsFormComponent)
	public formChild!: WordsFormComponent;

	constructor(
		private wordsServices: WordsService,
		private ref: ChangeDetectorRef,
		private router: Router
	) {
		this.invalidForm = true;
		this.creating = true;
	}

	ngAfterContentInit(): void {
		this.ref.markForCheck();
	}

	public createOrUpdateWord(): void {
		this.creating ? this.createWord() : this.updateWord();
	}

	private createWord(): void {
		this.wordsServices.saveWord(this.formChild.getWordValues()).subscribe(
			(resolve) => {
				this.router.navigate(['/admin/words']);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private updateWord(): void {
		this.wordsServices.updateWord(this.formChild.getWordValues()).subscribe(
			(resolve) => {
				this.router.navigate(['/admin/words']);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public deleteWord() {
		this.wordsServices.deleteWord(this.formChild.getWordValues()._id).subscribe(
			(resolve) => {
				this.router.navigate(['/admin/words']);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}
}
