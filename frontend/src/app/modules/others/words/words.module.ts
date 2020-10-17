import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as wordsComponents from "./components";
import * as wordsServices from "./services";
import * as wordsPipes from "./pipes";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    wordsServices.services
  ],
  declarations: [
    wordsComponents.components,
    wordsPipes.pipes
  ],
  exports: [
    wordsComponents.components
  ]
})
export class WordsModule { }
