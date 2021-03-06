
import 'polyfills';
import 'reflect-metadata';
import 'zone.js/dist/zone-mix';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterializeModule } from 'angular2-materialize';
import { ConnectionTransport, SignalRConfiguration, SignalRModule } from 'ng2-signalr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentRoomComponent } from './current-room/current-room.component';
import { EnterRoomComponent } from './enter-room/enter-room.component';
import { SettingsComponent } from './settings/settings.component';
import { PricecheckListComponent } from './pricecheck-list/pricecheck-list.component';
import { WebviewDirective } from './shared/directives/webview.directive';
import { AcceptSendModule } from './shared/modules/accept-send/accept-send.module';
import { CharacterInventoryModule } from './shared/modules/character-inventory/character-inventory.module';
import { CharacterPreviewModule } from './shared/modules/character-preview/character-preview.module';
import { ItemModule } from './shared/modules/item/item.module';
import { MapModule } from './shared/modules/map/map.module';
import { PlayerListModule } from './shared/modules/player-list/player-list.module';
import { SidebarNavModule } from './shared/modules/sidebar-nav/sidebar-nav.module';
import { ChannelService } from './shared/providers/channel.service';
import { CurrencyService } from './shared/providers/currency.service';
import { ElectronService } from './shared/providers/electron.service';
import { ExternalService } from './shared/providers/external.service';
import { LogParserService } from './shared/providers/log-parser.service';
import { PlayerService } from './shared/providers/player.service';
import { RobotService } from './shared/providers/robot.service';
import { SettingService } from './shared/providers/setting.service';
import { SignalRService } from './shared/providers/signalr.service';
import { TradeService } from './shared/providers/trade.service';
import { PricecheckService } from './shared/providers/pricecheck.service';
import { TradeBrowseComponent } from './trade/trade-browse/trade-browse.component';
import { TradeManagementComponent } from './trade/trade-management/trade-management.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterRoomComponent,
    CurrentRoomComponent,
    SettingsComponent,
    TradeBrowseComponent,
    TradeManagementComponent,
    PricecheckListComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SignalRModule.forRoot(createConfig),
    AppRoutingModule,
    SidebarNavModule,
    MaterializeModule,
    PlayerListModule,
    ItemModule,
    AcceptSendModule,
    MapModule,
    CharacterPreviewModule,
    CharacterInventoryModule
  ],
  providers: [ElectronService, SettingService, SignalRService, LogParserService, ExternalService, ChannelService,
    RobotService, CurrencyService, PlayerService, TradeService, PricecheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'ServerHub';
  c.withCredentials = false;
  c.jsonp = true;
  c.url = 'http://www.petterannerwall.se:9393/signalr';
  c.logging = false;
  c.transport = [new ConnectionTransport('webSockets'), new ConnectionTransport('longPolling')];
  return c;
}
