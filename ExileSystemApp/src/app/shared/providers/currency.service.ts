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

  constructor(private http: HttpClient, private electronService: ElectronService, private channelService: ChannelService) {

    if (channelService.channel.players.length < 1) {
      return;
    }

    const league = channelService.channel.players[0].character.league;
    this.getCurrencyRates(league);

  }

  getCurrencyRates(league: string) {
    const parameters = `?league=${league}`;
    this.http.get('http://poe.ninja/api/Data/GetCurrencyOverview' + parameters).subscribe((response) => {
      console.log(response);
    });
  }

}
