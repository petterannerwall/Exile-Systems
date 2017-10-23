import { Item } from '../../interfaces/item.interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() columnsWide: number;
  @Input() columnsHigh: number;

  showTooltip = false;
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

  hideTooltip() {

  }
}
