import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './layouts/login/login.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/components/components.module').then(m => m.ComponentsModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
