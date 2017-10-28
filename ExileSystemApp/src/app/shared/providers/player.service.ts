import { ExternalService } from './external.service';
import { SignalRService } from './signalr.service';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { LogParserService } from './log-parser.service';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { EventEmitter, Injectable } from '@angular/core';

import { Player } from '../interfaces/player.interface';

@Injectable()
export class PlayerService {
  public currentPlayerObj: Player = {
    connectionID: '',
    channel: '',
    account: '',
    character: undefined,
    area: '',
    guild: '',
    inArea: []
  }
  public currentPlayer: Subject<Player> = new Subject<Player>();
  public leagueData: any;
  public openPlayer: Player;
  OpenedPlayer: EventEmitter<Player> = new EventEmitter();
  constructor() {
    this.currentPlayer.subscribe(res => {
      this.currentPlayerObj = res;
    })
  }
}
