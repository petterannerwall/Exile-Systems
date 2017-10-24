import { BehaviorSubject, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Player } from '../interfaces/player.interface';

@Injectable()
export class PlayerService {
  public subject: Player = { connectionID: '', channel: '', account: '', character: undefined, area: '', guild: '', inArea: [] };
  public currentPlayer: BehaviorSubject<Player>

  constructor() {
    this.currentPlayer = new BehaviorSubject(this.subject);
  }
}
