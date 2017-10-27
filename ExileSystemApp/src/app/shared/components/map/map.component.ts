import { ChannelService } from '../../providers/channel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  model = {
    acts: [
      {
        Name: 'Act 1',
        zones: [
          { Name: 'The Twilight Strand', Short: 'TS', Level: 1 },
          { Name: 'Lioneye\'s Watch', Short: 'Town', Level: 1 },
          { Name: 'The Coast', Short: 'TC', Level: 2 },
          { Name: 'The Tidal Island', Short: 'TI', Level: 3 },
          { Name: 'The Mud Flats', Short: 'MF', Level: 4 },
          { Name: 'The Fetid Pool', Short: 'FP', Level: 5 },
          { Name: 'The Submerged Passage', Short: 'SP', Level: 5 },
          { Name: 'The Flooded Depths', Short: 'FD', Level: 6 },
          { Name: 'The Ledge', Short: 'TL', Level: 6 },
          { Name: 'The Climb', Short: 'TC', Level: 7 },
          { Name: 'The Lower Prison', Short: 'LP', Level: 8 },
          { Name: 'The Upper Prison', Short: 'UP', Level: 9 },
          { Name: 'Prisoner\'s Gate', Short: 'PG', Level: 10 },
          { Name: 'The Ship Graveyard', Short: 'SG', Level: 11 },
          { Name: 'The Ship Graveyard Cave', Short: 'GC', Level: 12 },
          { Name: 'The Cavern of Wrath', Short: 'CW', Level: 12 },
          { Name: 'The Cavern of Anger', Short: 'CA', Level: 13 },
        ]
      },
      {
        Name: 'Act 2',
        zones: [
          { Name: 'The Southern Forest', Short: 'SF', Level: 13 },
          { Name: 'The Forest Encampment', Short: 'Town', Level: 1 },
          { Name: 'The Old Fields', Short: 'OF', Level: 14 },
          { Name: 'The Den', Short: 'TD', Level: 15 },
          { Name: 'The Riverways', Short: 'TR', Level: 15 },
          { Name: 'The Crossroads', Short: 'TC', Level: 15 },
          { Name: 'The Chamber of Sins Level 1', Short: 'CS1', Level: 15 },
          { Name: 'The Chamber of Sins Level 2', Short: 'CS2', Level: 16 },
          { Name: 'The Broken Bridge', Short: 'BB', Level: 16 },
          { Name: 'The Fellshrine Ruins', Short: 'FR', Level: 16 },
          { Name: 'The Crypt Level 1', Short: 'C1', Level: 17 },
          { Name: 'The Crypt Level 2', Short: 'C2', Level: 18 },
          { Name: 'The Western Forest', Short: 'WF', Level: 17 },
          { Name: 'The Weaver\'s Chambers', Short: 'WC', Level: 18 },
          { Name: 'The Wetlands', Short: 'TW', Level: 19 },
          { Name: 'The Vaal Ruins', Short: 'VR', Level: 20 },
          { Name: 'The Northern Forest', Short: 'NF', Level: 21 },
          { Name: 'The Dread Thicket', Short: 'DT', Level: 21 },
          { Name: 'The Caverns', Short: 'TC', Level: 22 },
          { Name: 'The Ancient Pyramid', Short: 'AP', Level: 23 }
        ]
      },
      {
        Name: 'Act 3',
        zones: [
          { Name: 'The City of Sarn', Short: 'CS', Level: 23 },
          { Name: 'The Sarn Encampment', Short: 'Town', Level: 1 },
          { Name: 'The Slums', Short: 'TS', Level: 24 },
          { Name: 'The Crematorium', Short: 'TC', Level: 25 },
          { Name: 'The Sewers', Short: 'TS', Level: 26 },
          { Name: 'The Marketplace', Short: 'TM', Level: 26 },
          { Name: 'The Catacombs', Short: 'TC', Level: 27 },
          { Name: 'The Battlefront', Short: 'TB', Level: 27 },
          { Name: 'The Solaris Temple Level 1', Short: 'ST1', Level: 27 },
          { Name: 'The Solaris Temple Level 2', Short: 'ST2', Level: 28 },
          { Name: 'The Docks', Short: 'TD', Level: 29 },
          { Name: 'The Ebony Barracks', Short: 'EB', Level: 29 },
          { Name: 'The Lunaris Temple Level 1', Short: 'LT1', Level: 29 },
          { Name: 'The Lunaris Temple Level 2', Short: 'LT2', Level: 30 },
          { Name: 'The Imperial Garden', Short: 'IG', Level: 30 },
          { Name: 'The Library', Short: 'TL', Level: 30 },
          { Name: 'The Archives', Short: 'TA', Level: 31 },
          { Name: 'The Hedge Maze', Short: 'HM', Level: 31 },
          { Name: 'The Sceptre of God', Short: 'SG', Level: 32 },
          { Name: 'The Upper Sceptre of God', Short: 'US', Level: 33 }
        ]
      },
      {
        Name: 'Other',
        zones: [
          { Name: 'Battle-scarred Hideout', Short: 'H', Level: 40 },
        ]
      }
    ]
  };

  constructor(private channelService: ChannelService) { }

  ngOnInit() {
  }

}
