import { MaterializeAction } from 'angular2-materialize';
import { getGuid } from '../../helpers/object.helper';
import { Player } from '../../interfaces/player.interface';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-badge',
  templateUrl: './player-badge.component.html',
  styleUrls: ['./player-badge.component.scss']
})
export class PlayerBadgeComponent implements OnInit {
  @Input() player: Player;
  constructor() { }
  ngOnInit() {
  }
}
