import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingModule } from './landing.module';

import { RouteData } from '../app-common/models';

import * as layouts from './layouts';
import * as containers from './containers';

const routes: Routes = [
	{
		path: '',
		component: layouts.LandingLayoutComponent,
		children: [
			{
				path: '',
				component: containers.LandingComponent,
				data: {
					title: 'Diccionario De Neologismos',
					description: 'Este es el diccionario de neologismos para la universidad ITM.'
				} as RouteData
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), LandingModule],
	exports: [RouterModule]
})
export class LandingRoutingModule {}
