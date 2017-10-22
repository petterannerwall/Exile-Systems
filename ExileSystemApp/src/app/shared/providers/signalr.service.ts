import { ChannelService } from './channel.service';
import { Channel } from '../interfaces/channel.interface';
import { BroadcastEventListener, SignalR } from 'ng2-signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class SignalRService {
  connection: any;
  constructor(private signalR: SignalR, private channelService: ChannelService) {
    const conx = this.signalR.createConnection();
    conx.start().then((c) => {
      this.connection = c;

      const onChannelUpdated$ = new BroadcastEventListener<Channel>('ChannelUpdate');

      c.listen(onChannelUpdated$);

      onChannelUpdated$.subscribe((channel: Channel) => {
        // update channel when event is triggered
        console.log(channel);
        this.channelService.channel = channel;
      });
    });
  }

  public login(channel, player) {
    return this.connection.invoke('Login', channel, player).then((data) => {
      console.log(data);
      return data;
    }).catch(error => console.log(error));
  }

  public updatePlayer(channel, player) {
    return this.connection.invoke('UpdatePlayer', channel, player).then((data) => {
      return data;
    }).catch(error => console.log(error));
  }
}
