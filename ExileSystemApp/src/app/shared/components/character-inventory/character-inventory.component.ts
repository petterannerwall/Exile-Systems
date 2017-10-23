import { Character } from '../../interfaces/character.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-inventory',
  templateUrl: './character-inventory.component.html',
  styleUrls: ['./character-inventory.component.scss']
})

export class CharacterInventoryComponent implements OnInit {
  @Input() character: Character;
  constructor() {
  }

  ngOnInit() {
  }
}
