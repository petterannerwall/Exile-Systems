import { ElectronService } from '../shared/providers/electron.service';
import { PlayerService } from '../shared/providers/player.service';
import { SignalRService } from '../shared/providers/signalr.service';
import { EquipmentResponse } from '../shared/interfaces/equipment-response.interface';
import { ExternalService } from '../shared/providers/external.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'app-enter-room',
  templateUrl: './enter-room.component.html',
  styleUrls: ['./enter-room.component.scss']
})
export class EnterRoomComponent implements OnInit {
  model = { roomCode: '', accountName: '', characterName: '', sessionId: '' };
  characters: any = [];
  constructor(private router: Router, private externalService: ExternalService,
    private signalrService: SignalRService, private playerService: PlayerService, private electronService: ElectronService) {

      const savedModel = this.electronService.config.get('enter-room-model');
      if (savedModel !== undefined) {
        this.model = savedModel;
      }

     }

  ngOnInit() {
    $(document).ready(function() {
      Materialize.updateTextFields();
    });
  }

  enter() {
    this.registerPlayer();
  }

  loadCharacters() {
    this.externalService.getCharacterList(this.model.accountName).subscribe(res => {
      this.characters = res;
      this.characters = this.characters.sort((left, right): number => {
        if (left.name < right.name) { return -1; }
        if (left.name > right.name) { return 1; }
        return 0;
      });
    });
  }

  generateChannel() {
    let channel = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 5; i++) {
      channel += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return channel;
  }

  create() {
    this.registerPlayer(this.generateChannel());
  }

  registerPlayer(roomCode?: string) {

    this.electronService.config.set('enter-room-model', this.model);

    let code;
    if (roomCode !== undefined) {
      code = roomCode;
    } else {
      code = this.model.roomCode;
    }
    this.externalService.getCharacter(this.model.accountName, this.model.characterName, this.model.sessionId)
      .subscribe((data: EquipmentResponse) => {
        this.playerService.currentPlayerObj.character = data.character;
        this.playerService.currentPlayerObj.character.items = data.items;
        this.playerService.currentPlayerObj.channel = code;
        this.playerService.currentPlayerObj.sessionId = this.model.sessionId;
        console.log('received player: ', this.playerService.currentPlayerObj)
        this.signalrService.login(code, this.playerService.currentPlayerObj);
        this.router.navigate(['/current-room']);
      });
  }
}
