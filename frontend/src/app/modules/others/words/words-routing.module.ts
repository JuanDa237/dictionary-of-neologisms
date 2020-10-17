import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as wordsContainers from "./containers";

//Module
import { WordsModule } from "./words.module";

const routes: Routes = [
  {
    path: 'word/:id',
    component: wordsContainers.WordComponent,
  }
];

@NgModule({
  imports: [WordsModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule { }
