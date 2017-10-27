import { NgModule } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [MapComponent],
  declarations: [MapComponent]
})
export class MapModule { }
