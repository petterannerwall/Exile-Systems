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
import { CommandsComponent } from './commands/commands.component';
import { CurrentRoomComponent } from './current-room/current-room.component';
import { EnterRoomComponent } from './enter-room/enter-room.component';
import { MapComponent } from './map/map.component';
import { SettingsComponent } from './settings/settings.component';
import { CharacterPreviewComponent } from './shared/components/character-preview/character-preview.component';
import { ItemModule } from './shared/components/item/item.module';
import { SidebarNavModule } from './shared/components/sidebar-nav/sidebar-nav.module';
import { ChannelService } from './shared/providers/channel.service';
import { ElectronService } from './shared/providers/electron.service';
import { ExternalService } from './shared/providers/external.service';
import { LogParserService } from './shared/providers/log-parser.service';
import { RobotService } from './shared/providers/robot.service';
import { SettingService } from './shared/providers/setting.service';
import { SignalRService } from './shared/providers/signalr.service';

@NgModule({
  declarations: [
    AppComponent,
    EnterRoomComponent,
    CurrentRoomComponent,
    SettingsComponent,
    MapComponent,
    CommandsComponent,
    CharacterPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SignalRModule.forRoot(createConfig),
    AppRoutingModule,
    SidebarNavModule,
    MaterializeModule,
    ItemModule
  ],
  providers: [ElectronService, SettingService, SignalRService, LogParserService, ExternalService, ChannelService,
    RobotService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'ServerHub';
  c.withCredentials = false;
  c.jsonp = true;
  c.url = 'http://www.petterannerwall.se:9393/signalr';
  c.logging = true;
  c.transport = [new ConnectionTransport('webSockets'), new ConnectionTransport('longPolling')];
  return c;
}
