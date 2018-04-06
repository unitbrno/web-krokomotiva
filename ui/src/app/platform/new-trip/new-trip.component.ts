import { Component, OnInit } from '@angular/core';

import { ApiClientService, TripPlaces, TripPlace } from '../../../../api';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Local } from 'protractor/built/driverProviders';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/debounce';
import { timer } from 'rxjs/observable/timer';


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

  radius = 1000;

  categories = [
    { name: 'Theaters', img: 'assets/categories/theaters.jpg', select: false, id: 'art_gallery' },
    { name: 'Restaurants', img: 'assets/categories/restaurants.jpg', select: false, id: 'restaurant' },
    { name: 'Night Clubs', img: 'assets/categories/night-clubs.jpg', select: false, id: 'night_club' },
    { name: 'Bars', img: 'assets/categories/bars.jpg', select: false, id: 'bar' },
    { name: 'Parks', img: 'assets/categories/parks.jpg', select: false, id: 'park' },
    { name: 'Coffee Shops', img: 'assets/categories/coffee-shops.jpg', select: false, id: 'cafe' }
  ]

  selectedCategory: any;

  category$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  location$$: BehaviorSubject<Location> = new BehaviorSubject<Location>({ lng: 16.590935, lat: 49.222653 });
  radius$$: BehaviorSubject<number> = new BehaviorSubject<number>(1000);

  searchResult$: Observable<TripPlace[]>;

  timeline = [
    {name: 'Start of your journey', duration: 600},
  ];

  constructor(public api: ApiClientService, public db: AngularFirestore) { }
  onItemDrop(e: any, id: number) {
    // Get the dropped data here
    let old = this.timeline[id];
    this.timeline[id] = e.dragData;
    this.timeline[e.dragData.index] = old;
  }

  ngOnInit() {
    this.searchResult$ = combineLatest(
      this.category$$.asObservable(),
      this.location$$.asObservable(),
      this.radius$$.asObservable(),
    ).switchMap((data) => {
      return this.api
        .gimmePlaces(data[2], data[0], data[1].lng, data[1].lat, '', '', '')
        .map(d => d.places);
    })
  }

  wrapItem(item: Object, index: number): Object {
    return {...item, index: index}
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

  setRadius(ev) {
    this.radius$$.next(ev);
  }

  addToTimeline(ev) {
    this.timeline.push({
      name: ev.name,
      duration: 7200
    });
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
