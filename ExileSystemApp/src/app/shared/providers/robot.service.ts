import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { } from '@angular/core'
import { Observable } from 'rxjs/Rx';
import { ElectronService } from './electron.service';
import { KeycodeArray } from './../enums/keycode.enum';



@Injectable()


export class RobotService {

  robot = this.electronSerivce.robot;
  keyboard = this.electronSerivce.robot.Keyboard();
  KeyboardEvent: EventEmitter<any> = new EventEmitter();
  WindowEvent: EventEmitter<any> = new EventEmitter();
  MouseEvent: EventEmitter<any> = new EventEmitter();
  ClipboardEvent: EventEmitter<string> = new EventEmitter();

  isIdle = false;

  public foundPathWindow;
  private pathWindow;
  private activetWindowPID;
  private pressedKeys;
  private lastPressedKeys;
  private lastClipboard;
  private keyTimer;
  private idleTimer;
  private mousePosition = {
    x: 0,
    y: 0
  }

  constructor(private electronSerivce: ElectronService) {

    this.keyboard.autoDelay.min = 0;
    this.keyboard.autoDelay.max = 0;

    this.foundPathWindow = false;
    const windowList = this.robot.Window.getList();
    windowList.forEach(window => {
      const title = window.getTitle();
      if (title === 'Path of Exile') {
        this.pathWindow = window;
        this.foundPathWindow = true;
      }
    });

    if (!this.foundPathWindow) {
      console.log('[DEBUG robot.service.ts] Could not find Path of Exile window.');
    }

    const timeHandle = setInterval(() => {
      this.robotHeartbeat(this.robot)
    }, 100);

    this.lastPressedKeys = [];
    this.keyTimer = this.robot.Timer();

    this.idleTimer = this.robot.Timer();
    this.idleTimer.start();
  }

  private prepareStringForRobot(string) {
    string = string.split('_').join('+-');
    string = string.split('@').join('%^2');
    string = string.split('!').join('+1');

    return string;
  }

  public sendCommandToPathofExile(command) {
    command = this.prepareStringForRobot(command);
    const active = this.setPathWindowToActive();
    if (active) {
      let count = 0;
      const handle = setInterval(() => {
        count++;
        const activeWindow = this.robot.Window.getActive();
        const activeWindowTitle = activeWindow.getTitle();
        if (activeWindowTitle === 'Path of Exile') {
          console.log('[DEBUG robot.service.ts] Path window activated in: ' + count * 10 + ' ms');
          clearInterval(handle)
          console.log('[DEBUG robot.service.ts] Simulating command: ', command);
          this.keyboard.click('{ENTER}');
          this.keyboard.click(command);
          this.keyboard.click('{ENTER}');
        }
      }, 10)
    }
  }

  public logout() {
    const windowPID = this.pathWindow.getPID();
    const windowProcess = this.robot.Process(windowPID);
    const processPID = windowProcess.getPID();
    const cmd = this.electronSerivce.cmd;
    cmd.elevate('logout.exe /process ' + processPID);

    return true;
  }

  private setPathWindowToActive() {
    const windowPID = this.pathWindow.getPID();
    const windowProcess = this.robot.Process(windowPID);
    const processPID = windowProcess.getPID();
    const cmd = this.electronSerivce.cmd;
    cmd.elevate('logout.exe /window ' + processPID);

    return true;


    // if (this.pathWindow.isValid()) {
    //   for (let index = 0; index < 10; index++) {
    //     this.pathWindow.setMinimized(false);
    //     this.robot.Window.setActive(this.pathWindow);
    //     const activeWindow = this.robot.Window.getActive();
    //     const activeWindowTitle = activeWindow.getTitle();
    //     if (activeWindowTitle === 'Path of Exile') {
    //       return true;
    //     }
    //   }
    //   console.log('[DEBUG robot.service.ts] Could not set path window to active.');
    // } else {
    //   console.log('[DEBUG robot.service.ts] Path of Exile winow is not valid.');
    // }
    // return false;
  }


  private robotHeartbeat(robot) {


    const started = this.keyTimer.hasStarted();
    const expired = this.keyTimer.hasExpired(250);

    if (started && expired) {
      this.keyTimer.reset();
      this.lastPressedKeys = [];
    }

    const keyState = robot.Keyboard.getState();
    this.pressedKeys = [];

    // tslint:disable-next-line:forin
    for (const key in keyState) {
      const pressedKey = KeycodeArray[key];
      if (keyState[key] === true && pressedKey !== undefined) {
        this.pressedKeys.push(pressedKey);
        this.idleTimer.restart();
      }
    }

    if (this.pressedKeys.length > 0 && this.pressedKeys.join() !== this.lastPressedKeys.join()) {
      this.lastPressedKeys = this.pressedKeys;
      this.KeyboardEvent.emit(this.pressedKeys);
      this.keyTimer.start();
    } else if (this.lastPressedKeys.length > 0 && this.pressedKeys.length === 0) {
      this.KeyboardEvent.emit(this.pressedKeys);
    }

    // Check active Window
    if (this.activetWindowPID == null) {
      const activetWindow = robot.Window.getActive();
      this.activetWindowPID = activetWindow.getPID();
      this.WindowEvent.emit(activetWindow.getTitle());
    } else {
      const currentWindow = robot.Window.getActive();
      if (currentWindow.getPID() !== this.activetWindowPID) {
        this.activetWindowPID = currentWindow.getPID();
        this.WindowEvent.emit(currentWindow.getTitle());
      }
    }

    // Check Mousedata
    const position = robot.Mouse.getPos();
    if (this.mousePosition.x !== position.x && this.mousePosition.y !== position.y) {
      this.idleTimer.restart();
    }
    this.mousePosition.x = position.x;
    this.mousePosition.y = position.y;


    // Check Clipboard data
    if (robot.Clipboard.hasText()) {
      const clipboard = robot.Clipboard.getText();
      if (this.lastClipboard == null || this.lastClipboard !== clipboard) {
        this.ClipboardEvent.emit(clipboard);
        this.lastClipboard = clipboard;
      }
    } else if (robot.Clipboard.hasImage()) {
      // We do not handle this atm
    }

    // Idletimer
    if (this.idleTimer.hasStarted && this.idleTimer.hasExpired(10000)) {
      if (this.isIdle === false) {
        console.log('[DEBUG robot.service.ts] We are now considered idle as we haven\'t detected any movement in 10 seconds.');
      }
      this.isIdle = true;
    } else {
      this.isIdle = false;
    }

  }






}


