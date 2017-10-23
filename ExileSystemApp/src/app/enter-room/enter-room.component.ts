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
  constructor(private router: Router, private externalService: ExternalService, private signalrService: SignalRService) { }

  ngOnInit() {
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
    this.model.roomCode = this.generateChannel();
    this.registerPlayer();
  }

  registerPlayer() {
    this.externalService.getCharacter(this.model.accountName, this.model.characterName, this.model.sessionId)
      .subscribe((data: EquipmentResponse) => {
        this.externalService.player.character = data.character;
        this.externalService.player.character.items = data.items;
        this.externalService.player.channel = this.model.roomCode;
        console.log('received player: ', this.externalService.player)
        this.signalrService.login(this.model.roomCode, this.externalService.player);
        this.router.navigate(['/current-room']);
      });
  }
}
