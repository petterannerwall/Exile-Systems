import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-enter-room',
  templateUrl: './enter-room.component.html',
  styleUrls: ['./enter-room.component.scss']
})
export class EnterRoomComponent implements OnInit {
  model = { roomCode: '' };
  constructor(private router: Router) { }

  ngOnInit() {
  }

  enter() {
    // todo: enter room
    this.router.navigate(['/current-room']);
  }

  create() {
    // todo: generate new room
    this.router.navigate(['/current-room']);
  }

  back() {
    // todo: generate new room
    this.router.navigate(['/login']);
  }
}
