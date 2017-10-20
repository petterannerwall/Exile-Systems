import { ElectronService } from '../shared/providers/electron.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent implements OnInit {

  constructor(private electronService: ElectronService) {
    // Before render
   }

  ngOnInit() {
    // After render
    const robot = this.electronService.robot;
    const keyboard = robot.Keyboard();
    const mouse = robot.Mouse();

    keyboard.autoDelay.min = 1;
    keyboard.autoDelay.max = 5;

    // const processList = robot.Window.getList('.*notepad.*');
    // const window = processList[0];
    // robot.Window.setActive(window);
    // console.log('setting active window to: ', window.getTitle());
    // console.log('Active window: ', robot.Window.getActive().getTitle());


    // keyboard.click('{ENTER}+{7}hideout{ENTER}')



  }

}
