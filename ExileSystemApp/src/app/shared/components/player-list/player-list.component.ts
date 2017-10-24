import { ChannelService } from '../../providers/channel.service';
import { Player } from '../../interfaces/player.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @Input() player: Player;
  constructor(private channelService: ChannelService) { }
  ngOnInit() {
  }
}
