import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class GitTogetherMatchesComponent {
  public static Route = {
    path: 'git-together/matches/:course',
    title: 'GitTogether Matches',
    component: GitTogetherMatchesComponent
  };

  // Course-specific example matches
  courseMatches: { [key: string]: any[] } = {
    COMP110: [
      {
        name: 'Alex Johnson',
        contact: 'ajohnson@unc.edu',
        score: 88,
        compatibility: {
          deadlineProximity: 4,
          workStyle: 4,
          leadershipComfort: 3,
          meetingFrequency: 4,
          conflictResolution: 3
        },
        bio: 'First-year student excited about learning Python and data science basics.'
      }
    ]
  };

  matches: any[] = [];
  selectedCourse: string = '';
  courseName: string = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.selectedCourse = params['course'] || '';
      this.loadMatchesForCourse(this.selectedCourse);
    });
  }

  private loadMatchesForCourse(courseCode: string) {
    // Find the course name
    const courseNames: { [key: string]: string } = {
      COMP110: 'Introduction to Programming and Data Science'
    };

    this.courseName = courseNames[courseCode] || courseCode;

    // Load matches for this course or show default if none found
    this.matches = this.courseMatches[courseCode] || [
      {
        name: 'Thomas Sanders',
        contact: 'TS@unc.edu',
        score: 92,
        compatibility: {
          deadlineProximity: 4,
          workStyle: 5,
          leadershipComfort: 3,
          meetingFrequency: 5,
          conflictResolution: 4
        },
        bio: 'Looking for a study partner in this course.'
      }
    ];
  }

  navigateToCourseSelection() {
    this.router.navigate(['/coworking/git-together/course-selection']);
  }

  contactMatch(contactInfo: string) {
    this.snackBar.open(`Contacting ${contactInfo}...`, 'Close', {
      duration: 2000
    });
  }

  compatibilityItems(compatibility: any) {
    return Object.entries(compatibility).map(([key, value]) => ({
      label: key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase()),
      value: value as number
    }));
  }

  getProgressColor(value: number) {
    if (value >= 4) return 'primary';
    if (value >= 3) return 'accent';
    return 'warn';
  }
}
