import { PlayerService } from '../../providers/player.service';
import { getGuid } from '../../helpers/object.helper';
import { MaterializeAction } from 'angular2-materialize/dist';
import { ChannelService } from '../../providers/channel.service';
import { Player } from '../../interfaces/player.interface';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @Input() player: Player;

  constructor(private channelService: ChannelService, private playerService: PlayerService) { }
  ngOnInit() {
  }

}
