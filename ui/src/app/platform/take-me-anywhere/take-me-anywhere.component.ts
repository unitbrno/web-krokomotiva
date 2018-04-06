import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/debounce';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiClientService, TripPlaces, TripPlace } from '../../../../api';

@Component({
  selector: 'app-take-me-anywhere',
  templateUrl: './take-me-anywhere.component.html',
  styleUrls: ['./take-me-anywhere.component.scss']
})
export class TakeMeAnywhereComponent implements OnInit {
  timeline = [];


  location$$: BehaviorSubject<GPSCoords> = new BehaviorSubject<GPSCoords>({ lng: 16.590935, lat: 49.222653 });
  radius$$: BehaviorSubject<number> = new BehaviorSubject<number>(1000);

  searchResult$: Observable<TripPlace[]>;

  constructor(public api: ApiClientService) { }

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
      console.log(data);
      this.timeline = data.sort(() => 0.5 - Math.random())
        .slice(0,4)
        .map(item => {
        return {
          name: item.name,
          duration: 7200,
        }

      })
    })
  }

  wrapItem(item: Object, index: number): Object {
    return {...item, index: index}
  }

  onItemDrop(e: any, id: number) {
    // Get the dropped data here
    // let old = this.timeline[id];
    // this.timeline[id] = e.dragData;
    // this.timeline[e.dragData.index] = old;
  }

}
