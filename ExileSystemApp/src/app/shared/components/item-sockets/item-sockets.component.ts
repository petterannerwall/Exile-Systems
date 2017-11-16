import { Item } from '../../interfaces/item.interface';
import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-item-sockets',
  templateUrl: './item-sockets.component.html',
  styleUrls: ['./item-sockets.component.scss']
})
export class ItemSocketsComponent implements OnInit {
  @Input() item: Item;
  @Input() columns: number;
  constructor(private elRef: ElementRef) { }
  ngOnInit() {
  }
  getGemByIndex(index) {
    return this.item.socketedItems.find(x => x.socket === index);
  }


  over(event) {

    // const itemTooltip = $('.active')[1];
    // if (itemTooltip !== undefined) {
    //   const itemTooltipPosition = itemTooltip.getBoundingClientRect();
    //   console.log(itemTooltipPosition);
    //   const tooltip = event.target.children[0];
    //   tooltip.left = itemTooltipPosition.left + (itemTooltipPosition.right - itemTooltipPosition.left) + 10;
    //   tooltip.top = itemTooltipPosition.top;


    // }


    // console.log($(event.target.children[0]));
    const tooltip = event.target.children[0];
    const rect = tooltip.getBoundingClientRect();

    const overflowLeft = rect.left;

    if (overflowLeft < 400) {
      tooltip.setAttribute('style', 'margin-left:' + 390 + 'px ' + '!important ;');
    }


  }
}
