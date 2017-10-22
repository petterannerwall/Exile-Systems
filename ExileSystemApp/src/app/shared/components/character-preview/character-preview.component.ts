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
}
