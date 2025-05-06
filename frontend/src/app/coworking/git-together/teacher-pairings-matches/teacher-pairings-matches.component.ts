import { Component } from '@angular/core';
import { TeacherPairingsService } from './teacher-pairings-matches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

@Component({
  selector: 'app-teacher-pairings-matches',
  templateUrl: './teacher-pairings-matches.component.html',
  styleUrls: ['./teacher-pairings-matches.component.css']
})
export class TeacherPairingsMatchesComponent {
  selectedCourse: string = '';
  courseName: string = '';
  displayedColumns: string[] = [
    'pairNumber',
    'student1',
    'student2',
    'actions'
  ];
  matches: any[] = [];
  isLoading: boolean = true;
  pairings: { [key: number]: number } = {};

  public static Route = {
    path: 'git-together/teacher-pairings/:course',
    title: 'GitTogether Pairings',
    component: TeacherPairingsMatchesComponent
  };

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private TPsvc: TeacherPairingsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.selectedCourse = params['course'] || 'COMP110';
      this.loadCourseName();
      this.loadMatches();
    });
  }

  private loadCourseName() {
    const courseNames: { [key: string]: string } = {
      COMP110: 'Introduction to Programming and Data Science',
      COMP210: 'Data Structures and Algorithms',
      COMP401: 'Foundations of Programming'
    };
    this.courseName = courseNames[this.selectedCourse] || this.selectedCourse;
  }

  navigateToTeacherPairings() {
    this.router.navigate(['/coworking/git-together/teacher-pairings']);
  }

  loadMatches() {
    try {
      this.isLoading = true;
      this.TPsvc.getTeacherCoursePairings(this.selectedCourse).subscribe(
        (data) => {
          this.pairings = data;
        }
      );

      this.matches = [];
      const processedPairs = new Set<number>();
      let pairNumber = 1;

      for (const [pid1, pid2] of Object.entries(this.pairings)) {
        const numPid1 = Number(pid1);
        const numPid2 = Number(pid2);

        if (processedPairs.has(numPid1)) continue;

        this.matches.push({
          pairNumber: pairNumber++,
          pid1: numPid1,
          student1: `PID: ${numPid1}`,
          pid2: numPid2,
          student2: `PID: ${numPid2}`
        });

        processedPairs.add(numPid1);
        processedPairs.add(numPid2);
      }
    } catch (error) {
      console.error('Error loading matches:', error);
      this.snackBar.open('Failed to load pairings', 'Close', {
        duration: 3000
      });
      this.matches = [];
    } finally {
      this.isLoading = false;
    }
  }

  deleteAllMatches() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        message: `Are you sure you want to delete ALL pairings/submissions for ${this.selectedCourse}? This action cannot be undone.`
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        try {
          this.isLoading = true;
          this.TPsvc.deleteMatches(this.selectedCourse);
          this.snackBar.open('All matches deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadMatches();
        } catch (error) {
          console.error('Error deleting matches:', error);
          this.snackBar.open('Failed to delete matches', 'Close', {
            duration: 3000
          });
        } finally {
          this.isLoading = false;
        }
      }
    });
  }

  deleteSingleMatch(pid1: number, pid2: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        title: 'Delete Match',
        message:
          'Are you sure you want to delete this match? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        try {
          this.isLoading = true;
          this.TPsvc.deleteSingleMatch(this.selectedCourse, pid1, pid2);
          this.snackBar.open('Match deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadMatches();
        } catch (error) {
          console.error('Error deleting match:', error);
          this.snackBar.open('Failed to delete match', 'Close', {
            duration: 3000
          });
        } finally {
          this.isLoading = false;
        }
      }
    });
  }
}
