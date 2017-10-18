import { Message } from '_debugger';
import { ElectronService } from './electron.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LogParserService {
    message: Message;
    pattern = new RegExp('^(\d{4}/\d{2}/\d{2}\s\d{2}:\d{2}:\d{2})[^\]]+\]\s([$@%#]?)([^:]+)?:\s(.*)');
    constructor(private electron: ElectronService) {
        let rowCount = 10;
        electron.lineReader.eachLine('C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/client.txt', function (line, last) {
            console.log(line);
            rowCount--;
            if (rowCount === 0) {
                return false;
            }
        });
    }

    parseMessage(message) {
        const msg = this.pattern.test(message);

        if (!msg) {
        }
    }
}
