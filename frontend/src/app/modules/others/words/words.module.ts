import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import * as wordsContainers from "./containers";
import * as wordsComponents from "./components";
import * as wordsServices from "./services";
import * as wordsPipes from "./pipes";

//Modules
import { AppCommonModule } from "../app-common/app-common.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AppCommonModule
  ],
  providers: [
    wordsServices.services
  ],
  declarations: [
    wordsContainers.containers,
    wordsComponents.components,
    wordsPipes.pipes
  ],
  exports: [
    wordsContainers.containers,
    wordsComponents.components
  ]
})
export class WordsModule { }
