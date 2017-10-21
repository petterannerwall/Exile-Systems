import { ElectronService } from '../shared/providers/electron.service';
import { RobotService } from '../shared/providers/robot.service';

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
    activeKeys: []
  }

  constructor(private electronService: ElectronService, private robotService: RobotService) {
    // Before render
    this.keyboard.autoDelay.min = 1;
    this.keyboard.autoDelay.max = 5;

    robotService.KeyboardEvent.subscribe((data) => {
      this.model.activeKeys = data;
    })
    robotService.WindowEvent.subscribe((data) => {
      this.model.activeWindow = data;
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

}
