import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageService } from './git-together-page.service';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-git-together-page',
  templateUrl: './git-together-page.component.html',
  styleUrls: ['./git-together-page.component.css']
})
export class GitTogetherPageComponent implements OnInit {
  profile: Profile;

  public static Route = {
    path: 'git-together',
    title: 'Git Together',
    component: GitTogetherPageComponent,
    resolve: {
      profile: profileResolver
    }
  };

  constructor(
    private router: Router,
    protected snackBar: MatSnackBar,
    private pageService: PageService,
    private route: ActivatedRoute
  ) {
    const data = this.route.snapshot.data as {
      profile: Profile;
    };
    this.profile = data.profile;
  }

  ngOnInit() {
    this.profile.id != null &&
      this.pageService
        .is_ambassador(this.profile.id)
        .subscribe((isAmbassador) => {
          if (isAmbassador) {
            this.navigateToTeacherPairings();
          }
        });
  }

  navigateToPreferences() {
    this.router.navigate(['/coworking/initialForm']);
  }

  navigateToSpecificForm() {
    this.router.navigate(['/coworking/specificForm']);
  }

  navigateToViewMatches() {
    this.router.navigate(['/coworking/git-together/course-selection']);
  }

  navigateToCoworking() {
    this.router.navigate(['/coworking']);
  }

  navigateToTeacherPairings() {
    this.router.navigate(['/coworking/git-together/teacher-pairings']);
  }
}
