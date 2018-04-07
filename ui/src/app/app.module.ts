import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {MatButtonModule, MatCheckboxModule, MatCardModule, MatMenuModule,
  MatAutocompleteModule, MatInputModule, MatToolbarModule, MatListModule,
  MatIconModule, MatProgressBarModule, MatChipsModule, MatExpansionModule,
  MatSelectModule, MatSliderModule, MatDatepickerModule, MatStepperModule
} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import {FlexLayoutModule} from "@angular/flex-layout";

import { LandingComponent } from './landing/landing.component';
import { PlatformComponent } from './platform/platform.component';
import { BoardComponent } from './platform/board/board.component';
import { NewTripComponent } from './platform/new-trip/new-trip.component';
import { TakeMeAnywhereComponent } from './platform/take-me-anywhere/take-me-anywhere.component';

import { ApiClientService } from '../../api';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { NgDragDropModule } from 'ng-drag-drop';
import { AuthGuard } from './auth.guard';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import ClientConfig = gapi.auth2.ClientConfig;
import { GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';

let gapiClientConfig: ClientConfig = {
  client_id: "130236556639-otlovsrbfq8juamhjsh9d1ji9s5l71ml.apps.googleusercontent.com",
  scope: [
    "https://www.googleapis.com/auth/calendar"
  ].join(" ")
};

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
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,

    FlexLayoutModule,

    HttpClientModule,

    MomentModule,
    NgDragDropModule.forRoot(),

    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCC1XATKvXz1ovFsekTraFuRi3Vinh_f18',
    }),
    AgmDirectionModule,

    MatButtonModule, MatCheckboxModule, MatCardModule, MatAutocompleteModule,
    MatMenuModule, MatInputModule, MatToolbarModule, MatListModule,
    MatIconModule, MatProgressBarModule, MatChipsModule, MatExpansionModule,
    MatSelectModule, MatSliderModule, MatDatepickerModule, MatStepperModule,
  ],
  providers: [
    ApiClientService,
    {
      provide: 'domain',
      useValue: 'https://apikkmtv.flowup.cz'
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
