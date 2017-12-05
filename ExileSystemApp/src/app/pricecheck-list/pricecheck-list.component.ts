import { PricecheckService } from '../shared/providers/pricecheck.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricecheck-list',
  templateUrl: './pricecheck-list.component.html',
  styleUrls: ['./pricecheck-list.component.scss']
})
export class PricecheckListComponent implements OnInit, OnDestroy {
  constructor(private pricecheckService: PricecheckService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
