import { MessageTypeEnum } from '../enums/message-type.enum';
import { MessageChannelEnum } from '../enums/message-channel.enum';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs/Rx';
import { Message } from '../interfaces/message.interface';
import { getGuid } from '../helpers/object.helper';
import { ElectronService } from './electron.service';
import { Injectable } from '@angular/core';

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
            // todo: parse new items and send to clients
            if (newItems.length > 0 || this.recentLines.length === 0) {
                newItems.forEach(element => {
                    this.parseMessage(element);
                });
                this.recentLines = currentLines;
            }
        });
    }
    parseMessage(message) {
        const msg = { id: '', player: '', time: undefined, type: undefined, text: '', channel: undefined } as Message;
        const groups = message.match(/(\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2})\s[\d]*\s[\d]*\s\[.*\]\s([$@%#]?)\s?(<.*>\s?)?(\w*):\s(.*)/);
        if (groups === null) {
            return;
        }
        msg.text = groups[5];
        msg.time = new Date(groups[1]);
        if (groups[4] !== undefined) {
            const playerArr = groups[4].split(',');
            msg.player = playerArr[playerArr.length - 1];
        }

        const type = groups[2];

        if (message.indexOf('You have entered') >= 0) {
            msg.type = MessageTypeEnum.SelfEnteringArea;
            msg.channel = MessageChannelEnum.Information;
        } else if (message.indexOf('has left the area') >= 0) {
            msg.type = MessageTypeEnum.OtherLeaveArea;
            msg.channel = MessageChannelEnum.Information;
        }

        if (type === '$') {
            msg.channel = MessageChannelEnum.TradeChannel;
            msg.type = MessageTypeEnum.Message;
        } else if (type === '@') {
            msg.channel = MessageChannelEnum.WhisperChannel;
            msg.type = MessageTypeEnum.Message;
        } else if (type === '%') {
            msg.channel = MessageChannelEnum.PartyChannel;
            msg.type = MessageTypeEnum.Message;
        } else if (type === '#') {
            msg.channel = MessageChannelEnum.GlobalChannel;
            msg.type = MessageTypeEnum.Message;
        }

        if (type === MessageTypeEnum.SelfEnteringArea) {
            msg.text = message.text.split('you have entered ')[1].split('.')[0];
        } else if (type === MessageTypeEnum.OtherJoinArea) {
            msg.player = message.text.split(' has joined the area.')[1];
        } else if (type === MessageTypeEnum.OtherLeaveArea) {
            msg.player = message.text.split(' has left the area.')[1];
        }

        console.log(msg);
        // todo: send to server
    }
}
