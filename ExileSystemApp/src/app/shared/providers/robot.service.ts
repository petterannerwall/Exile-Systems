import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ElectronService } from './electron.service';


@Injectable()


export class RobotService {

  robot = this.electronSerivce.robot;

  KeyboardEvent: EventEmitter<any> = new EventEmitter();
  WindowEvent: EventEmitter<any> = new EventEmitter();
  MouseEvent: EventEmitter<any> = new EventEmitter();

  constructor(private electronSerivce: ElectronService) {

    const timeHandle = setInterval(() => this.robotHeartbeat(this.robot), 100)

  }

  private activetWindowPID;

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

    //Check pressed keys


    // if (robot.Window.getActive().getTitle().indexOf('Exile') > 0) {

    //   const keyState = robot.Keyboard.getState();

    //   for (const key in keyState) {
    //     if (keyState[key] == true) {
    //       console.log(key);
    //     }
    //   }


    //   if (keyState[robot.KEY_CONTROL] && keyState[robot.KEY_D]) {
    //     this.KeyboardEvent.emit('Ctrl + D')
    //   }
    //   if (keyState[robot.KEY_F1]) {
    //     this.KeyboardEvent.emit('F1')
    //   }
    // }




  }







}
