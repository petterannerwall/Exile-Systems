import { MapComponent } from './map/map.component';
import { SettingsComponent } from './settings/settings.component';
import { CurrentRoomComponent } from './current-room/current-room.component';
import { EnterRoomComponent } from './enter-room/enter-room.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        path: 'map',
        component: MapComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
