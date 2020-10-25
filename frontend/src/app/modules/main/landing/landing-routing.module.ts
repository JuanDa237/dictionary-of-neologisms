import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as landingContainers from './containers';
import { WordComponent } from '@modules/others/words/containers';

//Module
import { LandingModule } from './landing.module';
import { RouteData } from '../navigation/models';

const routes: Routes = [
	{
		path: '',
		component: landingContainers.MainLandingComponent,
		children: [
			{
				path: '',
				component: landingContainers.HomeComponent,
				data: {
					title: 'Diccionario De Neologismos'
				} as RouteData
			},
			{
				path: 'word/:id',
				component: WordComponent,
				data: {
					title: 'Palabra'
				} as RouteData
			},
			{
				path: 'signIn',
				component: landingContainers.SignInComponent,
				data: {
					title: 'Ingresar'
				} as RouteData
			}
		]
	}
];

@NgModule({
	imports: [LandingModule, RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LandingRoutingModule {}
