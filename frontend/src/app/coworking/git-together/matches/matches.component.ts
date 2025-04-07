import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    path: 'git-together/matches',
    title: 'GitTogether Matches',
    component: GitTogetherMatchesComponent,
    resolve: {
      profile: profileResolver
    }
  };

  matches = [
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
      }
    }
    // ... other matches
  ];

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
  }

  navigateToGitTogether() {
    this.router.navigate(['/coworking/git-together']);
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
      value: value as number // Explicitly type the value as number
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
