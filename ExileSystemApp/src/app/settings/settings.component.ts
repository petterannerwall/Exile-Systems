import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  model = { accountName: '', characterName: '' };
  constructor() { }
  ngOnInit() {
  }
  save() {
    // todo: save settings
  }
}
