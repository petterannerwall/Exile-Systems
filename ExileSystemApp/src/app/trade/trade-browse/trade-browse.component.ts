import { TradeService } from '../../shared/providers/trade.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-browse',
  templateUrl: './trade-browse.component.html',
  styleUrls: ['./trade-browse.component.scss']
})
export class TradeBrowseComponent implements OnInit, OnDestroy {
  constructor(private tradeService: TradeService) { }

  ngOnInit() {
    this.tradeService.browsing = true;
  }

  ngOnDestroy() {
    this.tradeService.browsing = false;
  }
}
