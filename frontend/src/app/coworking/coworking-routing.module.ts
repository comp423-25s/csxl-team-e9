import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoworkingPageComponent } from './coworking-home/coworking-home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NewReservationPageComponent } from './room-reservation/new-reservation-page/new-reservation-page.component';
import { ConfirmReservationComponent } from './room-reservation/confirm-reservation/confirm-reservation.component';
import { GitTogetherPageComponent } from './git-together/git-together-page/git-together-page.component';
import { InitialFormComponent } from './git-together/initial-form/initial-form.component';
import { SpecificFormComponent } from './git-together/specific-form/specific-form.component';
import { GitTogetherMatchesComponent } from './git-together/matches/matches.component'; // Add this import
import { CourseSelectionComponent } from './git-together/course-selection/course-selection.component';

const routes: Routes = [
  CoworkingPageComponent.Route,
  ReservationComponent.Route,
  NewReservationPageComponent.Route,
  ConfirmReservationComponent.Route,
  GitTogetherPageComponent.Route,
  InitialFormComponent.Route,
  SpecificFormComponent.Route,
  GitTogetherMatchesComponent.Route, // Add this route
  CourseSelectionComponent.Route,
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
