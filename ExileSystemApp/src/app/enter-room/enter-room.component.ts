import { SignalRService } from '../shared/providers/signalr.service';
import { EquipmentResponse } from '../shared/interfaces/equipment-response.interface';
import { ExternalService } from '../shared/providers/external.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-enter-room',
  templateUrl: './enter-room.component.html',
  styleUrls: ['./enter-room.component.scss']
})
export class EnterRoomComponent implements OnInit {
  model = { roomCode: '', accountName: '', characterName: '' };
  constructor(private router: Router, private externalService: ExternalService, private signalrService: SignalRService) { }

  ngOnInit() {
  }

  enter() {
    this.registerPlayer();
    this.router.navigate(['/current-room']);
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
    this.router.navigate(['/current-room']);
  }

  registerPlayer() {
    this.externalService.getCharacter(this.model.accountName, this.model.characterName).subscribe((data: EquipmentResponse) => {
      this.externalService.player.character = data.character;
      this.externalService.player.character.items = data.items;
      this.externalService.player.channel = this.model.roomCode;
      console.log('received player: ', this.externalService.player)
      this.signalrService.login(this.model.roomCode, this.externalService.player);
    });
  }
}
