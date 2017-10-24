import { Component, OnInit } from '@angular/core';

import { ChannelService } from '../shared/providers/channel.service';
import { LogParserService } from '../shared/providers/log-parser.service';

@Component({
  templateUrl: './current-room.component.html',
  styleUrls: ['./current-room.component.scss']
})
export class CurrentRoomComponent implements OnInit {
  constructor(private logParserService: LogParserService, private channelService: ChannelService) { }
  ngOnInit() {
  }
}



