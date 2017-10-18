import { SignalR } from 'ng2-signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class SignalRService {
  connection: any;
  constructor(private signalR: SignalR) {
    console.log('signalrservice');
    const conx = this.signalR.createConnection();
    conx.start().then((c) => {
      this.connection = c;

      // testing
      return this.connection.invoke('Broadcast', 'testing').then((data) => {
        return data;
      }).catch(error => console.log(error));

      // todo: subscribe to events
    });
  }
}
