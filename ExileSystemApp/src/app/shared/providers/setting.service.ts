import { ElectronService } from './electron.service';

import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

  constructor(private electron: ElectronService) {
    this.electron.config.set('logpath', 'C:/eula.1028.txt');
  }
}
