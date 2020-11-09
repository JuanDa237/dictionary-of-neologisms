import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category, createEmptyCategory } from '@modules/others/categories/models';
import { CategoriesService } from '@modules/others/categories/services';

import { Word, createEmptyWord } from '../../models';
import { WordsService } from '../../services';

import { environment } from '@enviroment/environment';

import { Video, createEmptyVideo } from '../../models/index';

@Component({
	selector: 'app-word',
	templateUrl: './word.component.html',
	styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
	public word: Word;
	public category: Category;
	public videos: Video[];

	public loadingVideos: boolean;

	constructor(
		private wordsService: WordsService,
		private categoriesService: CategoriesService,
		private activatedRoute: ActivatedRoute
	) {
		this.word = createEmptyWord();
		this.category = createEmptyCategory();

		this.videos = new Array<Video>(2);

		for (var i = 0; i < this.videos.length; i++) {
			this.videos[i] = createEmptyVideo();
		}

		this.loadingVideos = true;
	}

	ngOnInit(): void {
		this.getWord();
	}

	private getWord(): void {
		const id: string = this.activatedRoute.snapshot.params.id;

		this.wordsService.getWord(id).subscribe(
			(response) => {
				this.word = response;
				this.getVideos();
				this.getCategory();
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private getCategory(): void {
		this.categoriesService.getCategory(this.word.idCategory).subscribe(
			(response) => {
				this.category = response;
			},
			(error) => {
				throw new Error(error);
			}
		);
	}

	private getVideos(): void {
		const apiUrl = environment.apiUrl;

		this.videos.forEach((video, index) => {
			switch (index) {
				case 0:
					video.src = apiUrl + this.word.conceptVideo;
					video.type = 'video/' + this.word.conceptVideo?.split('.').pop();
					break;
				case 1:
					if (this.word.meaningVideo != '') {
						video.src = apiUrl + this.word.meaningVideo;
						video.type = 'video/' + this.word.meaningVideo?.split('.').pop();
					}
					break;
			}
		});

		this.loadingVideos = false;
	}
}
