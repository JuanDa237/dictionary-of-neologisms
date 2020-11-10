import { Component, OnInit } from '@angular/core';

import { UsersService } from '@modules/main/navigation/services';
import { WordsService } from '../../services';
import { CategoriesService } from '@modules/others/categories/services';

import { Word } from '../../models';
import { Category } from '@modules/others/categories/models';

@Component({
	selector: 'app-admin-words',
	templateUrl: './admin-words.component.html'
})
export class AdminWordsComponent implements OnInit {
	public words: Word[];
	public categories: Category[];

	constructor(
		private wordsService: WordsService,
		private categoriesService: CategoriesService,
		private userService: UsersService
	) {
		this.words = new Array<Word>(0);
		this.categories = new Array<Category>(0);
	}

	ngOnInit(): void {
		this.getWords();
		this.getCategories();
	}

	private getWords(): void {
		this.wordsService.getWords().subscribe(
			(resolve) => {
				this.words = resolve;
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
}
