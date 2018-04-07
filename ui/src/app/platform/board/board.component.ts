import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface Trip {
  uid: string;

}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  currentTrip: AngularFirestoreDocument<Trip>;

  timeline = [];
  lineIndex = 0;

  waypoints = [];
  destination: any;
  location$$: BehaviorSubject<GPSCoords> = new BehaviorSubject<GPSCoords>({ lng: 16.596908, lat: 49.226854 });

  constructor(public afAuth: AngularFireAuth, public router: Router, public db: AngularFirestore) { }

  ngOnInit() {
    let user = this.afAuth.auth.currentUser;

    this.currentTrip = this.db.doc<Trip>(`curtrip/${user.uid}`);

    this.currentTrip.snapshotChanges().subscribe(console.log);

    if (localStorage.getItem('trip')) {
      this.timeline = JSON.parse(localStorage.getItem('trip'));
      this.setWaypoints();
    }
  }

  next() {
    this.lineIndex++;
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }

  setWaypoints() {
    if (!this.timeline) {
      return;
    }
    this.waypoints = this.timeline.slice(0, this.timeline.length - 1)
      .map(item => {
        return {
          stopover: true,
          location: {
            placeId: item.placeID
          }
        };
      });
    this.destination = {
      placeId: this.timeline[this.timeline.length - 1].placeID
    };
}
