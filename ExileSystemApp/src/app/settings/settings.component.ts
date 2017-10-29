import { ElectronService } from '../shared/providers/electron.service';
import { RobotService } from '../shared/providers/robot.service';
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

  constructor(private electronService: ElectronService, private robotService: RobotService) {
    // Before render

    this.initializeWindowlist();

    this.keyModel.list = Object.keys(KeycodeArray).map((keyCode => {
      return KeycodeArray[keyCode];
    }));

    this.keyboard.autoDelay.min = 0;
    this.keyboard.autoDelay.max = 0;

    robotService.KeyboardEvent.subscribe((keys) => {
      this.model.activeKeys = keys;

      this.keyModel.binds.forEach((bind) => {
        keys.forEach(key => {
          if (bind.key === key) {
            console.log('Executing keybind: ', bind.command);
            this.keyboard.click(bind.command);
          }
        });
      })

    })
    robotService.WindowEvent.subscribe((data) => {
      this.model.activeWindow = data;
    })
    robotService.ClipboardEvent.subscribe((data) => {
      console.log('Clipboard data:', data);
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
      console.log('Something went wrong when we tried to set a window to topMost');
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
      console.log('Something went wrong when we tried to remove topMost from a window');
    }
  }

  killProcess() {
    const window = this.robot.Window(+this.windowModel.killProcess);
    const windowPID = window.getPID();
    const windowProcess = this.robot.Process(windowPID);
    const processPID = windowProcess.getPID();
    console.log(processPID);
    const cmd = this.electronService.cmd;
    cmd.elevate('logout.exe /process ' + processPID);

  }

  createKeybind() {

    this.keyModel.binds.push({
      key: this.keyModel.key,
      command: this.keyModel.command
    });

    this.keyModel.key = '';
    this.keyModel.command = 'Type command...'

    // const electron = require('electron');
    // const BrowserWindow = electron.remote.BrowserWindow;

    // const childWindow = new BrowserWindow({
    //   width: 800,
    //   height: 600,
    //   frame: false,
    //   transparent: true,
    // });

    // childWindow.setIgnoreMouseEvents(false);
  }

  removeKeybind(bind) {
    const index = this.keyModel.binds.indexOf(bind);
    this.keyModel.binds.splice(index, 1);
  }

  keyChange(event) {
    console.log(event);
  }

}
