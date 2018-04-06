import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LandingComponent } from './landing/landing.component';
import { PlatformComponent } from './platform/platform.component';
import { BoardComponent } from './platform/board/board.component';
import { NewTripComponent } from './platform/new-trip/new-trip.component';
import { TakeMeAnywhereComponent } from './platform/take-me-anywhere/take-me-anywhere.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PlatformComponent,
    BoardComponent,
    NewTripComponent,
    TakeMeAnywhereComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
