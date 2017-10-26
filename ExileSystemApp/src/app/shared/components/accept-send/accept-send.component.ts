import { ChannelService } from '../../providers/channel.service';
import { Player } from '../../interfaces/player.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accept-send',
  templateUrl: './accept-send.component.html',
  styleUrls: ['./accept-send.component.scss']
})
export class AcceptSendComponent implements OnInit {
  @Input() messageType: string;
  constructor() { }
  ngOnInit() {
    if (this.messageType === 'trade') {
      // do stuff
    }
  }
}
