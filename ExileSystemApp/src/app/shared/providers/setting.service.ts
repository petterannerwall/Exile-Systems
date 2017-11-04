import { ElectronService } from './electron.service';

import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

  settings = {
    logpath: 'C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/client.txt',
    trade: {
      soldMessage: '',
      thankMessage: '',
      autoSendTrade: false
    },
    room: {
      roomCode: '',
      accountName: '',
      characterName: '',
      sessionId: ''
    },
    keybinds: {
      specific: {
        logout: '',
        invite: '',
        sold: ''
      },
      other: []
    }
  };

  constructor(private electronService: ElectronService) {
    const savedSettings = this.electronService.config.get('settings');
    if (savedSettings !== undefined) {
      this.settings = savedSettings;
    }
  }

  save() {
    this.electronService.config.set('settings', this.settings)
  }
}
