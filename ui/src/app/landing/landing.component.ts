import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  provider = new firebase.auth.GoogleAuthProvider();

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.provider.addScope("https://www.googleapis.com/auth/calendar");
  }

  ngOnInit() {
  }

  public login() {
    this.afAuth
      .auth
      .signInWithPopup(this.provider)
      .then((result) => {
        sessionStorage.setItem("GTOKEN", result.credential.accessToken);
        this.router.navigate(['app'])
      })
  }
}
