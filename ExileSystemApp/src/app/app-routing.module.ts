import { TradeManagementComponent } from './trade/trade-management/trade-management.component';
import { TradeBrowseComponent } from './trade/trade-browse/trade-browse.component';
import { AcceptSendComponent } from './shared/components/accept-send/accept-send.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentRoomComponent } from './current-room/current-room.component';
import { EnterRoomComponent } from './enter-room/enter-room.component';
import { SettingsComponent } from './settings/settings.component';
import { PricecheckListComponent } from './pricecheck-list/pricecheck-list.component';

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
        path: 'trade/browse',
        component: TradeBrowseComponent
    },
    {
        path: 'trade/management',
        component: TradeManagementComponent
    },
    {
        path: 'trade/accept-send',
        component: AcceptSendComponent
    },
    {
        path: 'pricecheck-list',
        component: PricecheckListComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
