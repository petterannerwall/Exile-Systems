import { ElectronService } from '../shared/providers/electron.service';

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

  constructor(private electronService: ElectronService) {
    // Before render
    this.keyboard.autoDelay.min = 1;
    this.keyboard.autoDelay.max = 5;
  }

  ngOnInit() {
    // After render
    const timeHandle = setInterval(() => this.listenForKeyEvents(this.robot), 100)

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

  listenForKeyEvents(robot) {

    if (robot.Window.getActive().getTitle().indexOf('Exile') > 0) {

      const keyState = robot.Keyboard.getState();

      if (keyState[robot.KEY_CONTROL] && keyState[robot.KEY_D]) {
        console.log('Ctrl + D pressed');
      }

      if (keyState[robot.KEY_F1]) {
        console.log('F1 pressed');
      }

    }


  }

}
