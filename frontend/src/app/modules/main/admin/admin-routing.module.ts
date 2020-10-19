import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteData, Role } from "../navigation/models";

import { AdminModule } from "./admin.module";

import * as adminContainers from "./containers";
import * as adminGuards from "./guards";

import * as wordsContainers from "@modules/others/words/containers";

const routes: Routes = [
  {
    path: '',
    component: adminContainers.MainAdminComponent,
    canActivate: [adminGuards.AuthenticationGuard],
    children: [
      {
        path: 'words',
        component: wordsContainers.AdminWordsComponent,
        canActivate: [adminGuards.RoleGuard],
        data: {
          title: 'Administrando Palabras',
          roles: [Role.ADMINISTRATOR, Role.LOGOGENIST]
        } as RouteData
      }
    ]
  }
];

@NgModule({
  imports: [AdminModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }