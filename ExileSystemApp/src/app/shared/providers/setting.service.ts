import { ElectronService } from './electron.service';

import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

  constructor(private electron: ElectronService) {
    this.electron.config.set('logpath', 'C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/client.txt');
  }
}
