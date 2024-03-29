import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule,
    DropdownDirective
  ],
  providers: [],
})
export class SharedModule {}