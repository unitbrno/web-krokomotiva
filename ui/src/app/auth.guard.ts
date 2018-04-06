import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AngularFireAuth, public router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return new Promise<boolean>((res, rej) => {
        this.auth.authState.subscribe((user) => {
          if (user) {
            return res(true);
          }
          this.router.navigate(['']);
          rej();
        })
      });
  }
}
