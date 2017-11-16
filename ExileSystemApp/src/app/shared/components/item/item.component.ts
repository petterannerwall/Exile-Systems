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

  constructor(private elRef: ElementRef) { }
  ngOnInit() {
  }

  getWidth() {
    return 50 * this.columnsWide + this.extraPadding;
  }
  getHeight() {
    return 50 * this.columnsHigh + this.extraPadding;
  }

  over() {

    const element = $(this.elRef.nativeElement)[0];
    const tooltip = element.children[0].children[1];
    const rect = tooltip.getBoundingClientRect();

    const overflowTop = rect.top;
    const overflowRight = window.innerWidth - rect.right;
    const overflowBottom = window.innerHeight - rect.bottom;
    const overflowLeft = rect.left;

    let marginTop = 0;
    let marginRight = 0;
    let marginBottom = 0;
    let marginLeft = 0;

    if (overflowTop < 0) {
      marginTop = Math.abs(overflowTop);
    }
    if (overflowRight < 0) {
      marginRight = overflowRight;
    }
    if (overflowBottom < 0) {
      marginBottom = overflowBottom - 10;
    }
    if (overflowLeft < 0) {
      marginLeft = Math.abs(overflowLeft) - 190;
    }

    if (overflowTop < 0 || overflowRight < 0 || overflowBottom < 0 || overflowLeft < 0) {

      if (marginTop < marginBottom) {
        marginTop = marginBottom;
      }
      if (marginLeft < marginRight) {
        marginLeft = marginRight;
      }
      if (marginLeft === 0 && overflowLeft > 200) {
        marginLeft = -200;
      } else if (overflowRight > 300) {
        marginLeft += 200;
      }

      tooltip.setAttribute('style', 'margin:' + marginTop + 'px 0px 0px ' + marginLeft + 'px ' + '!important ;');
    }

    tooltip.classList.add('active');
  }

  out() {
    const element = $(this.elRef.nativeElement)[0];
    const tooltip = element.children[0].children[1];
    tooltip.classList.remove('active');
  }

}
