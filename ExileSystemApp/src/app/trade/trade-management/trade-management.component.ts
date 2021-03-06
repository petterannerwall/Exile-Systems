import { SettingService } from '../../shared/providers/setting.service';
import { IncomingTrade } from '../../shared/interfaces/incomming-trade.interface';
import { MessageTypeEnum } from '../../shared/enums/message-type.enum';
import { Message } from '../../shared/interfaces/message.interface';
import { LogParserService } from '../../shared/providers/log-parser.service';
import { PlayerService } from '../../shared/providers/player.service';
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
  private invitedPlayers = [];

  constructor(private robotService: RobotService, private tradeService: TradeService, private playerService: PlayerService,
    private logParser: LogParserService, private settingsService: SettingService) {

  }

  ngOnInit() {
  }

  invite(trade) {
    this.robotService.sendCommandToPathofExile('+7invite ' + trade.player);
    const index = this.tradeService.list.indexOf(trade);
    this.tradeService.list[index].invited = true;
  }

  sold(trade) {
    this.robotService.sendCommandToPathofExile('@' + trade.player + ' ' + this.settingsService.settings.trade.soldMessage);
    this.remove(trade);
  }
  remove(trade) {
    const index = this.tradeService.list.indexOf(trade);
    this.tradeService.list.splice(index, 1);
  }
  startTrade(trade) {
    this.robotService.sendCommandToPathofExile('/tradewith ' + trade.player);
  }
  thank(trade) {
    const index = this.tradeService.list.indexOf(trade);
    this.robotService.sendCommandToPathofExile('@' + trade.player + ' ' + this.settingsService.settings.trade.thankMessage);
    this.tradeService.list[index].thanked = true;
  }
  kick(trade) {
    this.robotService.sendCommandToPathofExile('/kick ' + trade.player);
    this.remove(trade);
  }
  map(trade) {
    this.robotService.sendCommandToPathofExile('@' + trade.player + ' ' + this.settingsService.settings.trade.mapMessage);
  }
}
