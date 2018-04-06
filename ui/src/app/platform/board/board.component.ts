import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

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

  constructor(public afAuth: AngularFireAuth, public router: Router, public db: AngularFirestore) { }

  ngOnInit() {
    let user = this.afAuth.auth.currentUser;

    this.currentTrip = this.db.doc<Trip>(`curtrip/${user.uid}`);

    this.currentTrip.snapshotChanges().subscribe(console.log);
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }

}
