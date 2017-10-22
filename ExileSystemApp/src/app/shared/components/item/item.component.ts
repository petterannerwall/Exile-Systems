import { Item } from '../../interfaces/item.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  showTooltip = false;
  constructor() { }
  ngOnInit() {
  }
}
