import { ChannelService } from './shared/providers/channel.service';
import 'polyfills';
import 'reflect-metadata';
import 'zone.js/dist/zone-mix';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ConnectionTransport, SignalRConfiguration, SignalRModule } from 'ng2-signalr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentRoomComponent } from './current-room/current-room.component';
import { EnterRoomComponent } from './enter-room/enter-room.component';
import { MapComponent } from './map/map.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarNavModule } from './shared/components/sidebar-nav/sidebar-nav.module';
import { ElectronService } from './shared/providers/electron.service';
import { ExternalService } from './shared/providers/external.service';
import { LogParserService } from './shared/providers/log-parser.service';
import { SettingService } from './shared/providers/setting.service';
import { SignalRService } from './shared/providers/signalr.service';

@NgModule({
  declarations: [
    AppComponent,
    EnterRoomComponent,
    CurrentRoomComponent,
    SettingsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SignalRModule.forRoot(createConfig),
    AppRoutingModule,
    SidebarNavModule
  ],
  providers: [ElectronService, SettingService, SignalRService, LogParserService, ExternalService, ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'ServerHub';
  c.withCredentials = false;
  c.jsonp = true;
  c.url = 'http://localhost:9393/';
  c.logging = true;
  c.transport = [new ConnectionTransport('webSockets'), new ConnectionTransport('longPolling')];
  return c;
}
