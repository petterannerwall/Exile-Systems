
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { RobotService } from './robot.service';
import { ElectronService } from './electron.service';


@Injectable()
export class PricecheckService {


  constructor(private robotService: RobotService) {

    this.robotService.ClipboardEvent.subscribe((clipboard: String) => {
      if (clipboard.indexOf('Rarity:') > -1) { // Should be item

        let rarity = null;
        let name = null;
        const properties = [];

        const lines = clipboard.split('\n');
        lines.forEach((line: string) => {
          line = line.trim();
          if (line !== '--------') {
            if (line.indexOf('Rarity:') > -1) {
              rarity = line.split(': ')[1];
              return;
            }
            if (rarity !== null && name === null) {
              name = line;
              return;
            }
            if (rarity === 'Gem') {
              if (line.indexOf('Level:') > -1) {
                properties['Level'] = line.split('Level: ')[1];
                return;
              }
            }
            if (rarity === 'Divination Card') {
              if (line.indexOf('Stack Size:') > -1) {
                properties['Stacksize'] = line.split('Stack Size: ')[1];
                return;
              }
            }
            // Currency, Divination Card
            // Item
            // Map
          }
        })
      }
    })

  }
}
