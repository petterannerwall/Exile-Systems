import 'rxjs/add/operator/map';

import { EventEmitter, Injectable } from '@angular/core';

import { Channel } from '../interfaces/channel.interface';

@Injectable()
export class ChannelService {
  public channel: Channel = { id: '', players: []};
  ChannelUpdated: EventEmitter<any> = new EventEmitter();
  constructor() {

  }

  public updateChannel(channel: Channel) {
    this.channel = channel;
    this.ChannelUpdated.emit();
  }
}
