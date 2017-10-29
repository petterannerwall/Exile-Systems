import { PlayerService } from './player.service';
import { ElectronService } from './electron.service';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
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
}
