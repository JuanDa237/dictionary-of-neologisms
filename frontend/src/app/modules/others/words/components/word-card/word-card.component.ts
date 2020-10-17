import { Component, Input } from '@angular/core';
import { Word } from '../../models';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent { 

  @Input()
  public word: Word;

  @Input()
  category: string;
}