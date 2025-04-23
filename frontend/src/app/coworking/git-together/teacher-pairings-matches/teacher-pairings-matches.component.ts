// // teacher-pairings-matches.component.ts
// import { Component } from '@angular/core';
// import { TeacherPairingsService } from './teacher-pairings-matches.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

// @Component({
//   selector: 'app-teacher-pairings-matches',
//   templateUrl: './teacher-pairings-matches.component.html',
//   styleUrls: ['./teacher-pairings-matches.component.css']
// })
// export class TeacherPairingsMatchesComponent {
//   selectedCourse: string = '';
//   courseName: string = '';
//   displayedColumns: string[] = [
//     'pairNumber',
//     'student1',
//     'student1Email',
//     'student2',
//     'student2Email',
//     'actions'
//   ];
//   matches: any[] = [];
//   isLoading: boolean = true;
//   pairings: { [key: number]: number } = {};
//   studentData: { [key: number]: any } = {};

//   public static Route = {
//     path: 'git-together/teacher-pairings/:course',
//     title: 'GitTogether Pairings',
//     component: TeacherPairingsMatchesComponent
//   };

//   constructor(
//     private router: Router,
//     private snackBar: MatSnackBar,
//     private TPsvc: TeacherPairingsService,
//     private route: ActivatedRoute,
//     private dialog: MatDialog
//   ) {
//     this.route.params.subscribe((params) => {
//       this.selectedCourse = params['course'] || 'COMP110';
//       this.loadCourseName();
//       this.loadMatches();
//     });
//   }

//   private loadCourseName() {
//     const courseNames: { [key: string]: string } = {
//       COMP110: 'Introduction to Programming and Data Science',
//       COMP210: 'Data Structures and Algorithms',
//       COMP401: 'Foundations of Programming'
//     };
//     this.courseName = courseNames[this.selectedCourse] || this.selectedCourse;
//   }

//   navigateToTeacherPairings() {
//     this.router.navigate(['/coworking/git-together/teacher-pairings']);
//   }

//   async loadMatches() {
//     try {
//       this.isLoading = true;
//       // First get the pairings
//       this.pairings = await this.TPsvc.getTeacherCoursePairings(
//         this.selectedCourse
//       );

//       // Then get all students in the class
//       const allStudents = await this.TPsvc.getAllStudentsInClass(
//         this.selectedCourse
//       );

//       // Create a map of student data by PID
//       this.studentData = {};
//       allStudents.forEach((student: any) => {
//         this.studentData[student.pid] = student;
//       });

//       // Process the pairings into matches array
//       this.matches = [];
//       const processedPairs = new Set<number>();
//       let pairNumber = 1;

//       for (const [pid1, pid2] of Object.entries(this.pairings)) {
//         const numPid1 = Number(pid1);
//         const numPid2 = Number(pid2);

//         // Skip if we've already processed this pair
//         if (processedPairs.has(numPid1) || processedPairs.has(numPid2))
//           continue;

//         const student1 = this.studentData[numPid1];
//         const student2 = this.studentData[numPid2];

//         if (student1 && student2) {
//           this.matches.push({
//             pairNumber: pairNumber++,
//             pid1: numPid1,
//             student1Name: `${student1.first_name} (${numPid1})`,
//             student1Email: student1.contact_information || 'No email',
//             pid2: numPid2,
//             student2Name: `${student2.first_name} (${numPid2})`,
//             student2Email: student2.contact_information || 'No email'
//           });

//           processedPairs.add(numPid1);
//           processedPairs.add(numPid2);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading matches:', error);
//       this.snackBar.open('Failed to load pairings', 'Close', {
//         duration: 3000
//       });
//       this.matches = [];
//     } finally {
//       this.isLoading = false;
//     }
//   }

//   async deleteAllMatches() {
//     const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
//       data: {
//         title: 'Delete All Matches',
//         message: `Are you sure you want to delete ALL matches for ${this.courseName}? This action cannot be undone.`
//       }
//     });

//     dialogRef.afterClosed().subscribe(async (result) => {
//       if (result) {
//         try {
//           this.isLoading = true;
//           await this.TPsvc.deleteMatches(this.selectedCourse);
//           this.snackBar.open('All matches deleted successfully', 'Close', {
//             duration: 3000
//           });
//           this.loadMatches(); // Refresh the list
//         } catch (error) {
//           console.error('Error deleting matches:', error);
//           this.snackBar.open('Failed to delete matches', 'Close', {
//             duration: 3000
//           });
//         } finally {
//           this.isLoading = false;
//         }
//       }
//     });
//   }

//   async deleteSingleMatch(pid1: number, pid2: number) {
//     const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
//       data: {
//         title: 'Delete Match',
//         message:
//           'Are you sure you want to delete this match? This action cannot be undone.'
//       }
//     });

//     dialogRef.afterClosed().subscribe(async (result) => {
//       if (result) {
//         try {
//           this.isLoading = true;
//           // Delete both pairings (A->B and B->A)
//           await this.TPsvc.deleteSingleMatch(this.selectedCourse, pid1);
//           await this.TPsvc.deleteSingleMatch(this.selectedCourse, pid2);
//           this.snackBar.open('Match deleted successfully', 'Close', {
//             duration: 3000
//           });
//           this.loadMatches(); // Refresh the list
//         } catch (error) {
//           console.error('Error deleting match:', error);
//           this.snackBar.open('Failed to delete match', 'Close', {
//             duration: 3000
//           });
//         } finally {
//           this.isLoading = false;
//         }
//       }
//     });
//   }
// }

// teacher-pairings-matches.component.ts
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

  async loadMatches() {
    try {
      this.isLoading = true;
      // Get the pairings (just PIDs)
      this.pairings = await this.TPsvc.getTeacherCoursePairings(
        this.selectedCourse
      );

      // Process the pairings into matches array
      this.matches = [];
      const processedPairs = new Set<number>();
      let pairNumber = 1;

      for (const [pid1, pid2] of Object.entries(this.pairings)) {
        const numPid1 = Number(pid1);
        const numPid2 = Number(pid2);

        // Skip if we've already processed this pair
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

  async deleteAllMatches() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        title: 'Delete All Matches',
        message: `Are you sure you want to delete ALL matches for ${this.courseName}? This action cannot be undone.`
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          this.isLoading = true;
          await this.TPsvc.deleteMatches(this.selectedCourse);
          this.snackBar.open('All matches deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadMatches(); // Refresh the list
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

  async deleteSingleMatch(pid1: number, pid2: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        title: 'Delete Match',
        message:
          'Are you sure you want to delete this match? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          this.isLoading = true;
          // Delete both pairings (A->B and B->A)
          await this.TPsvc.deleteSingleMatch(this.selectedCourse, pid1);
          await this.TPsvc.deleteSingleMatch(this.selectedCourse, pid2);
          this.snackBar.open('Match deleted successfully', 'Close', {
            duration: 3000
          });
          this.loadMatches(); // Refresh the list
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
