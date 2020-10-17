import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as wordsComponents from "./components";
import * as wordsServices from "./services";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    wordsServices.services
  ],
  declarations: [
    wordsComponents.components
  ],
  exports: [
    wordsComponents.components
  ]
})
export class WordsModule { }
