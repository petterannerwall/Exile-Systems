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
  KeyboardEvent: EventEmitter<any> = new EventEmitter();
  WindowEvent: EventEmitter<any> = new EventEmitter();
  MouseEvent: EventEmitter<any> = new EventEmitter();
  ClipboardEvent: EventEmitter<any> = new EventEmitter();
  sendingInput = false;


  constructor(private electronSerivce: ElectronService) {
    const timeHandle = setInterval(() => this.robotHeartbeat(this.robot), 250)

    this.lastPressedKeys = [];
    this.keyTimer = this.robot.Timer();

  }

  private activetWindowPID;
  private pressedKeys;
  private lastPressedKeys;
  private lastClipboard;
  private keyTimer;

  private robotHeartbeat(robot) {

    console.log(this.sendingInput);

    if (!this.keyTimer.hasStarted() && this.keyTimer.hasExpired(500)) {
      this.keyTimer.reset();
      this.lastPressedKeys = [];
    }

    const keyState = robot.Keyboard.getState();
    this.pressedKeys = [];

    for (const key in keyState) {
      const pressedKey = KeycodeArray[key];
      if (keyState[key] == true && pressedKey != undefined) {
        this.pressedKeys.push(pressedKey);
      }
    }

    if (this.pressedKeys.length > 0 && this.pressedKeys.join() !== this.lastPressedKeys.join()) {
      this.lastPressedKeys = this.pressedKeys;
      this.KeyboardEvent.emit(this.pressedKeys);
      this.keyTimer.start();
    }
    else if (this.lastPressedKeys.length > 0 && this.pressedKeys.length === 0) {
      this.KeyboardEvent.emit(this.pressedKeys);
    }




    //Check active Window
    if (this.activetWindowPID == null) {
      const activetWindow = robot.Window.getActive();
      this.activetWindowPID = activetWindow.getPID();
      this.WindowEvent.emit(activetWindow.getTitle());
    }
    else {
      const currentWindow = robot.Window.getActive();
      if (currentWindow.getPID() !== this.activetWindowPID) {
        this.activetWindowPID = currentWindow.getPID();
        this.WindowEvent.emit(currentWindow.getTitle());
      }
    }

    //Check Mousedata

    //Check Clipboard data
    if (robot.Clipboard.hasText()) {
      const clipboard = robot.Clipboard.getText();
      if (this.lastClipboard == null || this.lastClipboard != clipboard) {
        this.ClipboardEvent.emit(clipboard);
        this.lastClipboard = clipboard;
      }
    }
    else if (robot.Clipboard.hasImage()) {
      //We do not handle this atm
    }

  }






}


