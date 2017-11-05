import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize/dist';

import { MessageTypeEnum } from './shared/enums/message-type.enum';
import { getGuid } from './shared/helpers/object.helper';
import { ChannelService } from './shared/providers/channel.service';
import { CurrencyService } from './shared/providers/currency.service';
import { ElectronService } from './shared/providers/electron.service';
import { ExternalService } from './shared/providers/external.service';
import { LogParserService } from './shared/providers/log-parser.service';
import { PlayerService } from './shared/providers/player.service';
import { RobotService } from './shared/providers/robot.service';
import { SettingService } from './shared/providers/setting.service';
import { SignalRService } from './shared/providers/signalr.service';
import { TradeService } from './shared/providers/trade.service';


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
      console.log('[DEBUG app.component.ts] Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('[DEBUG app.component.ts] IpcRenderer', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log(' [DEBUG app.component.ts] ChildProcess', electronService.childProcess);
    } else {
      console.log('[DEBUG app.component.ts] Mode web');
    }

    const fs = electronService.fs;

    if (true) { // !fs.existsSync('./ExileUtil.exe')
      const file = electronService.fs.createWriteStream('./ExileUtil.exe');
      const request = this.electronService.http.get('http://www.petterannerwall.se/ExileUtil.exe', function (response) {
        response.pipe(file);
        file.on('finish', function () {
          file.close();  // close() is async, call cb after close completes.
        });
      }).on('error', function (err) { // Handle errors
        fs.unlink('./ExileUtil.exe'); // Delete the file async. (But we don't check the result)
      });
    }


  }
  ngOnInit() {
    this.playerService.OpenedPlayer.subscribe(res => {
      if (!this.playerModal.nativeElement.classList.contains('open')) {
        this.openModal(res);
      }
    })

    // tslint:disable-next-line:max-line-length
    const css = '.logo-small{ visibility: hidden; height: 0px; } #statusBar{ display:none; } .results .row{ display:flex; } .left{ width:20%; } .middle{ width:60%; } .right{ width:20%; } .itemPopupAdditional{ display:none; }';

    const webview = <any>document.getElementById('webview');
    webview.addEventListener('dom-ready', function () {
      webview.insertCSS(css);
      // webview.openDevTools();
    });

    this.logParserService.NewMessageEvent.subscribe(msg => {
      if (msg.type === MessageTypeEnum.SelfEnteringArea && this.playerService.currentPlayerObj !== undefined) {
        this.externalService.getCharacter(this.playerService.currentPlayerObj.account,
          this.playerService.currentPlayerObj.character.name, this.playerService.currentPlayerObj.sessionId).subscribe(res => {
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
