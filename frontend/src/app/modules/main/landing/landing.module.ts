import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import * as landingContainers from "./containers/index";
import * as landingComponents from "./components";

//Modules
import { NavigationModule } from "../navigation/navigation.module";
import { WordsModule } from "@modules/others/words/words.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavigationModule,
    WordsModule
  ],
  declarations: [
    landingContainers.containers,
    landingComponents.components
  ],
  exports: [
    landingContainers.containers,
    landingComponents.components
  ]
})
export class LandingModule { }