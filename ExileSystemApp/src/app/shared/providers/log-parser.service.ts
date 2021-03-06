import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { MessageChannelEnum } from '../enums/message-channel.enum';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { Message } from '../interfaces/message.interface';
import { ChannelService } from './channel.service';
import { ElectronService } from './electron.service';
import { PlayerService } from './player.service';
import { SignalRService } from './signalr.service';
import { SettingService } from './setting.service';

@Injectable()
export class LogParserService {
    recentLines: Array<string> = [];

    NewMessageEvent: EventEmitter<Message> = new EventEmitter();

    logPerformanceTimer;

    constructor(private electron: ElectronService, private signalRService: SignalRService, private playerService: PlayerService,
        private channelService: ChannelService, private settingsService: SettingService) {

        this.logPerformanceTimer = electron.robot.Timer();

        setInterval(() => {
            this.parseLines();
        }, 1000);
    }
    parseLines() {

        this.logPerformanceTimer.start();

        const currentLines = [];
        let rowCount = 20;
        this.electron.lineReader.eachLine(this.settingsService.settings.logpath, (line) => {
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
                    for (let index = 0; index < newItems.length; index++) {
                        const elapsed = this.logPerformanceTimer.getElapsed();
                        if (elapsed > 900) {
                            // index = rowCount + 1; // this exists the loop.
                            // console.log('[DEBUG log-parser.service.ts]: Broke loop parsing lines since we took more then 900 ms');
                        } else {
                            const element = newItems[index];
                            this.parseMessage(element);
                        }
                    }
                    this.recentLines = currentLines;
                    const elapsed = this.logPerformanceTimer.restart();
                    if (elapsed > 500) {
                        console.log('DEBUG: Finished parsing lines after ' + elapsed + ' ms');
                    }
                } else {
                    const elapsed = this.logPerformanceTimer.restart();
                    if (elapsed > 500) {
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
        } else if (message.indexOf('.verify ') >= 0) {
            msg.type = MessageTypeEnum.Verify;
        } else if (message.indexOf('and is currently playing ') >= 0) {
            msg.type = MessageTypeEnum.Whois;
        } else {
            msg.type = MessageTypeEnum.Other;
        }

        if (msg.type === MessageTypeEnum.SelfEnteringArea) {
            msg.text = message.split('You have entered ')[1].split('.')[0];
            this.playerService.currentPlayerObj.area = msg.text;
            this.playerService.currentPlayerObj.inArea = [];
        } else if (MessageTypeEnum.OtherJoinArea === msg.type) {
            msg.player = msg.text.substr(0, msg.text.indexOf(' has joined the area.'));
            this.playerService.currentPlayerObj.inArea.push(msg.player);
        } else if (msg.type === MessageTypeEnum.OtherLeaveArea) {
            msg.player = msg.text.substr(0, msg.text.indexOf(' has left the area.'));
            const index = this.playerService.currentPlayerObj.inArea.indexOf(msg.player);
            if (index > -1) {
                this.playerService.currentPlayerObj.inArea.splice(index, 1);
            }
        } else if (msg.type === MessageTypeEnum.Whois) {
            msg.player = msg.text.substr(0, msg.text.indexOf(' is a'));
            msg.text = message.split('currently playing in ')[1].split('.')[0];

            const levelAndClass = message.split('level ')[1].split('in the')[0]
            const msgLeague = message.split('in the ')[1].split(' league')[0]
            const msgLevel = levelAndClass.split(' ')[0];
            const msgAscendancy = levelAndClass.split(' ')[1];

            msg.data = {
                ascendancy: msgAscendancy,
                level: msgLevel,
                league: msgLeague
            };
        }

        if (msg.type !== MessageTypeEnum.Other && msg.type !== MessageTypeEnum.SelfEnteringArea) {
            this.signalRService.updatePlayer(this.channelService.channel.id, this.playerService.currentPlayerObj, msg.type);
        }

        this.NewMessageEvent.emit(msg);
    }
}
