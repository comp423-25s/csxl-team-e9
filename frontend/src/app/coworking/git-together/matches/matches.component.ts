import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from './matches-service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class GitTogetherMatchesComponent {
  profile: Profile;
  course: String;
  public static Route = {
    path: 'git-together/matches/:course',
    title: 'GitTogether Matches',
    component: GitTogetherMatchesComponent,
    resolve: {
      profile: profileResolver
    }
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
    private matchService: MatchesService,
    private route: ActivatedRoute
  ) {
    const data = this.route.snapshot.data as {
      profile: Profile;
    };
    this.profile = data.profile;
    this.course = '';
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

  async getMatches() {
    const data = await this.matchService.get_matches(
      'COMP423',
      this.profile.pid
    );
    console.log(data.name);
    console.log(data.contactInformation);
  }
}
