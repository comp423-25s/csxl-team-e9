import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { MatchesService } from './matches.service';

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

  matches: any[] = [];
  selectedCourse: string = '';
  courseName: string = '';
  iffilled: boolean = true;
  sffilled: boolean = true;
  isloading: boolean = true;

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
    {
      this.route.params.subscribe((params) => {
        this.selectedCourse = params['course'] || '';
        this.getMatches(this.selectedCourse);
      });
    }
  }

  loadMatchesForCourse(courseCode: string) {
    // Find the course name
    const courseNames: { [key: string]: string } = {
      COMP110: 'Introduction to Programming and Data Science'
    };

    this.courseName = courseNames[courseCode] || courseCode;
  }

  navigateToCourseSelection() {
    this.router.navigate(['/coworking/git-together/course-selection']);
  }

  contactMatch(contactInfo: string) {
    this.snackBar.open(`Contacting ${contactInfo}...`, 'Close', {
      duration: 2000
    });

    window.open(
      `mailto:${contactInfo}?subject=GitTogether Partner&body=Hey, want to work together for ${this.selectedCourse}`,
      '_blank'
    );
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

  async deleteMatch(pid: number) {
    try {
      const data = await this.matchService.deleteMatch(
        this.profile.pid,
        pid,
        this.selectedCourse
      );
      this.snackBar.open(`Deleted match successfully!`, 'Close', {
        duration: 2000
      });
      this.matches = this.matches.filter((match) => match.pid !== pid);
    } catch (error: any) {
      console.log(error.error.detail);
    }
  }

  async getMatches(courseCode: string) {
    try {
      const data = await this.matchService.get_matches(
        courseCode,
        this.profile.pid
      );
      if (data !== 'no matches') {
        this.matches = [];
        data.forEach((match: any) => {
          this.matches.push({
            name: match.name,
            contact: match.contactInformation,
            score: match.compatibility,
            compatibility: {
              deadlineProximity: match.initialAnswers.one,
              workStyle: match.initialAnswers.two,
              leadershipComfort: match.initialAnswers.three,
              meetingFrequency: match.initialAnswers.four,
              conflictResolution: match.initialAnswers.five
            },
            bio: match.bio,
            reasoning: match.reasoning,
            pfp: match.pfp,
            pid: match.pid
          });
        });
        this.matches.sort((a, b) => b.score - a.score);
      }
      this.isloading = false;
    } catch (error: any) {
      console.log(error.error.detail);
      if (error.error.detail === 'Fill out Initial Form First.') {
        this.iffilled = false;
      } else if (error.error.detail === 'Fill out Specific Form.') {
        this.sffilled = false;
      }
    }
  }

  async getNewMatches(courseCode: string) {
    try {
      const data = await this.matchService.get_new_matches(
        courseCode,
        this.profile.pid
      );
      console.log(data);
      if (data !== 'no matches around') {
        this.matches.unshift({
          name: data.name,
          contact: data.contactInformation,
          score: data.compatibility,
          compatibility: {
            deadlineProximity: data.initialAnswers.one,
            workStyle: data.initialAnswers.two,
            leadershipComfort: data.initialAnswers.three,
            meetingFrequency: data.initialAnswers.four,
            conflictResolution: data.initialAnswers.five
          },
          bio: data.bio,
          reasoning: data.reasoning,
          pfp: data.pfp,
          pid: data.pid
        });
      } else {
        this.snackBar.open(
          'No new matches available! Try checking again later!',
          'Close',
          {
            duration: 3000
          }
        );
      }
      this.isloading = false;
    } catch (error: any) {
      console.log(error.error.detail);
      if (error.error.detail === 'Fill out Initial Form First.') {
        this.iffilled = false;
      } else if (error.error.detail === 'Fill out Specific Form.') {
        this.sffilled = false;
      }
    }
  }
}
