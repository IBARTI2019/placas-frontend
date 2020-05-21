import { Routes } from '@angular/router';

import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

export const ComponentsRoutes: Routes = [
  {
    path: 'role',
    component: RoleComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
