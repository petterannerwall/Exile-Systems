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
    console.log('[DEBUG trade-management.component.ts] Inviting', trade);
    this.robotService.sendCommandToPathofExile('+7invite ' + trade.player);
  }

  sold(trade) {
    this.robotService.sendCommandToPathofExile('@' + trade.player + ' Sorry, that item is already sold!');
    this.remove(trade);
  }
  remove(trade) {
    const index = this.tradeService.tradeList.indexOf(trade);
    this.tradeService.tradeList.splice(index, 1);
  }


}
