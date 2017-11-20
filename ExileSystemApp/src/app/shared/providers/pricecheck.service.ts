
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { RobotService } from './robot.service';
import { ElectronService } from './electron.service';
import { ExternalService } from './external.service';
import { CurrencyService } from './currency.service';
import { PoeTrade } from '../interfaces/poetrade.interface';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class PricecheckService {


  constructor(private robotService: RobotService, private externalService: ExternalService, private currencyService: CurrencyService) {

    this.robotService.ClipboardEvent.subscribe((clipboard: String) => {
      if (clipboard.indexOf('Rarity:') > -1) { // Should be item


        let rarity = null;
        let type = null;
        const properties = [];

        const lines = clipboard.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line !== '--------') {
            if (line.indexOf('Rarity:') > -1) {
              rarity = line.split(': ')[1];
              continue;
            }
            if (rarity !== null && type === null) {
              type = line;
              continue;
            }
            if (rarity === 'Gem') {
              if (line.indexOf('Level:') > -1) {
                properties['Level'] = line.split('Level: ')[1];
                break;
              }
            }
            if (rarity === 'Divination Card') {
              if (line.indexOf('Stack Size:') > -1) {
                properties['Stacksize'] = line.split('Stack Size: ')[1];
                continue;
              }
            }
            // Currency, Divination Card
            // Item
            // Map
          }
        }

        this.getPrices(rarity, type, properties)
      }
    })
  }

  private getPrices(rarity, type, properties) {

    const prices = [];

    const query = {
      'query': {
        'status': {
          'option': 'online'
        },
        'type': type,
        'stats': [
          {
            'type': 'and',
            'filters': []
          }
        ],
        'filters': {
          'misc_filters': {
            'disabled': false,
            'filters': {
              'gem_level': {
                'min': properties['Level']
              }
            }
          },
          'trade_filters': {
            'disabled': false,
            'filters': {
              'sale_type': {
                'option': 'priced'
              }
            }
          }
        }
      },
      'sort': {
        'price': 'asc'
      }
    };

    this.externalService.pathofExileTrade(query).subscribe((response: PoeTrade) => {

      if (response.total > 0) {

        response.result = response.result.slice(0, 40);

        const responseQuery = response.id;
        let fetchString = '';

        let added = 0;
        const promises = [];

        response.result.forEach(string => {
          fetchString += string + ',';
          added++;

          if (added % 10 === 0 || added === response.total) {
            fetchString = fetchString.slice(0, -1);
            promises.push(this.externalService.pathOfExileTradeFetch(fetchString, responseQuery));

            Observable.forkJoin(promises).subscribe((results: Array<any>) => {

              if (promises.length === results.length) {
                let trades: any = [];
                results.forEach(result => {
                  trades = trades.concat(result.result)
                });
                for (let j = 0; j < trades.length; j++) {
                  const trade = trades[j];
                  if (trade.info.price.currency === 'chaos') {
                    prices.push(trade.info.price.amount);
                  } else {
                    const value = this.currencyService.convertToChaos(trade.info.price.currency, trade.info.price.amount);
                    prices.push(value);
                  }
                }
                console.log('Pricing for: level', properties['Level'] + ' ' + type);
                console.log('Median in chaos: ', this.getMedian(prices));
                console.log('Avarage in chaos: ', prices.reduce((p, c) => p + c, 0) / prices.length);
              }
            });
            fetchString = '';
          }
        });
      }
    });
  }
  private getMedian(args) {
    if (!args.length) { return 0 };
    const numbers = args.slice(0).sort((a, b) => a - b);
    const middle = Math.floor(numbers.length / 2);
    const isEven = numbers.length % 2 === 0;
    return isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle];
  }
}
