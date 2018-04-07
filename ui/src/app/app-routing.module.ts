import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PlatformComponent } from './platform/platform.component';
import { BoardComponent } from './platform/board/board.component';
import { NewTripComponent } from './platform/new-trip/new-trip.component';
import { TakeMeAnywhereComponent } from './platform/take-me-anywhere/take-me-anywhere.component';
import { AuthGuard } from './auth.guard';
import { MultiCityComponent } from './platform/multi-city/multi-city.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'app',
    component: PlatformComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new-trip',
        component: NewTripComponent,
      },
      {
        path: 'take-me',
        component: TakeMeAnywhereComponent,
      },
      {
        path: 'multi-city',
        component: MultiCityComponent,
      },
      {
        path: '**',
        component: BoardComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
