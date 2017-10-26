import { NgModule } from '@angular/core';

import { AcceptSendComponent } from '../../components/accept-send/accept-send.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [AcceptSendComponent],
  declarations: [AcceptSendComponent]
})
export class AcceptSendModule { }
