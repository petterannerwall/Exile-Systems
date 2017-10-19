import { Observable } from 'rxjs/Rx';
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
            this.parseLines();
        }, 3000);
    }
    parseLines() {
        const currentLines = [];
        let rowCount = 10;
        this.electron.lineReader.eachLine(this.electron.config.get('logpath'), (line) => {
            currentLines.push(line);
            rowCount--;
            if (rowCount === 0) {
                return false;
            }
        }).then(() => {
            const newItems = currentLines.filter(item => this.recentLines.indexOf(item) < 0);
            console.log('---------------------------');
            console.log('new items: ', newItems); // todo: parse new items and send to clients
            if (newItems.length > 0 || this.recentLines.length === 0) {
                this.recentLines = currentLines;
            }
            console.log('saved items: ', this.recentLines);
        });
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
    }
}
