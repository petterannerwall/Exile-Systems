import { ItemTooltipModule } from '../item-tooltip/item-tooltip.module';
import { ItemSocketsComponent } from '../item-sockets/item-sockets.component';
import { ItemComponent } from './item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ItemTooltipModule
  ],
  exports: [ItemComponent, ItemSocketsComponent],
  declarations: [ItemComponent, ItemSocketsComponent]
})
export class ItemModule { }
