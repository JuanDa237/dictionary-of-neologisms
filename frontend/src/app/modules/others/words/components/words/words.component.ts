import { Component, OnInit } from '@angular/core';
import { Word } from '../../models';
import { WordsService } from '../../services';
import { Category } from "../../../categories/models/index";
import { CategoriesService } from "../../../categories/services/index";

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styles: [
  ]
})
export class WordsComponent implements OnInit { 

  public words: Word[];
  public categories: Category[]

  constructor(
    private wordsService: WordsService,
    private categoriesService: CategoriesService
  ) {
    this.words = new Array<Word>(0);
  }

  ngOnInit(): void {
    this.getWords();
    this.getCategories();
  }

  private getWords(): void {
    this.wordsService.getWords().subscribe(
      response => {
        this.words = response;
      },
      error => {throw new Error(error)}
    );
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe(
      response => {
        this.categories = response;
      },
      error => {throw new Error(error)}
    );
  }
}