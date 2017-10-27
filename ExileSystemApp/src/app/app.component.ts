import { TradeService } from './shared/providers/trade.service';
import { ExternalService } from './shared/providers/external.service';
import { SettingService } from './shared/providers/setting.service';
import { SignalRService } from './shared/providers/signalr.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from './shared/providers/electron.service';
import { CurrencyService } from './shared/providers/currency.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(public electronService: ElectronService, public settingService: SettingService, public signalRService: SignalRService,
    private externalService: ExternalService, private currencyService: CurrencyService, private tradeService: TradeService) {
    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    const fs = electronService.fs;

    if (!fs.existsSync('./logout.exe')) {
      const file = electronService.fs.createWriteStream('./logout.exe');
      const request = this.electronService.http.get('http://www.petterannerwall.se/logout.exe', function (response) {
        response.pipe(file);
        file.on('finish', function () {
          file.close();  // close() is async, call cb after close completes.
        });
      }).on('error', function (err) { // Handle errors
        fs.unlink('./logout.exe'); // Delete the file async. (But we don't check the result)
      });
    }


  }
  ngOnInit() {
    this.externalService.getCharacter('CojL', 'CojL');
  }
}
