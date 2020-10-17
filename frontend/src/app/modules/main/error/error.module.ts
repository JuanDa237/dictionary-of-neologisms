import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { containers as errorContainers } from "./containers/index";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    errorContainers
  ],
  exports:[
    errorContainers
  ]
})
export class ErrorModule { }