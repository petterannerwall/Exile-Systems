
import 'polyfills';
import 'reflect-metadata';
import 'zone.js/dist/zone-mix';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentRoomComponent } from './current-room/current-room.component';
import { EnterRoomComponent } from './enter-room/enter-room.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarNavModule } from './shared/components/sidebar-nav/sidebar-nav.module';
import { ElectronService } from './shared/providers/electron.service';

@NgModule({
  declarations: [
    AppComponent,
    EnterRoomComponent,
    CurrentRoomComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SidebarNavModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
