import { NgModule } from '@angular/core';
import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { FormGeneralComponent } from './form-general/form-general.component';
import { DemoMaterialModule } from '../demo-material-module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    FormGeneralComponent
  ],
  imports: [DemoMaterialModule, ReactiveFormsModule , CommonModule],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    FormGeneralComponent
   ],
  providers: [ MenuItems ]
})
export class SharedModule { }
