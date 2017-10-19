import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
@Injectable()
export class ExternalService {
  public url: 'https://www.pathofexile.com/character-window/get-items';
  constructor(private http: HttpClient) {
  }

  getCharacter(account, character) {
    const parameters = `?accountName=${account}&character=${character}`;
    const test = { accountName: account, character: character };
    const headers = new HttpHeaders();

    this.http.get('https://www.pathofexile.com/character-window/get-items' + parameters).subscribe(data => {
      console.log(data);
    });
  }
}
