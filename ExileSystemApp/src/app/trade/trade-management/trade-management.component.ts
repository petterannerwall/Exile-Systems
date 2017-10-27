import { Component, OnInit } from '@angular/core';
import { RobotService } from 'app/shared/providers/robot.service';

@Component({
  selector: 'app-trade-management',
  templateUrl: './trade-management.component.html',
  styleUrls: ['./trade-management.component.scss']
})
export class TradeManagementComponent implements OnInit {
  constructor(private robotService: RobotService) {



  }

  ngOnInit() {
  }
}
