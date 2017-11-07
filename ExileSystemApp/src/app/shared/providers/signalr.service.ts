import { Injectable } from '@angular/core';
import { BroadcastEventListener, SignalR } from 'ng2-signalr';

import { Channel } from '../interfaces/channel.interface';
import { ChannelService } from './channel.service';
import { PlayerService } from './player.service';

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
        this.channelService.updateChannel(channel);
        if (this.playerService.openPlayer !== undefined) {
          // if user has a modal open, update this object
          this.playerService.openPlayer = channel.players.find(x => x.account === this.playerService.openPlayer.account);
          console.log(this.playerService.openPlayer.character.items.length);
        }
      });
    });
  }

  public login(channel, player) {
    return this.connection.invoke('Login', channel, player).then((data) => {
      this.playerService.currentPlayer.next(player);
      if (this.playerService.leagueData === undefined) {
        this.getLeagueData(player.character.league).then((res) => {
          this.playerService.leagueData = res;
        });
      }
      return data;
    }).catch(error => console.log(error));
  }

  public getLeagueData(league) {
    return this.connection.invoke('GetLeague', league).then((data) => {
      console.log('[DEBUG signalr.service.ts] Got LeagueData: ', data);
      return data;
    }).catch(error => console.log(error));
  }

  public updatePlayer(channel, player, reason) {
    return this.connection.invoke('UpdatePlayer', channel, player, reason).then((data) => {
      return data;
    }).catch(error => console.log(error));
  }
}
