import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Module
import { ErrorModule } from './error.module';

import * as errorContainers from "./containers/index";

const routes: Routes = [
  {
    path: '',
    component: errorContainers.MainErrorComponent,
    children: [
      {
        path: '404',
        component: errorContainers.Error404Component
      },
      {
        path: '401',
        component: errorContainers.Error401Component
      },
      {
        path: '500',
        component: errorContainers.Error500Component
      },
      {
        path: '**',
        pathMatch: 'full',
        component: errorContainers.Error404Component
      }
    ]
  }
];

@NgModule({
  imports: [ErrorModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }