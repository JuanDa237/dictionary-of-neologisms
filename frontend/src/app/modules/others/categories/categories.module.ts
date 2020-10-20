import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as categoriesServices from "./services";
import * as categoriesContainers from "./containers";
import * as categoriesComponents from "./components";

import { AppCommonModule } from "../app-common/app-common.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppCommonModule
  ],
  providers: [
    categoriesServices.services
  ],
  declarations: [
    categoriesContainers.containers,
    categoriesComponents.components
  ],
  exports: [
    categoriesContainers.containers,
    categoriesComponents.components
  ]
})
export class CategoriesModule { }