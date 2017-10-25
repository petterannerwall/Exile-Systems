import { Item } from '../../interfaces/item.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-tooltip',
  templateUrl: './item-tooltip.component.html',
  styleUrls: ['./item-tooltip.component.scss']
})
export class ItemTooltipComponent implements OnInit {
  @Input() item: Item;
  constructor() { }
  ngOnInit() {
  }
  getExplicitModClass(explicit) {
    let modClass = '';
    if (explicit.indexOf('to maximum Life') >= 0) {
      modClass = 'life';
    }
    if (explicit.indexOf('to Cold Resistance') >= 0) {
      modClass = 'coldRes';
    }
    if (explicit.indexOf('to Fire Resistance') >= 0) {
      modClass = 'fireRes';
    }
    if (explicit.indexOf('to Lightning Resistance') >= 0) {
      modClass = 'lightningRes';
    }
    if (explicit.indexOf('to Chaos Resistance') >= 0) {
      modClass = 'chaosRes';
    }
    if (explicit.indexOf('to maximum Mana') >= 0) {
      modClass = 'mana';
    }

    return modClass;
  }
  formatFlaskProperties(prop, firstVal, secondVal) {
    const ex = /(%0)/g;
    let result = prop.replace(ex, firstVal);

    if (prop.indexOf('Consumes') >= 0 && secondVal !== undefined) {
      // use second value as well
      const ex2 = /(%1)/g;
      result = result.replace(ex2, secondVal[0]);
    }

    return result;
  }
}
