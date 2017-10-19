import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { EquipmentResponse } from '../interfaces/equipment-response.interface';
import { Player } from '../interfaces/player.interface';

@Injectable()
export class ExternalService {
  public url: 'https://www.pathofexile.com/character-window/get-items';
  public player: Player = {
    connectionID: '',
    channel: '',
    account: '',
    character: undefined,
    area: '',
    guild: '',
    inArea: []
  }
  constructor(private http: HttpClient) {
  }

  getCharacter(account, character): Observable<any> {
    this.player.account = account;

    const parameters = `?accountName=${account}&character=${character}`;
    const test = { accountName: account, character: character };

    return this.http.get('https://www.pathofexile.com/character-window/get-items' + parameters);
  }
}
