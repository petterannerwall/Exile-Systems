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

  constructor() { }
  ngOnInit() {
  }
}
