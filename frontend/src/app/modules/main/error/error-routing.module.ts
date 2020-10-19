import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Module
import { ErrorModule } from './error.module';

import * as errorContainers from "./containers/index";
import { RouteData } from '../navigation/models';

const routes: Routes = [
  {
    path: '',
    component: errorContainers.MainErrorComponent,
    children: [
      {
        path: '404',
        component: errorContainers.Error404Component,
        data: {
            title: 'Error 404'
        } as RouteData
      },
      {
        path: '401',
        component: errorContainers.Error401Component,
        data: {
            title: 'Error 401'
        } as RouteData
      },
      {
        path: '500',
        component: errorContainers.Error500Component,
        data: {
            title: 'Error 500'
        } as RouteData
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