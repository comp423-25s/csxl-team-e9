import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoworkingRoutingModule } from './coworking-routing.module';
import { CoworkingPageComponent } from './coworking-home/coworking-home.component';
import { AmbassadorPageComponent } from './ambassador-home/ambassador-home.component';
import { MatCardModule } from '@angular/material/card';
import { CoworkingReservationCard } from './widgets/coworking-reservation-card/coworking-reservation-card';
import { CoworkingDropInCard } from './widgets/dropin-availability-card/dropin-availability-card.widget';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ReservationComponent } from './reservation/reservation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NewReservationPageComponent } from './room-reservation/new-reservation-page/new-reservation-page.component';
import { RoomReservationWidgetComponent } from './widgets/room-reservation-table/room-reservation-table.widget';
import { ConfirmReservationComponent } from './room-reservation/confirm-reservation/confirm-reservation.component';
import { DateSelector } from './widgets/date-selector/date-selector.widget';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OperatingHoursDialog } from './widgets/operating-hours-dialog/operating-hours-dialog.widget';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AmbassadorXLComponent } from './ambassador-home/ambassador-xl/ambassador-xl.component';
import { AmbassadorRoomComponent } from './ambassador-home/ambassador-room/ambassador-room.component';
import { ReservationFactsWidget } from './widgets/reservation-facts/reservation-facts.widget';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InitialFormComponent } from './git-together/initial-form/initial-form.component';
import { GitTogetherPageComponent } from './git-together/git-together-page/git-together-page.component';
import { MatSliderModule } from '@angular/material/slider';
import { SpecificFormComponent } from './git-together/specific-form/specific-form.component';
import { GitTogetherMatchesComponent } from './git-together/matches/matches.component';
import { CourseSelectionComponent } from './git-together/course-selection/course-selection.component';
import { TeacherPairingsComponent } from './git-together/teacher-pairings/teacher-pairings.component';
import { TeacherPairingsMatchesComponent } from './git-together/teacher-pairings-matches/teacher-pairings-matches.component';
import { ConfirmDeleteDialog } from './git-together/teacher-pairings/confirm-delete-dialog.component';

@NgModule({
  declarations: [
    NewReservationPageComponent,
    RoomReservationWidgetComponent,
    CoworkingPageComponent,
    ReservationComponent,
    AmbassadorPageComponent,
    AmbassadorXLComponent,
    AmbassadorRoomComponent,
    CoworkingDropInCard,
    CoworkingReservationCard,
    ConfirmReservationComponent,
    DateSelector,
    OperatingHoursDialog,
    ReservationFactsWidget,
    GitTogetherPageComponent,
    InitialFormComponent,
    SpecificFormComponent,
    GitTogetherMatchesComponent,
    CourseSelectionComponent,
    TeacherPairingsComponent,
    TeacherPairingsMatchesComponent,
    ConfirmDeleteDialog
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CoworkingRoutingModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    MatCardModule,
    AsyncPipe,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule
  ]
})
export class CoworkingModule {}
