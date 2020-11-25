import { Component, OnInit } from '@angular/core';

import { WordsService } from '../../services';
import { CategoriesService } from '@modules/others/categories/services';

import { Word } from '../../models';
import { Category } from '@modules/others/categories/models';
import { Role, User } from '@modules/main/navigation/models';
import { UsersService } from '@modules/main/navigation/services';

@Component({
	selector: 'app-admin-words',
	templateUrl: './admin-words.component.html'
})
export class AdminWordsComponent implements OnInit {
	public words: Word[];
	public categories: Category[];

	public user: User;
	public meWords: boolean;

	constructor(
		private wordsService: WordsService,
		private categoriesService: CategoriesService,
		private usersService: UsersService
	) {
		this.words = new Array<Word>(0);
		this.categories = new Array<Category>(0);

		this.user = this.usersService.getUser();
		this.meWords = false;
	}

	ngOnInit(): void {
		this.getSelectedWords();
		this.getCategories();
	}

	public getSelectedWords(): void {
		if (this.isLogogenist()) {
			this.meWords = true;
		} else {
			this.meWords = !this.meWords;
		}

		this.meWords ? this.getMeWords() : this.getWords();
	}

	private getWords(): void {
		this.wordsService.getWords().subscribe(
			(resolve) => {
				this.words = resolve;
				console.log('todas', this.words);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private getMeWords(): void {
		this.wordsService.getMeWords().subscribe(
			(resolve) => {
				this.words = resolve;
				console.log('mis', this.words);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private getCategories(): void {
		this.categoriesService.getCategories().subscribe(
			(resolve) => {
				this.categories = resolve;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	//Html methods
	public deleteWord(id: string): void {
		this.wordsService.deleteWord(id).subscribe(
			(resolve) => {
				const index: number = this.words
					.map((x) => {
						return x._id;
					})
					.indexOf(id);
				this.words.splice(index, 1);
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	public isLogogenist(): boolean {
		return this.user.role == Role.LOGOGENIST;
	}
}
