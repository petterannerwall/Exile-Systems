import { TradeManagementComponent } from './trade/trade-management/trade-management.component';
import { TradeBrowseComponent } from './trade/trade-browse/trade-browse.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentRoomComponent } from './current-room/current-room.component';
import { EnterRoomComponent } from './enter-room/enter-room.component';
import { CommandsComponent } from './commands/commands.component';
import { MapComponent } from './map/map.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: EnterRoomComponent
    },
    {
        path: 'enter-room',
        component: EnterRoomComponent
    },
    {
        path: 'current-room',
        component: CurrentRoomComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'commands',
        component: CommandsComponent
    },
    {
        path: 'map',
        component: MapComponent
    },
    {
        path: 'trade/browse',
        component: TradeBrowseComponent
    },
    {
        path: 'trade/management',
        component: TradeManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
