import { NgModule } from '@angular/core';

import { ItemSocketsComponent } from '../../components/item-sockets/item-sockets.component';
import { ItemComponent } from '../../components/item/item.component';
import { ItemTooltipModule } from '../item-tooltip/item-tooltip.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ItemTooltipModule
  ],
  exports: [ItemComponent, ItemSocketsComponent],
  declarations: [ItemComponent, ItemSocketsComponent]
})
export class ItemModule { }
