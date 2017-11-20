import { TradeService } from '../../shared/providers/trade.service';
import { ElectronService } from '../../shared/providers/electron.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade-browse',
  templateUrl: './trade-browse.component.html',
  styleUrls: ['./trade-browse.component.scss']
})
export class TradeBrowseComponent implements OnInit, OnDestroy {
  constructor(private tradeService: TradeService, private electronService: ElectronService) { }

  ngOnInit() {
    this.tradeService.browsing = true;
  }

  ngOnDestroy() {
    this.tradeService.browsing = false;
  }

  window() {

    const remote = this.electronService.dialog;
    const BrowserWindow = remote.BrowserWindow;
    const window = new BrowserWindow({
      width: 1080,
      height: 950
    })

    window.webContents.on('did-finish-load', () => {
      window.show();
      window.focus();
    });
    window.loadURL('file://' + __dirname + '/index.html#/trade/browse');
  }
}
