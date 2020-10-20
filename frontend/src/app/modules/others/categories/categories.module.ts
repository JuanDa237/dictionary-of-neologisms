import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as categoriesServices from "./services";
import * as categoriesContainers from "./containers";

import { AppCommonModule } from "../app-common/app-common.module";

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule
  ],
  providers: [
    categoriesServices.services
  ],
  declarations: [
    categoriesContainers.containers
  ],
  exports: [
    categoriesContainers.containers
  ]
})
export class CategoriesModule { }