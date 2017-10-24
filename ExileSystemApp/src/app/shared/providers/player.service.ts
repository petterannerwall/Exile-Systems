import { BehaviorSubject, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Player } from '../interfaces/player.interface';

@Injectable()
export class PlayerService {
  public currentPlayer: Subject<Player> = new Subject<Player>();

  constructor() {
  }
}
