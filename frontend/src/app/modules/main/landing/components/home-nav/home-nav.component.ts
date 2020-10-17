import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { WordFilterService } from "@modules/others/words/services/index";

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html'
})
export class HomeNavComponent {

  public filterWord: string;

  constructor(
    private wordFilterService: WordFilterService,
    public router: Router
  ) {
    this.filterWord = '';
  }

  public onChangeFilter(): void {
    this.wordFilterService.setFilter(this.filterWord);
  }
}