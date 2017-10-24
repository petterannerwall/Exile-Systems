import { CharacterPreviewComponent } from '../../components/character-preview/character-preview.component';
import { NgModule } from '@angular/core';

import { ItemModule } from '../item/item.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ItemModule
  ],
  exports: [CharacterPreviewComponent],
  declarations: [CharacterPreviewComponent]
})
export class CharacterPreviewModule { }
