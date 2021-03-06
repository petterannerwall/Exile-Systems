import { PlayerService } from './player.service';
import { ElectronService } from './electron.service';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { EquipmentResponse } from '../interfaces/equipment-response.interface';
import { Player } from '../interfaces/player.interface';

@Injectable()
export class ExternalService {
  public url: 'https://www.pathofexile.com/character-window/get-items';
  public cookie: any;
  constructor(private http: HttpClient, private electronService: ElectronService, private playerService: PlayerService) {
  }

  getCharacter(account: string, character: string, sessionId?: string): Observable<any> {
    this.cookie = {
      url: 'http://www.pathofexile.com',
      name: 'POESESSID',
      value: sessionId,
      domain: '.pathofexile.com',
      path: '/',
      secure: false,
      httpOnly: false,
      expirationDate: undefined
    };
    this.electronService.dialog.session.defaultSession.cookies.set(this.cookie, (error) => {
      if (error) { console.error(error); }
    })

    this.playerService.currentPlayerObj.account = account;

    const parameters = `?accountName=${account}&character=${character}`;
    const test = { accountName: account, character: character };

    return this.http.get('https://www.pathofexile.com/character-window/get-items' + parameters);
  }

  getCharacterList(account: string) {
    const parameters = `?accountName=${account}`;
    return this.http.get('https://www.pathofexile.com/character-window/get-characters' + parameters);
  }

  getCookiesByUrl(url: string) {
    return this.electronService.dialog.session.defaultSession.cookies.get({ url: url },
      (error, cookies) => {
        console.log('[DEBUG external.service.ts]', error, cookies);
      });
  }

  public pathofExileTrade(query) {
    return this.http.post('https://www.pathofexile.com/api/trade/search/' + 'standard', query, ); // this.playerService.leagueData.id
  }

  public pathOfExileTradeFetch(string, query) {
    return this.http.get('https://www.pathofexile.com/api/trade/fetch/' + string + '?query=' + query)
  }

  public pathOfExileTradeStats() {
    return this.http.get('https://www.pathofexile.com/api/trade/data/stats');
  }

  public poePricesRareSearch(item) {

    if (this.playerService.leagueData) {
      let data = '&league=' + this.playerService.leagueData.id + '&auto=auto&submit=Submit&myshops=&myaccounts=';

      data = 'itemtext=' + encodeURIComponent(item) + data;

      return this.http.post('https://www.poeprices.info/query', data,
        { responseType: 'text', headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'), observe: 'response' });
    }
  }

}
