import { IncomingTrade } from '../shared/interfaces/incomming-trade.interface';
import { ElectronService } from '../shared/providers/electron.service';
import { RobotService } from '../shared/providers/robot.service';
import { TradeService } from '../shared/providers/trade.service';
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

  windowModel = {
    list: [],
    topMostHandle: 0,
    topMostTitle: '',
    killProcess: ''
  }

  keyModel = {
    list: [],
    active: [],
    binds: [],
    specificBinds: {
      logout: '',
      invite: '',
      sold: '',
    },
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

  constructor(private electronService: ElectronService, private robotService: RobotService, private tradeService: TradeService) {
    // Before render

    const savedSpecificBinds = this.electronService.config.get('specific-keybinds');
    const savedBinds = this.electronService.config.get('keybinds');

    if (savedSpecificBinds !== undefined) {
      this.keyModel.specificBinds = savedSpecificBinds;
    }
    if (savedBinds !== undefined) {
      this.keyModel.binds = savedBinds;
    }

    this.initializeWindowlist();

    this.keyModel.list = Object.keys(KeycodeArray).map((keyCode => {
      return KeycodeArray[keyCode];
    }));

    this.keyboard.autoDelay.min = 0;
    this.keyboard.autoDelay.max = 0;

    robotService.KeyboardEvent.subscribe((keys) => {
      this.model.activeKeys = keys;

      keys.forEach(key => {
        if (this.keyModel.specificBinds.logout === key) {
          console.log('[DEBUG settings.component.ts] Executing logout!');
          this.robotService.logout();
        }
        if (this.keyModel.specificBinds.invite === key) {
          console.log('[DEBUG settings.component.ts] Executing invite!');
          this.tradeService.list.some((trade, index, list) => {
            if (!trade.invited) {
              this.robotService.sendCommandToPathofExile('+7invite ' + tradeService.list[0].player)
              list[index].invited = true;
              return true;
            }
          });
        }
        if (this.keyModel.specificBinds.sold === key) {
          console.log('[DEBUG settings.component.ts] Executing sold!');
          this.tradeService.list.some((trade, index, list) => {
            if (!trade.invited) {
              this.robotService.sendCommandToPathofExile('@' + this.tradeService.list[0].player + ' Sorry, that item is already sold!');
              list.splice(index, 1);
            }
            return true;
          })
        }
      });

      this.keyModel.binds.forEach((bind) => {
        keys.forEach(key => {
          if (bind.key === key) {
            console.log('[DEBUG settings.component.ts] Executing keybind: ', bind.command);
            this.keyboard.click(bind.command);
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

  initializeWindowlist() {
    const tempWindowList = this.robot.Window.getList();
    tempWindowList.forEach(window => {
      const windowObj = {
        Handle: window.getHandle(),
        Title: window.getTitle()
      }
      if (windowObj.Title !== '') {
        this.windowModel.list.push(windowObj);
      }

    });
  }

  setWindowTopMost() {
    const windowHandle = +this.windowModel.topMostHandle; // convert to int
    const window = this.robot.Window(windowHandle);
    window.setTopMost(true);

    if (window.isTopMost()) {
      this.windowModel.topMostHandle = windowHandle;
      this.windowModel.topMostTitle = window.getTitle();
    } else {
      console.log('[DEBUG settings.component.ts] Something went wrong when we tried to set a window to topMost');
    }
  }
  removeWindowTopMost() {
    const windowHandle = +this.windowModel.topMostHandle; // convert to int
    const window = this.robot.Window(windowHandle);
    window.setTopMost(false);
    if (!window.isTopMost()) {
      this.windowModel.topMostTitle = '';
      this.windowModel.topMostHandle = 0;
    } else {
      console.log('[DEBUG settings.component.ts] Something went wrong when we tried to remove topMost from a window');
    }
  }

  saveSpecificBinds() {
    this.electronService.config.set('specific-keybinds', this.keyModel.specificBinds);
  }

  createKeybind() {

    this.keyModel.binds.push({
      key: this.keyModel.key,
      command: this.keyModel.command
    });

    this.keyModel.key = '';
    this.keyModel.command = 'Type command...'

    this.electronService.config.set('keybinds', this.keyModel.binds);
  }

  removeKeybind(bind) {
    const index = this.keyModel.binds.indexOf(bind);
    this.keyModel.binds.splice(index, 1);
    this.electronService.config.set('keybinds', this.keyModel.binds);
  }
}
