import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as navigationComponents from "./components";
import * as navigationLayouts from "./layouts";
import * as navigationServices from "./services";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    navigationServices.services
  ],
  declarations: [
    navigationComponents.components,
    navigationLayouts.layouts
  ],
  exports: [
    navigationComponents.components,
    navigationLayouts.layouts
  ]
})
export class NavigationModule { }