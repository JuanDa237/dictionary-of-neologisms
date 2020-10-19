import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import * as adminContainers from "./containers";
import * as adminGuards from "./guards/index";
import * as adminServices from './services/index';

import { NavigationModule } from "../navigation/navigation.module";
import { WordsModule } from "@modules/others/words/words.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NavigationModule,
    WordsModule
  ],
  providers: [
    adminGuards.guards,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: adminServices.TokenInterceptorService,
      multi: true
    }
  ],
  declarations: [
    adminContainers.containers
  ],
  exports: [
    adminContainers.containers
  ]
})
export class AdminModule { }