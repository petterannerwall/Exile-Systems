import { Message } from '../interfaces/message.interface';
import { getGuid } from '../helpers/object.helper';
import { ElectronService } from './electron.service';
import { Injectable } from '@angular/core';
import { MessageTypeEnum } from '../enums/message-type.enum';

@Injectable()
export class LogParserService {
    recentLines: Array<string> = [];
    constructor(private electron: ElectronService) {
        setInterval(() => {
            let rowCount = 10;
            this.electron.lineReader.eachLine(this.electron.config.get('logpath'), (line, last) => {
                if (this.recentLines.length > 10) {
                    this.recentLines = [];
                }
                this.parseMessage(line);
                rowCount--;
                if (rowCount === 0) {
                    return false;
                }
            });
        }, 500);
    }

    parseMessage(message) {
        const msg = { id: '', player: '', time: undefined, type: undefined, text: '' } as Message;
        const groups = message.match(/(\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2})\s[\d]*\s[\d]*\s\[.*\]\s([$@%#]?)\s?(<.*>\s?)?(\w*):\s(.*)/);
        if (groups === null) {
            return;
        }
        msg.text = groups[5];
        msg.time = new Date(groups[1]);
        if (groups[3] !== undefined) {
            const playerArr = groups[3].split(',');
            msg.player = playerArr[playerArr.length - 1];
        }
        if (this.recentLines.find(x => x === message) === undefined) {
            this.recentLines.push(message);
            console.log(this.recentLines);
        }
    }
}
