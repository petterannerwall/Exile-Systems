import { PlayerService } from './player.service';
import { ChannelService } from './channel.service';
import { Channel } from '../interfaces/channel.interface';
import { BroadcastEventListener, SignalR } from 'ng2-signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class SignalRService {
  connection: any;
  public onChannelUpdated$ = new BroadcastEventListener<Channel>('ChannelUpdate');

  constructor(private signalR: SignalR, private channelService: ChannelService, private playerService: PlayerService) {
    const conx = this.signalR.createConnection();
    conx.start().then((c) => {
      this.connection = c;

      c.listen(this.onChannelUpdated$);
      this.onChannelUpdated$.subscribe((channel: Channel) => {
        // update channel when event is triggered
        this.channelService.channel = channel;
      });
    });


  }

  public login(channel, player) {
    return this.connection.invoke('Login', channel, player).then((data) => {
      console.log('LeagueData', data);
      this.playerService.currentPlayer.next(player);
      return data;
    }).catch(error => console.log(error));
  }


  public getLeagueData(league) {
    return this.connection.invoke('GetLeague', league).then((data) => {
      return data;
    }).catch(error => console.log(error));
  }

  public updatePlayer(channel, player) {
    return this.connection.invoke('UpdatePlayer', channel, player).then((data) => {
      return data;
    }).catch(error => console.log(error));
  }
}
