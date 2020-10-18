import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as appComponetns from "./components";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    appComponetns.components
  ],
  exports: [
    appComponetns.components
  ]
})
export class AppCommonModule { }