import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { Player } from '../interfaces/player.interface';

@Injectable()
export class PlayerService {
  public player: Player = { connectionID: '', channel: '', account: '', character: undefined, area: '', guild: '', inArea: [] };
  constructor() {
  }
}
