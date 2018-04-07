import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/debounce';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiClientService, TripPlaces, TripPlace } from '../../../../api';
import { TripDirections } from '../../../../api/models/trip-directions.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-me-anywhere',
  templateUrl: './take-me-anywhere.component.html',
  styleUrls: ['./take-me-anywhere.component.scss']
})
export class TakeMeAnywhereComponent implements OnInit {
  timeline = [];


  location$$: BehaviorSubject<GPSCoords> = new BehaviorSubject<GPSCoords>({ lng: 16.596908, lat: 49.226854 });
  radius$$: BehaviorSubject<number> = new BehaviorSubject<number>(1000);

  searchResult$: Observable<TripPlace[]>;

  constructor(public api: ApiClientService, public router: Router) { }
  waypoints = [];
  destination: any;


  ngOnInit() {
    this.searchResult$ = combineLatest(
      this.location$$.asObservable(),
      this.radius$$.asObservable(),
    ).switchMap((data) => {
      return this.api
        .gimmePlaces(data[1], '', data[0].lng, data[0].lat, '', '', '')
        .map(d => d.places);
    });

    this.searchResult$.subscribe(data => {
      this.timeline = data.sort(() => 0.5 - Math.random())
        .slice(0,4)
        .map(item => {
        return {
          name: item.name,
          lat: item.lat,
          lng: item.lng,
          placeID: item.placeID,
          duration: 7200,
        };
      });
      this.setWaypoints();

    })
  }

  startTrip() {
    localStorage.setItem('trip', JSON.stringify(this.timeline));
    this.router.navigate(['app']);
  }

  wrapItem(item: Object, index: number): Object {
    return {...item, index: index}
  }

  recalculateTransit() {
    this.location$$.subscribe(location => {
      let locations = [location.lat + "," + location.lng];
      locations = locations.concat(this.timeline.map(item => "place_id:" + item.placeID));
      this.api.getDirections({
        locations: locations,
        departureTime: null, mode: 'transit'})
        .subscribe((data: TripDirections) => {
          data.directions.forEach((item, i) => {
            this.timeline[i].transitToNext = +item.duration;
          });
        })
    })
  }

  setWaypoints() {
    if (!this.timeline) {
      return
    }
    this.waypoints = this.timeline.slice(0, this.timeline.length - 1)
      .map(item => {
        return {
          stopover: true,
          location: {
            placeId: item.placeID
          }
        }
      });
    this.destination = {
      placeId: this.timeline[this.timeline.length - 1].placeID
    }
  }

  onItemDrop(e: any, id: number) {
    // Get the dropped data here
    // let old = this.timeline[id];
    // this.timeline[id] = e.dragData;
    // this.timeline[e.dragData.index] = old;
  }

}
