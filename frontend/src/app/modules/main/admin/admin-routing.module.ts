import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteData, Role } from '../navigation/models';

import { AdminModule } from './admin.module';

import * as adminContainers from './containers';
import * as adminGuards from './guards';

import * as wordsContainers from '@modules/others/words/containers';
import * as categoriesContainers from '@modules/others/categories/containers';

const routes: Routes = [
	{
		path: '',
		component: adminContainers.MainAdminComponent,
		canActivate: [adminGuards.AuthenticationGuard],
		children: [
			{
				path: 'word/edit/:id',
				component: wordsContainers.AdminFormWordComponent,
				canActivate: [adminGuards.RoleGuard],
				data: {
					title: 'Editando Palabra',
					roles: [Role.ADMINISTRATOR]
				} as RouteData
			},
			{
				path: 'word/add',
				component: wordsContainers.AdminFormWordComponent,
				canActivate: [adminGuards.RoleGuard],
				data: {
					title: 'Creando Palabra',
					roles: [Role.ADMINISTRATOR]
				} as RouteData
			},
			{
				path: 'words',
				component: wordsContainers.AdminWordsComponent,
				canActivate: [adminGuards.RoleGuard],
				data: {
					title: 'Administrando Palabras',
					roles: [Role.ADMINISTRATOR, Role.LOGOGENIST]
				} as RouteData
			},
			{
				path: 'categories',
				component: categoriesContainers.AdminCategoriesComponent,
				canActivate: [adminGuards.RoleGuard],
				data: {
					title: 'Administrando Categorias',
					roles: [Role.ADMINISTRATOR]
				} as RouteData
			}
		]
	}
];

@NgModule({
	imports: [AdminModule, RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
