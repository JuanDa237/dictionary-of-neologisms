import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./modules/landing/landing-routing.module').then((m) => m.LandingRoutingModule)
	},
	{
		path: '',
		loadChildren: () =>
			import('./modules/admin/admin-routing.module').then((m) => m.AdminRoutingModule)
	},
	{
		path: 'error',
		loadChildren: () =>
			import('./modules/error/error-routing.module').then((m) => m.ErrorRoutingModule)
	},
	{
		path: '**',
		pathMatch: 'full',
		loadChildren: () =>
			import('./modules/error/error-routing.module').then((m) => m.ErrorRoutingModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabled'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
