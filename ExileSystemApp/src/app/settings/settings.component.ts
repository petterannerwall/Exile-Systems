import { IncomingTrade } from '../shared/interfaces/incomming-trade.interface';
import { ElectronService } from '../shared/providers/electron.service';
import { RobotService } from '../shared/providers/robot.service';
import { TradeService } from '../shared/providers/trade.service';
import { SettingService } from '../shared/providers/setting.service';
import { KeycodeArray } from '../shared/enums/keycode.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  robot = this.electronService.robot;
  keyboard = this.robot.Keyboard();
  mouse = this.robot.Mouse();
  debug = true;

  windowList = [];
  topMostWindow = {};

  private forcePathWindowTopMost = false;
  private forcePathWindowBounds = false;
  private forceWindowBoundsHandle: any;

  keyModel = {
    list: [],
    active: [],
    key: '',
    command: 'Type command...'
  }

  model = {
    activeWindow: 'Not found',
    activeKeys: [],
    Keys: [],
    activeKeybinds: {},
    tempKeys: {
      key: '',
      command: 'Type command...'
    }
  }

  constructor(private electronService: ElectronService, private robotService: RobotService, private tradeService: TradeService,
    private settingService: SettingService) {
    // Before render


    this.keyModel.list = Object.keys(KeycodeArray).map((keyCode => {
      return KeycodeArray[keyCode];
    }));

    this.keyboard.autoDelay.min = 0;
    this.keyboard.autoDelay.max = 0;

    robotService.KeyboardEvent.subscribe((keys) => {
      this.model.activeKeys = keys;

      keys.forEach(key => {
        if (this.settingService.settings.keybinds.specific.logout === key) {
          console.log('[DEBUG settings.component.ts] Executing logout!');
          this.robotService.logout();
        }
        if (this.settingService.settings.keybinds.specific.invite === key) {
          console.log('[DEBUG settings.component.ts] Executing invite!');
          this.tradeService.list.some((trade, index, list) => {
            if (!trade.invited) {
              this.robotService.sendCommandToPathofExile('+7invite ' + tradeService.list[0].player)
              list[index].invited = true;
              return true;
            }
          });
        }
        if (this.settingService.settings.keybinds.specific.sold === key) {
          console.log('[DEBUG settings.component.ts] Executing sold!');
          this.tradeService.list.some((trade, index, list) => {
            if (!trade.invited) {
              this.robotService.sendCommandToPathofExile('@' + this.tradeService.list[0].player + ' ' +
                this.settingService.settings.trade.soldMessage);
              list.splice(index, 1);
            }
            return true;
          })
        }
      });

      this.settingService.settings.keybinds.other.forEach((bind) => {
        keys.forEach(key => {
          if (bind.key === key) {
            console.log('[DEBUG settings.component.ts] Executing keybind: ', bind.command);
            this.robotService.sendCommandToPathofExile(bind.command);
          }
        });
      })

    })
    robotService.WindowEvent.subscribe((data) => {
      this.model.activeWindow = data;
    })
    robotService.ClipboardEvent.subscribe((data) => {
      console.log('[DEBUG settings.component.ts] Clipboard data:', data);
    })
  }

  ngOnInit() {
    // After render
  }


  saveSettings() {
    this.settingService.save();
  }

  createKeybind() {

    this.settingService.settings.keybinds.other.push({
      key: this.keyModel.key,
      command: this.keyModel.command
    });

    this.keyModel.key = '';
    this.keyModel.command = 'Type command...'

    this.settingService.save();
  }

  removeKeybind(bind) {
    const index = this.settingService.settings.keybinds.other.indexOf(bind);
    this.settingService.settings.keybinds.other.splice(index, 1);
    this.settingService.save();
  }

  SaveAutoSendTrade() {
    this.settingService.settings.trade.autoSendTrade = !this.settingService.settings.trade.autoSendTrade
    this.settingService.save();
  }

  forceBounds() {
    this.robotService.pathWindowBounds = undefined;
    this.forcePathWindowBounds = true;
    this.forceWindowBoundsHandle = setInterval(() => {
      this.robotService.forcePathWindowBounds();
    }, 500);
    console.log('[DEBUG settings.component.ts] We are now forcing the path of exile window bounds. ');
  }

  stopForceWindowBounds() {
    this.forcePathWindowBounds = false;
    clearInterval(this.forceWindowBoundsHandle);
    console.log('[DEBUG settings.component.ts] We are not longer forcing the path of exile window bounds. ');
  }

  windowTopmost() {
    this.forcePathWindowTopMost = !this.forcePathWindowTopMost;
    this.robotService.setWindowTopMost(this.forcePathWindowTopMost)
  }

}
