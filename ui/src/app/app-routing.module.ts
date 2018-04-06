import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'board', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
