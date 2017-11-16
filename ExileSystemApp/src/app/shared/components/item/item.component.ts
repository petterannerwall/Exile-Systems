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

    // console.log('window innerHeight:' + window.innerHeight);
    // console.log('document clientHeight:' + document.documentElement.clientHeight);
    // console.log('window innerWidth:' + window.innerWidth);
    // console.log('document clientWidth:' + document.documentElement.clientWidth);
    // console.log(rect);

    // TOP RIGHT BOTTOM LEFT

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

    // tslint:disable-next-line:max-line-length
    if (overflowTop < 0 || overflowRight < 0 || overflowBottom < 0 || overflowLeft < 0) {

      if (marginTop < marginBottom) {
        marginTop = marginBottom;
      }
      if (marginLeft < marginRight) {
        marginLeft = marginRight;
      }
      if (marginLeft === 0 && overflowLeft > 200) {
        marginLeft = -200;
      }

      tooltip.setAttribute('style', 'margin:' + marginTop + 'px 0px 0px ' + marginLeft + 'px ' + '!important ;');
    }

    // if (rect.top < 0) {
    //   const overflow = Math.abs(rect.top);
    //   tooltip.setAttribute('style', 'margin-top:' + overflow + 'px !important ;');
    // }
    // console.log($());
    // const rect = this.elRef.nativeElement.getBoundingClientRect();
    // console.log(rect);

    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );

    console.log(isInViewport);
  }

}
