import { Component, OnInit } from '@angular/core';

import { ApiClientService, TripPlaces, TripPlace } from '../../../../api';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Local } from 'protractor/built/driverProviders';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

interface Location {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss']
})
export class NewTripComponent implements OnInit {

  categories = [
    { name: 'Theaters', img: 'assets/categories/theaters.jpg', select: false, id: '' },
    { name: 'Restaurants', img: 'assets/categories/restaurants.jpg', select: false, id: '' },
    { name: 'Night Clubs', img: 'assets/categories/night-clubs.jpg', select: false, id: '' },
    { name: 'Bars', img: 'assets/categories/bars.jpg', select: false, id: '' },
    { name: 'Parks', img: 'assets/categories/parks.jpg', select: false, id: '' },
    { name: 'Coffee Shops', img: 'assets/categories/coffee-shops.jpg', select: false, id: '' }
  ]

  selectedCategory: any;

  category$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  location$$: BehaviorSubject<Location> = new BehaviorSubject<Location>({ lng: 16.590935, lat: 49.222653 });

  searchResult$: Observable<TripPlace[]>;

  constructor(public api: ApiClientService, public db: AngularFirestore) { }

  ngOnInit() {
    this.searchResult$ = combineLatest(
      this.category$$.asObservable(),
      this.location$$.asObservable(),
    ).switchMap((data) => {
      return this.api
        .gimmePlaces(1000, data[0], data[1].lng, data[1].lat, '', '', '')
        .map(d => d.places);
    })
  }

  getLocation(): Promise<any> {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          res({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          rej();
        },
        { timeout: 1500 }
      );
    })
  }

  selectCategory(category) {
    if (this.selectedCategory !== undefined) {
      this.selectedCategory.select = false;
    }
    category.select = true;
    this.selectedCategory = category;

    this.category$$.next(category.id);
  }

}
