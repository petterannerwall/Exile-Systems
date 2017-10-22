import { ItemSocketsComponent } from '../item-sockets/item-sockets.component';
import { ItemComponent } from './item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ItemComponent, ItemSocketsComponent],
  declarations: [ItemComponent, ItemSocketsComponent]
})
export class ItemModule { }
