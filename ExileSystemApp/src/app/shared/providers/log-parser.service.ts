import { ExternalService } from './external.service';
import { SignalRService } from './signalr.service';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { MessageChannelEnum } from '../enums/message-channel.enum';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs/Rx';
import { Message } from '../interfaces/message.interface';
import { getGuid } from '../helpers/object.helper';
import { ElectronService } from './electron.service';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class LogParserService {
    recentLines: Array<string> = [];

    NewMessageEvent: EventEmitter<Message> = new EventEmitter();

    logPerformanceTimer;

    constructor(private electron: ElectronService, private signalRService: SignalRService, private externalService: ExternalService) {

        this.logPerformanceTimer = electron.robot.Timer();

        setInterval(() => {
            this.parseLines();
        }, 1000);
    }
    parseLines() {

        this.logPerformanceTimer.start();

        const currentLines = [];
        let rowCount = 20;
        this.electron.lineReader.eachLine(this.electron.config.get('logpath'), (line) => {
            currentLines.push(line);
            rowCount--;
            if (rowCount === 0) {
                return false;
            }
        }).then(() => {
            if (this.recentLines.length === 0) {
                this.recentLines = currentLines;
            } else {
                const newItems = currentLines.filter(item => this.recentLines.indexOf(item) < 0);
                if (newItems.length > 0 || this.recentLines.length === 0) {
                    newItems.forEach(element => {
                        this.parseMessage(element);
                    });
                    this.recentLines = currentLines;
                    const elapsed = this.logPerformanceTimer.restart();
                    if (elapsed > 100) {
                        console.log('DEBUG: Finished parsing lines after ' + elapsed + ' ms');
                    }
                } else {
                    const elapsed = this.logPerformanceTimer.restart();
                    if (elapsed > 100) {
                        console.log('DEBUG: Finished parsing lines after ' + elapsed + ' ms');
                    }
                }
            }
        });
    }
    parseMessage(message) {
        const msg = { id: '', player: '', time: undefined, type: undefined, text: '', channel: undefined } as Message;
        // tslint:disable-next-line:max-line-length
        const groups = message.match(/(\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2})\s[\d]*\s[\d]*\s\[.*\]\s([$@%#]?)(?:From)?\s?(<.*>\s?)?(\w*):\s(.*)/);
        if (groups === null) {
            msg.type = MessageTypeEnum.Other;
            return;
        }

        msg.text = groups[5];
        msg.time = new Date(groups[1]);
        if (groups[4] !== undefined) {
            const playerArr = groups[4].split(',');
            msg.player = playerArr[playerArr.length - 1];
        }

        const type = groups[2];

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

        if (message.indexOf('You have entered') >= 0) {
            msg.type = MessageTypeEnum.SelfEnteringArea;
            msg.channel = MessageChannelEnum.Information;
        } else if (message.indexOf('has left the area') >= 0) {
            msg.type = MessageTypeEnum.OtherLeaveArea;
            msg.channel = MessageChannelEnum.Information;
        } else if (message.indexOf('has joined the area.') >= 0) {
            msg.type = MessageTypeEnum.OtherJoinArea;
        } else if (message.indexOf('would like to buy your') >= 0) {
            console.log('Trade message detected');
            msg.type = MessageTypeEnum.TradeMessage;
        } else {
            msg.type = MessageTypeEnum.Other;
        }

        if (msg.type === MessageTypeEnum.SelfEnteringArea) {
            msg.text = message.split('You have entered ')[1].split('.')[0];
            this.externalService.player.area = msg.text;
        } else if (MessageTypeEnum.OtherJoinArea === msg.type) {
            msg.player = message.split(' has joined the area.')[1];
        } else if (msg.type === MessageTypeEnum.OtherLeaveArea) {
            msg.player = message.split(' has left the area.')[1];
        }

        if (msg.type !== MessageTypeEnum.Other && msg.type !== MessageTypeEnum.SelfEnteringArea) {
            this.signalRService.updatePlayer(this.externalService.player.channel, this.externalService.player);
        }

        this.NewMessageEvent.emit(msg);
    }
}
