import { Item } from '../../interfaces/item.interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() columnsWide = 0;
  @Input() columnsHigh = 0;
  @Input() extraPadding = 0;

  constructor() { }
  ngOnInit() {
  }

  getWidth() {
    return 50 * this.columnsWide + this.extraPadding;
  }
  getHeight() {
    return 50 * this.columnsHigh + this.extraPadding;
  }

}
