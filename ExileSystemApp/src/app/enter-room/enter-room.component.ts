import { RobotService } from '../shared/providers/robot.service';
import { MessageTypeEnum } from '../shared/enums/message-type.enum';
import { Message } from '../shared/interfaces/message.interface';
import { LogParserService } from '../shared/providers/log-parser.service';
import { ElectronService } from '../shared/providers/electron.service';
import { PlayerService } from '../shared/providers/player.service';
import { SignalRService } from '../shared/providers/signalr.service';
import { EquipmentResponse } from '../shared/interfaces/equipment-response.interface';
import { ExternalService } from '../shared/providers/external.service';
import { SettingService } from '../shared/providers/setting.service';
import { Router } from '@angular/router';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import * as $ from 'jquery';
declare var Materialize: any;

@Component({
  selector: 'app-enter-room',
  templateUrl: './enter-room.component.html',
  styleUrls: ['./enter-room.component.scss']
})
export class EnterRoomComponent implements OnInit, AfterViewChecked {

  characters: any = [];
  verified: Boolean;
  constructor(private router: Router, private externalService: ExternalService,
    private signalrService: SignalRService, private playerService: PlayerService,
    private electronService: ElectronService, private logParser: LogParserService,
    private robotService: RobotService, private settingService: SettingService) {

    this.verified = false;


  }

  ngOnInit() {
    $(document).ready(function () {
      Materialize.updateTextFields();
    });
  }

  ngAfterViewChecked() {

  }

  enter() {
    this.registerPlayer();
  }

  loadCharacters() {
    this.externalService.getCharacterList(this.settingService.settings.room.accountName).subscribe(res => {
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

  verify() {
    this.verified = true;
    // const code = '.verify ' + this.generateChannel();
    // const command = '@' + this.settingService.settings.room.characterName + ' ' + code;
    // this.robotService.sendCommandToPathofExile(command);
    // this.logParser.NewMessageEvent.subscribe((message: Message) => {
    //   if (message.type === MessageTypeEnum.Verify) {
    //     if (message.player === this.settingService.settings.room.characterName && message.text === code.toLowerCase()) {
    //       this.verified = true;
    //     }
    //   }
    // });

  }

  registerPlayer(roomCode?: string) {

    this.settingService.save();

    let code;
    if (roomCode !== undefined) {
      code = roomCode;
    } else {
      code = this.settingService.settings.room.roomCode;
    }
    this.externalService.getCharacter(this.settingService.settings.room.accountName, this.settingService.settings.room.characterName,
      this.settingService.settings.room.sessionId)
      .subscribe((data: EquipmentResponse) => {
        this.playerService.currentPlayerObj.character = data.character;
        this.playerService.currentPlayerObj.character.items = data.items;
        this.playerService.currentPlayerObj.channel = code;
        this.playerService.currentPlayerObj.sessionId = this.settingService.settings.room.sessionId;
        console.log('received player: ', this.playerService.currentPlayerObj)
        this.signalrService.login(code, this.playerService.currentPlayerObj);
        this.router.navigate(['/current-room']);
      });
  }
}
