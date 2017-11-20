import { SignalRService } from './signalr.service';
import { forEach } from '@angular/router/src/utils/collection';
import { PlayerService } from './player.service';
import { setTimeout } from 'timers';
import { ElectronService } from './electron.service';
import { ChannelService } from './channel.service';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { EquipmentResponse } from '../interfaces/equipment-response.interface';
import { Player } from '../interfaces/player.interface';

@Injectable()
export class CurrencyService {

  constructor(private http: HttpClient, private electronService: ElectronService, private channelService: ChannelService,
    private playerService: PlayerService, private signalRService: SignalRService) {

    // this.playerService.currentPlayer.subscribe(res => {
    //   const league = res.character.league;
    //   this.signalRService.getLeagueData(league).then((data) => {
    //     playerService.leagueData = data;
    //   })
    // });
  }


  public toFullName(name) {
    const translations = [
      { short: 'alch', full: 'Orb of Alchemy' },
      { short: 'chaos', full: 'Orb of Chaos' },
      { short: 'exalted', full: 'Exalted Orb' }
    ];

    for (let i = 0; i < translations.length; i++) {
      const trans = translations[i];
      if (trans.short === name) {
        return trans.full;
      }
    }
    return name;
  }

  public convertToChaos(name, value) {
    name = this.toFullName(name);

    for (let i = 0; i < this.playerService.leagueData.currencyRates.length; i++) {
      const currency = this.playerService.leagueData.currencyRates[i];
      if (currency.name === name) {
        return value * currency.value;
      }
    }
    return 0;
  }
}
