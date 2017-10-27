import { Item } from '../../interfaces/item.interface';
import { Character } from '../../interfaces/character.interface';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-preview',
  templateUrl: './character-preview.component.html',
  styleUrls: ['./character-preview.component.scss']
})

export class CharacterPreviewComponent implements OnInit {
  @Input() character: Character;

  constructor() {
  }

  ngOnInit() {
  }

  getItemByType(type) {
    return this.character.items.find(x => x.inventoryId === type);
  }
  getFlaskByIndex(index) {
    return this.character.items.find(x => x.inventoryId === 'Flask' && x.x === index)
  }

  openInventory() {
    console.log('todo: open inventory');
  }
}
