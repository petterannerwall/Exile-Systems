import { CharacterPreviewModule } from '../character-preview/character-preview.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlayerBadgeComponent } from './../../components/player-badge/player-badge.component';
import { PlayerListComponent } from './../../components/player-list/player-list.component';

@NgModule({
  imports: [
    SharedModule,
    CharacterPreviewModule
  ],
  exports: [PlayerListComponent, PlayerBadgeComponent],
  declarations: [PlayerListComponent, PlayerBadgeComponent]
})
export class PlayerListModule { }
