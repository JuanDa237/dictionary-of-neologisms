import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as errorContainers from "./containers/index";

//Modules
import { NavigationModule } from "../navigation/navigation.module";

@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
    RouterModule
  ],
  declarations: [
    errorContainers.containers
  ],
  exports:[
    errorContainers.containers
  ]
})
export class ErrorModule { }