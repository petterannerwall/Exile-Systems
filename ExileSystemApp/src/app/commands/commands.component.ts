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

  model = {
    activeWindow: "Not found",
    activeKeys: [],
    Keys: [],
    activeKeybinds: {

    },
    tempKeys: {
      key: '',
      command: 'Type Commandssss'
    }
  }

  constructor(private electronService: ElectronService, private robotService: RobotService) {
    // Before render

    const keyList = Object.keys(KeycodeArray).map((keyCode => {
      return KeycodeArray[keyCode];
    }));

    console.log(keyList);

    this.model.Keys = keyList;

    this.keyboard.autoDelay.min = 1;
    this.keyboard.autoDelay.max = 5;

    robotService.KeyboardEvent.subscribe((data) => {
      //this.model.activeKeys = data;
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

  createKeybind() {
    console.log(this.model.tempKeys);
  }

  keyChange(event) {
    console.log(event);
  }

}
