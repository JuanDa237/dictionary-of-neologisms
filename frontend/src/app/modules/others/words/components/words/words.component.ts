import { Component, OnInit } from '@angular/core';

import { Word } from '../../models';
import { WordFilterService, WordsService } from '../../services';

import { Category } from '../../../categories/models/index';
import { CategoriesService } from '../../../categories/services/index';

@Component({
	selector: 'app-words',
	templateUrl: './words.component.html'
})
export class WordsComponent implements OnInit {
	public words: Word[];
	public categories: Category[];

	public filterWord: string;

	constructor(
		private wordsService: WordsService,
		private categoriesService: CategoriesService,
		public wordFilterService: WordFilterService
	) {
		this.words = new Array<Word>(0);
		this.categories = new Array<Category>(0);
		this.filterWord = '';

		const subscription = wordFilterService.filter$.subscribe((filter) => {
			this.filterWord = filter;
		});
	}

	ngOnInit(): void {
		this.getWords();
		this.getCategories();
	}

	private getWords(): void {
		this.wordsService.getVisibleWords().subscribe(
			(response) => {
				this.words = response.sort(() => {
					return Math.random() - 0.5;
				});
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private getCategories() {
		this.categoriesService.getCategories().subscribe(
			(response) => {
				this.categories = response;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}
}
