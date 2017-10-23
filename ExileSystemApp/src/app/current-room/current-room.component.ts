import { ChannelService } from '../shared/providers/channel.service';
import { LogParserService } from '../shared/providers/log-parser.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MaterializeAction } from 'angular2-materialize';
import { getGuid } from '../shared/helpers/object.helper';

@Component({
  templateUrl: './current-room.component.html',
  styleUrls: ['./current-room.component.scss']
})
export class CurrentRoomComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();
  constructor(private logParserService: LogParserService, private channelService: ChannelService) { }
  ngOnInit() {
  }
  openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }
  createGuid() {
    return getGuid();
  }
}



