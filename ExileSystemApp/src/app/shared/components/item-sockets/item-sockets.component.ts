import { Item } from '../../interfaces/item.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-sockets',
  templateUrl: './item-sockets.component.html',
  styleUrls: ['./item-sockets.component.scss']
})
export class ItemSocketsComponent implements OnInit {
  @Input() item: Item;
  @Input() columns: number;
  constructor() { }
  ngOnInit() {
  }
  getGemByIndex(index) {
    return this.item.socketedItems.find(x => x.socket === index);
  }
}
