import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
        import('@modules/main/landing/landing-routing.module').then(m => m.LandingRoutingModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
        import('@modules/main/admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },
  {
    path: 'error',
    loadChildren: () =>
        import('@modules/main/error/error-routing.module').then(m => m.ErrorRoutingModule)
  },
  {
      path: '**',
      pathMatch: 'full',
      loadChildren: () =>
          import('@modules/main/error/error-routing.module').then(m => m.ErrorRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }