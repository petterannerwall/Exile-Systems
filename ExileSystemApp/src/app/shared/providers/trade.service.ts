import { IncomingMessage } from 'http';
import { IncomingTrade } from '../interfaces/incomming-trade.interface';
import { RobotService } from './robot.service';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { LogParserService } from './log-parser.service';

import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';


@Injectable()
export class TradeService {
  public browsing = false;
  tradeList = [];

  constructor(private logParser: LogParserService, private robotService: RobotService) {

    this.logParser.NewMessageEvent.subscribe((message) => {
      if (message.type === MessageTypeEnum.TradeMessage) {

        const tradeMessage = { item: '', price: '', currency: '', count: '', league: '', location: '', inArea: false } as IncomingTrade;

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

        this.tradeList.push(tradeMessage);

      }
    });

    this.robotService.ClipboardEvent.subscribe((text => {

    }))

  }

}
