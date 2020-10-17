import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as landingContainers from "./containers";

//Module
import { LandingModule } from "./landing.module";

const routes: Routes = [
  {
    path: '',
    component: landingContainers.MainLandingComponent,
    children: [
      {
        path: '',
        component: landingContainers.HomeComponent
      },
      {
        path: '',
        loadChildren: () =>
        import('@modules/others/words/words-routing.module').then(m => m.WordsRoutingModule)
      },
      {
          path: 'signIn',
          component: landingContainers.SignInComponent
      }
    ]
  }
];

@NgModule({
  imports: [LandingModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
