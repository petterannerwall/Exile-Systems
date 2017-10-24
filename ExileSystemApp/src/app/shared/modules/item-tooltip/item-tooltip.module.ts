import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';

import { ItemTooltipComponent } from '../../components/item-tooltip/item-tooltip.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [ItemTooltipComponent],
  declarations: [ItemTooltipComponent]
})
export class ItemTooltipModule { }
