import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Channel } from '../interfaces/channel.interface';

@Injectable()
export class ChannelService {
  public channel: Channel = { id: '', players: []};
  constructor() {
  }
}
