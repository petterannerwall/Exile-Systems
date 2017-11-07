import { forEach } from '@angular/router/src/utils/collection';
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
          { Name: 'The Twilight Strand', Short: 'TS', Level: 1, Players: [] },
          { Name: 'Lioneye\'s Watch', Short: 'Town', Level: 1, Players: [] },
          { Name: 'The Coast', Short: 'TC', Level: 2, Players: [] },
          { Name: 'The Tidal Island', Short: 'TI', Level: 3, Players: [] },
          { Name: 'The Mud Flats', Short: 'MF', Level: 4, Players: [] },
          { Name: 'The Fetid Pool', Short: 'FP', Level: 5, Players: [] },
          { Name: 'The Submerged Passage', Short: 'SP', Level: 5, Players: [] },
          { Name: 'The Flooded Depths', Short: 'FD', Level: 6, Players: [] },
          { Name: 'The Ledge', Short: 'TL', Level: 6, Players: [] },
          { Name: 'The Climb', Short: 'TC', Level: 7, Players: [] },
          { Name: 'The Lower Prison', Short: 'LP', Level: 8, Players: [] },
          { Name: 'The Upper Prison', Short: 'UP', Level: 9, Players: [] },
          { Name: 'Prisoner\'s Gate', Short: 'PG', Level: 10, Players: [] },
          { Name: 'The Ship Graveyard', Short: 'SG', Level: 11, Players: [] },
          { Name: 'The Ship Graveyard Cave', Short: 'GC', Level: 12, Players: [] },
          { Name: 'The Cavern of Wrath', Short: 'CW', Level: 12, Players: [] },
          { Name: 'The Cavern of Anger', Short: 'CA', Level: 13, Players: [] },
        ]
      },
      {
        Name: 'Act 2',
        zones: [
          { Name: 'The Southern Forest', Short: 'SF', Level: 13, Players: [] },
          { Name: 'The Forest Encampment', Short: 'Town', Level: 1, Players: [] },
          { Name: 'The Old Fields', Short: 'OF', Level: 14, Players: [] },
          { Name: 'The Den', Short: 'TD', Level: 15, Players: [] },
          { Name: 'The Riverways', Short: 'TR', Level: 15, Players: [] },
          { Name: 'The Crossroads', Short: 'TC', Level: 15, Players: [] },
          { Name: 'The Chamber of Sins Level 1', Short: 'CS1', Level: 15, Players: [] },
          { Name: 'The Chamber of Sins Level 2', Short: 'CS2', Level: 16, Players: [] },
          { Name: 'The Broken Bridge', Short: 'BB', Level: 16, Players: [] },
          { Name: 'The Fellshrine Ruins', Short: 'FR', Level: 16, Players: [] },
          { Name: 'The Crypt Level 1', Short: 'C1', Level: 17, Players: [] },
          { Name: 'The Crypt Level 2', Short: 'C2', Level: 18, Players: [] },
          { Name: 'The Western Forest', Short: 'WF', Level: 17, Players: [] },
          { Name: 'The Weaver\'s Chambers', Short: 'WC', Level: 18, Players: [] },
          { Name: 'The Wetlands', Short: 'TW', Level: 19, Players: [] },
          { Name: 'The Vaal Ruins', Short: 'VR', Level: 20, Players: [] },
          { Name: 'The Northern Forest', Short: 'NF', Level: 21, Players: [] },
          { Name: 'The Dread Thicket', Short: 'DT', Level: 21, Players: [] },
          { Name: 'The Caverns', Short: 'TC', Level: 22, Players: [] },
          { Name: 'The Ancient Pyramid', Short: 'AP', Level: 23, Players: [] }
        ]
      },
      {
        Name: 'Act 3',
        zones: [
          { Name: 'The City of Sarn', Short: 'CS', Level: 23, Players: [] },
          { Name: 'The Sarn Encampment', Short: 'Town', Level: 1, Players: [] },
          { Name: 'The Slums', Short: 'TS', Level: 24, Players: [] },
          { Name: 'The Crematorium', Short: 'TC', Level: 25, Players: [] },
          { Name: 'The Sewers', Short: 'TS', Level: 26, Players: [] },
          { Name: 'The Marketplace', Short: 'TM', Level: 26, Players: [] },
          { Name: 'The Catacombs', Short: 'TC', Level: 27, Players: [] },
          { Name: 'The Battlefront', Short: 'TB', Level: 27, Players: [] },
          { Name: 'The Solaris Temple Level 1', Short: 'ST1', Level: 27, Players: [] },
          { Name: 'The Solaris Temple Level 2', Short: 'ST2', Level: 28, Players: [] },
          { Name: 'The Docks', Short: 'TD', Level: 29, Players: [] },
          { Name: 'The Ebony Barracks', Short: 'EB', Level: 29, Players: [] },
          { Name: 'The Lunaris Temple Level 1', Short: 'LT1', Level: 29, Players: [] },
          { Name: 'The Lunaris Temple Level 2', Short: 'LT2', Level: 30, Players: [] },
          { Name: 'The Imperial Garden', Short: 'IG', Level: 30, Players: [] },
          { Name: 'The Library', Short: 'TL', Level: 30, Players: [] },
          { Name: 'The Archives', Short: 'TA', Level: 31, Players: [] },
          { Name: 'The Hedge Maze', Short: 'HM', Level: 31, Players: [] },
          { Name: 'The Sceptre of God', Short: 'SG', Level: 32, Players: [] },
          { Name: 'The Upper Sceptre of God', Short: 'US', Level: 33, Players: [] }
        ]
      },
      {
        Name: 'Other',
        zones: [
          { Name: 'Battle-scarred Hideout', Short: 'H', Level: 40, Players: [] },
        ]
      }
    ]
  };

  constructor(private channelService: ChannelService) {
    this.channelService.ChannelUpdated.subscribe(() => {
      console.log('channel updated');
      this.channelService.channel.players.forEach((player) => {
        for (let i = 0; i < this.model.acts.length; i++) {
          const act = this.model.acts[i];
          for (let j = 0; j < act.zones.length; j++) {
            const zone = act.zones[j];
            const index = zone.Players.findIndex( p => p.character.name === player.character.name )
            if (index > -1) {
              zone.Players.splice(index, 1);
            }
            if (zone.Name === player.area) {
              zone.Players.push(player);
            }
          }
        }
      });
    });

  }

  ngOnInit() {
  }

}
