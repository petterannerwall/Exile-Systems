import { ElectronService } from '../../providers/electron.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private electron: ElectronService) { }

  ngOnInit() {

    this.electron.lineReader.eachLine('C:/Users/vgk/documents/test.txt', function (line, last) {
      console.log(line);

      return false;
    });
  }
}
