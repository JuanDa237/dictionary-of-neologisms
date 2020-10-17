import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as categoriesServices from "./services";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    categoriesServices.services
  ]
})
export class CategoriesModule { }