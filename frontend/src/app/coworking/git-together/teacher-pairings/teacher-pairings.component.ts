import { Component } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { Router } from '@angular/router';
import { availableClasses } from '../../coworking.models';

@Component({
  selector: 'app-teacher-pairings',
  templateUrl: './teacher-pairings.component.html',
  styleUrl: './teacher-pairings.component.css'
})
export class TeacherPairingsComponent {
  loading = false;
  selectedCourse: string = '';
  coursesToSelect = availableClasses;

  async ngOnInit() {}

  public static Route = {
    path: 'git-together/teacher-pairings',
    title: 'GitTogether Pairings',
    component: TeacherPairingsComponent,
    resolve: {
      profile: profileResolver
    }
  };

  constructor(private router: Router) {}

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
}
