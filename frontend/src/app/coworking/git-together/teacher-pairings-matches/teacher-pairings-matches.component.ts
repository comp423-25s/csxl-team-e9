import { Component } from '@angular/core';
import { TeacherPairingsService } from './teacher-pairings-matches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teacher-pairings-matches',
  templateUrl: './teacher-pairings-matches.component.html',
  styleUrls: ['./teacher-pairings-matches.component.css']
})
export class TeacherPairingsMatchesComponent {
  selectedCourse: string = '';
  courseName: string = '';
  displayedColumns: string[] = ['pair', 'student1', 'student2'];
  matches: any[] = [];
  isLoading: boolean = false; // Set to false since we're using hardcoded data

  public static Route = {
    path: 'git-together/teacher-pairings/:course',
    title: 'GitTogether Pairings',
    component: TeacherPairingsMatchesComponent
  };

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private TPsvc: TeacherPairingsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.selectedCourse = params['course'] || 'COMP110';
      this.loadCourseName();
      this.loadHardcodedMatches(); // Use hardcoded data instead of API call
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

  loadHardcodedMatches() {
    // Hardcoded example matches
    this.matches = [
      {
        id: 1,
        student1: {
          pid: 12345678,
          name: 'Alex Johnson',
          contact: 'ajohnson@unc.edu'
        },
        student2: {
          pid: 87654321,
          name: 'Taylor Smith',
          contact: 'tsmith@unc.edu'
        }
      },
      {
        id: 2,
        student1: {
          pid: 23456789,
          name: 'Jordan Williams',
          contact: 'jwilliams@unc.edu'
        },
        student2: {
          pid: 98765432,
          name: 'Casey Brown',
          contact: 'cbrown@unc.edu'
        }
      },
      {
        id: 3,
        student1: {
          pid: 34567890,
          name: 'Riley Davis',
          contact: 'rdavis@unc.edu'
        },
        student2: {
          pid: 99876543,
          name: 'Morgan Miller',
          contact: 'mmiller@unc.edu'
        }
      }
    ];
  }

  // This would be used when you switch to real API calls
  async loadMatches() {
    try {
      this.isLoading = true;
      const data = await this.TPsvc.getTeacherCoursePairings(
        this.selectedCourse
      );
      this.matches = data.map((match: any) => ({
        id: match.id,
        student1: {
          pid: match.student1_pid,
          name: match.student1_name,
          contact: match.student1_contact
        },
        student2: {
          pid: match.student2_pid,
          name: match.student2_name,
          contact: match.student2_contact
        }
      }));
    } catch (error) {
      console.error('Error loading matches:', error);
      this.snackBar.open('Failed to load matches', 'Close', { duration: 3000 });
    } finally {
      this.isLoading = false;
    }
  }
}
