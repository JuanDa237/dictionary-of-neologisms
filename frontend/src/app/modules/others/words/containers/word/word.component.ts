import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category, createEmptyCategory } from '@modules/others/categories/models';
import { CategoriesService } from '@modules/others/categories/services';

import { Word, createEmptyWord } from '../../models';
import { WordsService } from '../../services';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html'
})
export class WordComponent implements OnInit {

  public word: Word;
  public category: Category;

  constructor(
    private wordsService: WordsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.word = createEmptyWord();
    this.category = createEmptyCategory();
  }

  ngOnInit(): void {
    this.getWord();
  }

  private getWord(): void {
    const id: string = this.activatedRoute.snapshot.params.id;

    this.wordsService.getWord(id).subscribe(
      response => {
        this.word = response;
        this.getCategory();
      },
      error => {throw new Error(error)}
    );
  }

  private getCategory(): void {
    this.categoriesService.getCategory(this.word.idCategory).subscribe(
      response => {
        this.category = response;
      },
      error => {throw new Error(error)}
    );
  }
}