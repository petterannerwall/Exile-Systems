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
    private playerService: PlayerService) {

    this.playerService.currentPlayer.subscribe(res => {
      const league = res.character.league;
      this.getCurrencyRates(league);
    });
  }

  getCurrencyRates(league: string) {
    const parameters = `?league=${league}`;
    this.http.get('http://poe.ninja/api/Data/GetCurrencyOverview' + parameters).subscribe((response: any) => {
      console.log('Currency rates', response);

      const currencyList = [];
      response.lines.forEach(line => {
        const currencyObj = {
          name: line.currencyTypeName,
          value: +line.chaosEquivalent
        }
      });


      currencyList.sort((n1, n2) => {
        if (n1.value > n2.value) {
            return 1;
        }
        if (n1.value < n2.value) {
            return -1;
        }
        return 0;
    });

      console.log(currencyList);
    });
  }

}
