import { ExternalService } from './shared/providers/external.service';
import { SettingService } from './shared/providers/setting.service';
import { SignalRService } from './shared/providers/signalr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from './shared/providers/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(public electronService: ElectronService, public settingService: SettingService, public signalRService: SignalRService,
  private externalService: ExternalService) {
    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
  ngOnInit() {
    this.externalService.getCharacter('CojL', 'CojL');
  }
}
