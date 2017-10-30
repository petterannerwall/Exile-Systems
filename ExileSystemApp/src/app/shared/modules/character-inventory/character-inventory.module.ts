import { NgModule } from '@angular/core';

import { CharacterInventoryComponent } from '../../components/character-inventory/character-inventory.component';
import { ItemModule } from '../item/item.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ItemModule
  ],
  exports: [CharacterInventoryComponent],
  declarations: [CharacterInventoryComponent]
})
export class CharacterInventoryModule { }
