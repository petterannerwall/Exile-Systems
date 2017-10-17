import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;
  dialog: any;
  lineReader: any;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.dialog = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.lineReader = window.require('reverse-line-reader');

      // init menu
      const template = [
        {
          label: 'File',
          submenu: [
            {
              label: 'Settings',
              click() {
                console.log('settings clicked');
              }
            }
          ]
        },
        {
          label: 'View',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
          ]
        },
        {
          role: 'window',
          submenu: [
            { role: 'minimize' },
            { role: 'close' }
          ]
        }
      ]
      const menu = this.dialog.Menu.buildFromTemplate(template)
      this.dialog.Menu.setApplicationMenu(menu);
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
