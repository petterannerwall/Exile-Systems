import { ChannelService } from './shared/providers/channel.service';
import { LogParserService } from './shared/providers/log-parser.service';
import { MessageTypeEnum } from './shared/enums/message-type.enum';
import { PlayerService } from './shared/providers/player.service';
import { MaterializeAction } from 'angular2-materialize/dist';
import { getGuid } from './shared/helpers/object.helper';
import { TradeService } from './shared/providers/trade.service';
import { ExternalService } from './shared/providers/external.service';
import { SettingService } from './shared/providers/setting.service';
import { SignalRService } from './shared/providers/signalr.service';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from './shared/providers/electron.service';
import { CurrencyService } from './shared/providers/currency.service';
import { RobotService } from './shared/providers/robot.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  modalOpen = false;
  guid = getGuid();
  @ViewChild('playerModal') playerModal: ElementRef;
  modalActions = new EventEmitter<string | MaterializeAction>();
  constructor(public electronService: ElectronService, public settingService: SettingService, public signalRService: SignalRService,
    private externalService: ExternalService, private currencyService: CurrencyService, private tradeService: TradeService,
    private logParserService: LogParserService, private playerService: PlayerService, private robotService: RobotService,
    private channelService: ChannelService) {
    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    const fs = electronService.fs;

    fs.unlink('./logout.exe'); // Always force new file
    if (!fs.existsSync('./logout.exe')) {
      const file = electronService.fs.createWriteStream('./logout.exe');
      const request = this.electronService.http.get('http://www.petterannerwall.se/logout.exe', function (response) {
        response.pipe(file);
        file.on('finish', function () {
          file.close();  // close() is async, call cb after close completes.
        });
      }).on('error', function (err) { // Handle errors
        fs.unlink('./logout.exe'); // Delete the file async. (But we don't check the result)
      });
    }


  }
  ngOnInit() {
    this.playerService.OpenedPlayer.subscribe(res => {
      if (!this.playerModal.nativeElement.classList.contains('open')) {
        this.openModal(res);
      }
    })

    this.logParserService.NewMessageEvent.subscribe(msg => {
      if (msg.type === MessageTypeEnum.SelfEnteringArea && this.playerService.currentPlayerObj !== undefined) {
        this.externalService.getCharacter(this.playerService.currentPlayerObj.account,
          this.playerService.currentPlayerObj.character.name).subscribe(res => {
            this.playerService.currentPlayerObj.character = res.character;
            this.playerService.currentPlayerObj.character.items = res.items;
            this.playerService.currentPlayer.next(this.playerService.currentPlayerObj);
            this.signalRService.updatePlayer(this.channelService.channel.id, this.playerService.currentPlayerObj);
          });
      }
    });
  }
  openModal(player) {
    this.playerService.openPlayer = player;
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }
}
