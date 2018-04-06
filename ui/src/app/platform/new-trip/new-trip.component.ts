import { Component, OnInit } from '@angular/core';

import { ApiClientService } from '../../../../api';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss']
})
export class NewTripComponent implements OnInit {

  categories = [
    {name: 'Theaters'},
    {name: 'Restaurants'},
    {name: 'Night Clubs'},
    {name: 'Bars'},
    {name: 'Parks'},
    {name: 'Coffee Shops'}
  ]

  constructor(public api: ApiClientService, public db: AngularFirestore) { }

  ngOnInit() {
    this.getLocation({ lng: 16.590935, lat: 49.222653 })
      .then((pos) => {
        this.api
          .gimmePlaces(1000, '', pos.lng, pos.lat, '', '', '')
          .subscribe(console.log);
      })
  }

  getLocation(def: { lat: number, lng: number }): Promise<any> {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          res({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.log('Error getting position:', err);
          res(def);
        },
        { timeout: 1500 }
      );
    })
  }

}
