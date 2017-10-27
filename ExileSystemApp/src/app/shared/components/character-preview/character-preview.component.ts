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

  weapon: Item;
  helm: Item;
  offhand: Item;
  amulet: Item;
  gloves: Item;
  bodyArmour: Item;
  boots: Item;
  ring: Item;
  belt: Item;
  ring2: Item;
  flask: Item;
  flask2: Item;
  flask3: Item;
  flask4: Item;
  flask5: Item;

  constructor() {
  }

  ngOnInit() {
    this.weapon = this.character.items.find(x => x.inventoryId === 'Weapon');
    this.helm = this.character.items.find(x => x.inventoryId === 'Helm');
    this.offhand = this.character.items.find(x => x.inventoryId === 'Offhand');
    this.amulet = this.character.items.find(x => x.inventoryId === 'Amulet');
    this.gloves = this.character.items.find(x => x.inventoryId === 'Gloves');
    this.bodyArmour = this.character.items.find(x => x.inventoryId === 'BodyArmour');
    this.boots = this.character.items.find(x => x.inventoryId === 'Boots');
    this.ring = this.character.items.find(x => x.inventoryId === 'Ring');
    this.belt = this.character.items.find(x => x.inventoryId === 'Belt');
    this.ring2 = this.character.items.find(x => x.inventoryId === 'Ring2');
    this.flask = this.character.items.find(x => x.inventoryId === 'Flask' && x.x === 0);
    this.flask2 = this.character.items.find(x => x.inventoryId === 'Flask' && x.x === 1);
    this.flask3 = this.character.items.find(x => x.inventoryId === 'Flask' && x.x === 2);
    this.flask4 = this.character.items.find(x => x.inventoryId === 'Flask' && x.x === 3);
    this.flask5 = this.character.items.find(x => x.inventoryId === 'Flask' && x.x === 4);
  }

  getItemByType(type) {
    return this.character.items.find(x => x.inventoryId === type);
  }

  openInventory() {
    console.log('todo: open inventory');
  }
}
