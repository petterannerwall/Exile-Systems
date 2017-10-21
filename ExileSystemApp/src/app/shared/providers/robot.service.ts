import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
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

  constructor(private electronSerivce: ElectronService) {
    const timeHandle = setInterval(() => this.robotHeartbeat(this.robot), 100)

  }

  private activetWindowPID;
  private lastPressedKeys;
  private lastClipboard;

  private robotHeartbeat(robot) {

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

    //Check Keyboard data
    const keyState = robot.Keyboard.getState();
    const pressedKeys = [];

    for (const key in keyState) {
      const pressedKey = KeycodeArray[key];
      if (keyState[key] == true && pressedKey != undefined) {
        pressedKeys.push(pressedKey);
      }
    }

    if (this.lastPressedKeys == null || pressedKeys != this.lastPressedKeys) {
      this.lastPressedKeys = pressedKeys;
      this.KeyboardEvent.emit(pressedKeys);
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
    else if (robot.Clipboard.HasImage()) {
      //We do not handle this atm
    }





  }







}
