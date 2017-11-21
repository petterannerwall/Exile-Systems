
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

  private pseudo;
  private explicit;
  private implicit;
  private enchant;
  private crafted;

  constructor(private robotService: RobotService, private externalService: ExternalService, private currencyService: CurrencyService,
    private electronService: ElectronService) {


    this.externalService.pathOfExileTradeStats().subscribe((response: any) => {
      this.pseudo = response.result[0].entries;
      this.explicit = response.result[1].entries;
      this.implicit = response.result[2].entries;
      this.enchant = response.result[3].entries;
      this.crafted = response.result[4].entries;
    })

    this.robotService.ClipboardEvent.subscribe((clipboard: String) => {
      if (clipboard.indexOf('Rarity:') > -1) { // Should be item


        let rarity = null;
        let name = null;
        let base = null;
        const stats = [];
        const armour = [];
        const misc = [];

        let part = 0;
        let step = 0;

        const lines = clipboard.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line !== '--------') {

            if (part === 0) { // Rarity, name and type
              if (line.indexOf('Rarity:') > -1) {
                rarity = line.split(': ')[1];
                continue;
              }
              if (rarity !== null && name === null && part === 0) {
                name = line;
                continue;
              }
              if (rarity !== null && base === null && part === 0) {
                base = line;
                continue;
              }
            }
            if (part === 1) { // armour
              if (rarity === 'Gem') {
                if (line.indexOf('Level:') > -1) {
                  armour['Level'] = line.split('Level: ')[1];
                  break;
                }
              }
              if (rarity === 'Rare') {
                if (line.indexOf('Evasion Rating') > -1) {
                  armour['ev'] = line.split('Evasion Rating: ')[1];
                  armour['ev'] = armour['ev'].replace(' (augmented)', '');
                  continue;
                }
                if (line.indexOf('Armour') > -1) {
                  armour['ar'] = line.split('Armour: ')[1];
                  armour['ar'] = armour['ar'].replace(' (augmented)', '');
                  continue;
                }
                if (line.indexOf('Energy Shield') > -1) {
                  armour['es'] = line.split('Energy Shield: ')[1];
                  armour['es'] = armour['es'].replace(' (augmented)', '');
                  continue;
                }
              }
            }
            if (part === 2) { // Requirements
            }
            if (part === 3) { // Sockets
            }
            if (part === 4) { // Item level
              if (rarity === 'Rare') {
                if (line.indexOf('Item Level:') > -1) {
                  misc['ilvl'] = line.split('Item Level: ')[1];
                  continue;
                }
              }
            }
            if (part === 5) { // Prefixes and Suffixes
              const value = line.replace(/[^\d]{1,4}/g, '');
              let mod = line.replace(value, 'X');

              mod = mod.substr(0, 1) === '+' ? mod.substr(1) : mod; // remove first + if exists.

              stats.push({
                'mod': mod,
                // tslint:disable-next-line:radix
                'value': parseInt(value),
                'id': this.modToId(mod)
              })
              step++;
              continue;
            }
            if (part === 6) { // Corrupted or notes
            }
          } else {
            part++;
          }
        }
        this.getPrices(rarity, base, stats, [], [], [], [], [], [], [])
      }
    })
  }

  private getPrices(rarity, base, stats, weapon, armour, socket, req, misc, trade, type) {

    const prices = [];

    const query = {
      'query': {
        // 'status': {
        //   'option': 'online'
        // },
        // 'type': base,
        'stats': [
          {
            'type': 'and',
            'filters': []
          }
        ],
        'filters': {
          'weapon_filters': {
            'disabled': true,
            'filters': []
          },
          'armour_filters': {
            'disabled': true,
            'filters': []
          },
          'socket_filters': {
            'disabled': true,
            'filters': []
          },
          'req_filters': {
            'disabled': true,
            'filters': []
          },
          'misc_filters': {
            'disabled': true,
            'filters': []
          },
          'trade_filters': {
            'disabled': false,
            'filters': {
              'sale_type': {
                'option': 'priced'
              }
            }
          },
          'type_filters': {
            'disabled': true,
            'filters': []
          },
        }
      },
      'sort': {
        'price': 'asc'
      }
    };


    for (const key in misc) {
      if (misc.hasOwnProperty(key)) {
        const value = misc[key];
        const obj = {
          'min': value,
          'max': 100
        }
        query.query.filters.misc_filters.filters[key] = obj;
        query.query.filters.misc_filters.disabled = false;
      }
    }

    for (const key in armour) {
      if (armour.hasOwnProperty(key)) {
        const value = armour[key];
        const obj = {
          'min': value * 0.9,
          'max': value * 1.1
        }
        query.query.filters.armour_filters.filters[key] = obj;
        query.query.filters.armour_filters.disabled = false;
      }
    }
    for (const key in stats) {
      if (stats.hasOwnProperty(key)) {
        const element = stats[key];

        const obj = {
          'id': element.id,
          'value': {
            'min': element.value * 0.1,
            'max': element.value * 1.9
          },
          'disabled': false
        }

        query.query.stats[0].filters[key] = obj;
      }
    }

    debugger;



    this.externalService.pathofExileTrade(query).subscribe((response: PoeTrade) => {
      debugger;
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
                console.log('Pricing for: level', base);
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

  private modToId(mod: string) {

    for (let i = 0; i < this.explicit.length; i++) {
      const text = this.explicit[i].text.trim();
      mod = mod.trim();
      if (text === mod) {
        return this.explicit[i].id;
      }
    }
  }
}
