import { Router } from '@angular/router';
import { ElectronService } from '../shared/providers/electron.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = { accountName: '', characterName: ''};

  constructor(private electron: ElectronService, private router: Router) { }

  ngOnInit() {
    let rowCount = 10;
    this.electron.lineReader.eachLine('C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/client.txt', function (line, last) {
      console.log(line);
      rowCount--;
      if (rowCount === 0) {
        return false;
      }
    });
  }

  proceed() {
    // todo: save in settings
    this.router.navigate(['/enter-room']);
  }
}
