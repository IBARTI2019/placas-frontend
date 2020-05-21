import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { RoleComponent } from './role/role.component';
import { ComponentsRoutes } from './components.routing';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    DemoMaterialModule,
    RouterModule.forChild(ComponentsRoutes)
  ],
  declarations: [
    RoleComponent,
    UserComponent
  ]
})
export class ComponentsModule { }
