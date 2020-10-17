import { Component, OnInit } from '@angular/core';
import { Word } from '../../models';
import { WordsService } from '../../services';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styles: [
  ]
})
export class WordsComponent implements OnInit { 

  public words: Word[];

  constructor(
    private wordsService: WordsService
  ) {
    this.words = new Array<Word>(0);
  }

  ngOnInit(): void {
    this.getWords();
  }

  private getWords(): void {
    this.wordsService.getWords().subscribe(
      response => {
        this.words = response;
      },
      error => {throw new Error(error)}
    );
  }
}