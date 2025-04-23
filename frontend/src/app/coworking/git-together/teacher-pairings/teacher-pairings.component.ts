import { Component, inject } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { Router } from '@angular/router';
import { availableClasses } from '../../coworking.models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialog } from './confirm-delete-dialog.component';
import { TeacherPairingsService } from '../teacher-pairings-matches/teacher-pairings-matches.service';

@Component({
  selector: 'app-teacher-pairings',
  templateUrl: './teacher-pairings.component.html',
  styleUrl: './teacher-pairings.component.css'
})
export class TeacherPairingsComponent {
  loading = false;
  selectedCourse: string = '';
  coursesToSelect = availableClasses;
  dialog = inject(MatDialog);

  async ngOnInit() {}

  public static Route = {
    path: 'git-together/teacher-pairings',
    title: 'GitTogether Pairings',
    component: TeacherPairingsComponent,
    resolve: {
      profile: profileResolver
    }
  };

  constructor(
    private router: Router,
    private TPsvc: TeacherPairingsService
  ) {}

  navigateToGitTogether() {
    this.router.navigate(['/coworking/git-together']);
  }

  navigateToCoworking() {
    this.router.navigate(['/coworking']);
  }

  viewCoursePairings() {
    this.router.navigate([
      '/coworking/git-together/teacher-pairings/:course',
      { course: this.selectedCourse }
    ]);
  }

  warnDeletePairings() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '300px',
      data: {
        message:
          'Are you sure you want to delete ALL pairings/submissions for ' +
          this.selectedCourse +
          '? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.TPsvc.deleteMatches(this.selectedCourse);
        console.log('Deleting Pairings');
      } else {
        console.log('Canceled');
      }
    });
  }
}
