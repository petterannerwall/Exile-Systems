import { Component, OnInit } from '@angular/core';
import { RobotService } from 'app/shared/providers/robot.service';
import { TradeService } from 'app/shared/providers/trade.service';

@Component({
  selector: 'app-trade-management',
  templateUrl: './trade-management.component.html',
  styleUrls: ['./trade-management.component.scss']
})
export class TradeManagementComponent implements OnInit {

  keyboard = this.robotService.robot.Keyboard();

  constructor(private robotService: RobotService, private tradeService: TradeService) {
  }

  ngOnInit() {
  }

  invite(trade) {
    console.log('Inviting', trade);
    this.robotService.sendCommandToPathofExile('/invite ' + trade.player);
  }

  sold(trade) {
    console.log('sold', trade);
  }
  remove(trade) {
    console.log('removing', trade);
  }


}
