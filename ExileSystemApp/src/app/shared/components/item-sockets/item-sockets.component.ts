import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-sockets',
  templateUrl: './item-sockets.component.html',
  styleUrls: ['./item-sockets.component.scss']
})
export class ItemSocketsComponent implements OnInit {
  @Input() sockets: Array<any>;
  @Input() columns: number;
  constructor() { }
  ngOnInit() {
    console.log(this.sockets);
  }
}
