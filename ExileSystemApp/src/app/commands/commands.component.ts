import { ElectronService } from '../shared/providers/electron.service';
import { RobotService } from '../shared/providers/robot.service';
import { KeycodeArray } from '../shared/enums/keycode.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})

export class CommandsComponent implements OnInit {

  robot = this.electronService.robot;
  keyboard = this.robot.Keyboard();
  mouse = this.robot.Mouse();
  debug = true;

  windowList = [];
  topMostWindow = {};

  windowModel = {
    list: [],
    topMostHandle: 0,
    topMostTitle: ''
  }

  keyModel = {
    list: [],
    active: [],
    binds: [],
    key: '',
    command: ''
  }

  model = {
    activeWindow: "Not found",
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

    this.initializeAlwaysOnTop();

    this.keyModel.list = Object.keys(KeycodeArray).map((keyCode => {
      return KeycodeArray[keyCode];
    }));

    this.keyboard.autoDelay.min = 0;
    this.keyboard.autoDelay.max = 0;

    robotService.KeyboardEvent.subscribe((keys) => {
      this.model.activeKeys = keys;

      this.keyModel.binds.forEach((bind) => {
        keys.forEach(key => {
          if (bind.key == key) {
            console.log('Executing command: ', bind.command);
            this.keyboard.click(bind.command);

            // this.keyboard.click('{ENTER}+{7}clear{ENTER}');
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
    let windowTitle = 'path of exile';

    if (this.debug)
      windowTitle = 'notepad';

    const windowList = this.robot.Window.getList('.*' + windowTitle + '.*');
    const gameWindow = windowList[0];

    console.log('Found window: ', gameWindow.getTitle());

    // SET ACTIVE WINDOW LIKE THIS
    // robot.Window.setActive(window);
    // SEND KEYPRESSES LIKE THIS
    // keyboard.click('{ENTER}+{7}hideout{ENTER}')

  }


  initializeAlwaysOnTop() {
    const tempWindowList = this.robot.Window.getList();
    tempWindowList.forEach(window => {
      const windowObj = {
        Handle: window.getHandle(),
        Title: window.getTitle()
      }
      if (windowObj.Title != '') {
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
    }
    else {
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
    }
    else {
      console.log('Something went wrong when we tried to remove topMost from a window');
    }
  }

  createKeybind() {

    this.keyModel.binds.push({
      key: this.keyModel.key,
      command: this.keyModel.command
    });

    this.keyModel.key = '';
    this.keyModel.command = 'Type command...'

    console.log('Updated keyModel: ', this.keyModel);
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

  keyChange(event) {
    console.log(event);
  }

}
