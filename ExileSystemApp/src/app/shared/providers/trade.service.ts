import { Message } from '../interfaces/message.interface';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { IncomingTrade } from '../interfaces/incomming-trade.interface';
import { LogParserService } from './log-parser.service';
import { RobotService } from './robot.service';


@Injectable()
export class TradeService {
  public browsing = false;
  list = Array<IncomingTrade>();

  constructor(private logParser: LogParserService, private robotService: RobotService) {

    this.logParser.NewMessageEvent.subscribe((message: Message) => {
      if (message.type === MessageTypeEnum.TradeMessage) {

        const tradeMessage = { item: '', price: '', currency: '', count: '', league: '', location: '', inArea: false,
         invited: false, thanked: false } as IncomingTrade;

        if (message.text.indexOf('I would like') > 0) {
          if (message.text.indexOf('listed for') > 0) {
            tradeMessage.item = message.text.split('to buy your ')[1].split(' listed for')[0];
            tradeMessage.price = message.text.split('listed for ')[1].split(' in ')[0];
            if (tradeMessage.price !== '') {
              tradeMessage.count = tradeMessage.price.substring(0, tradeMessage.price.indexOf(' '));
              tradeMessage.currency = tradeMessage.price.substring(tradeMessage.price.indexOf(' ') + 1, tradeMessage.price.length);
            }
          } else {
            tradeMessage.item = message.text.split('to buy your ')[1].split(' in ')[0];
            tradeMessage.price = 'Not specified';
          }
        } else if (message.text.indexOf('I\'d like') > 0) {
          tradeMessage.item = message.text.split('to buy your ')[1].split(' for my')[0];
          if (tradeMessage.item !== '') {
            const priceText = message.text.split('for my ')[1].split(' in ')[0];
            tradeMessage.price = message.text.split('listed for ')[1].split(' in ')[0];
            if (tradeMessage.price !== '') {
              tradeMessage.count = tradeMessage.price.substring(0, tradeMessage.price.indexOf(' '));
              tradeMessage.currency = tradeMessage.price.substring(tradeMessage.price.indexOf(' ') + 1, tradeMessage.price.length);
            }
          }
        }
        if (message.text.indexOf('in') > 0) {
          tradeMessage.league = message.text.split('in ')[1].split(' (')[0];
        }
        if (message.text.indexOf('stash tab') > 0) {
          tradeMessage.location = message.text.split('(')[1].split(')')[0];
        }

        tradeMessage.player = message.player;

        this.list.push(tradeMessage);

      }
      if (message.type === MessageTypeEnum.OtherJoinArea) {
        this.list.forEach(trade => {
          if (trade.player === message.player) {
            trade.inArea = true;
          }
        });
      }
      if (message.type === MessageTypeEnum.OtherLeaveArea) {
        this.list.forEach(trade => {
          if (trade.player === message.player) {
            trade.inArea = false;
          }
        });
      }
    });

    this.robotService.ClipboardEvent.subscribe((text => {

    }))

  }

}
