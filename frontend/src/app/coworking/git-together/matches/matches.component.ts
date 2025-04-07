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
    ],
    COMP210: [
      {
        name: 'Sarah Miller',
        contact: 'smiller@unc.edu',
        score: 92,
        compatibility: {
          deadlineProximity: 5,
          workStyle: 4,
          leadershipComfort: 4,
          meetingFrequency: 5,
          conflictResolution: 4
        },
        bio: 'Looking for a study partner to work through data structures problems together.'
      }
    ],
    COMP283: [
      {
        name: 'David Chen',
        contact: 'dchen@unc.edu',
        score: 85,
        compatibility: {
          deadlineProximity: 3,
          workStyle: 5,
          leadershipComfort: 2,
          meetingFrequency: 3,
          conflictResolution: 4
        },
        bio: 'Math major who enjoys discrete structures and wants to form a study group.'
      }
    ],
    COMP426: [
      {
        name: 'Emma Wilson',
        contact: 'ewilson@unc.edu',
        score: 95,
        compatibility: {
          deadlineProximity: 5,
          workStyle: 5,
          leadershipComfort: 5,
          meetingFrequency: 5,
          conflictResolution: 5
        },
        bio: 'Web development enthusiast looking for a partner for the final project.'
      }
    ],
    COMP550: [
      {
        name: 'Michael Brown',
        contact: 'mbrown@unc.edu',
        score: 90,
        compatibility: {
          deadlineProximity: 4,
          workStyle: 5,
          leadershipComfort: 4,
          meetingFrequency: 4,
          conflictResolution: 3
        },
        bio: 'Wants to work through algorithm problems together and prepare for technical interviews.'
      }
    ],
    COMP562: [
      {
        name: 'Jessica Lee',
        contact: 'jlee@unc.edu',
        score: 93,
        compatibility: {
          deadlineProximity: 4,
          workStyle: 4,
          leadershipComfort: 3,
          meetingFrequency: 5,
          conflictResolution: 4
        },
        bio: 'Interested in forming a study group for machine learning concepts and assignments.'
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
      COMP110: 'Introduction to Programming and Data Science',
      COMP210: 'Data Structures and Analysis',
      COMP283: 'Discrete Structures',
      COMP426: 'Modern Web Programming',
      COMP550: 'Algorithms and Analysis',
      COMP562: 'Introduction to Machine Learning'
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
