import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoworkingPageComponent } from './coworking-home/coworking-home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NewReservationPageComponent } from './room-reservation/new-reservation-page/new-reservation-page.component';
import { ConfirmReservationComponent } from './room-reservation/confirm-reservation/confirm-reservation.component';
import { GitTogetherPageComponent } from './git-together/git-together-page/git-together-page.component';
import { InitialFormComponent } from './git-together/initial-form/initial-form.component';
import { PrefFormSubmittedComponent } from './git-together/pref-form-submitted/pref-form-submitted.component';

const routes: Routes = [
  CoworkingPageComponent.Route,
  ReservationComponent.Route,
  NewReservationPageComponent.Route,
  ConfirmReservationComponent.Route,
  GitTogetherPageComponent.Route,
  InitialFormComponent.Route,
  PrefFormSubmittedComponent.Route,
  {
    path: 'ambassador',
    title: 'Ambassador',
    loadChildren: () =>
      import('./ambassador-home/ambassador-home.module').then(
        (m) => m.AmbassadorHomeModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoworkingRoutingModule {}
