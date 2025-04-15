import { Component } from '@angular/core';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { Router } from '@angular/router';
import { TeacherPairingsService } from './teacher-pairings.service';
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
    path: 'teacher-pairings',
    title: 'GitTogether Pairings',
    component: TeacherPairingsComponent,
    resolve: {
      profile: profileResolver
    }
  };

  constructor(
    private router: Router,
    private TPsvc: TeacherPairingsService
  ) {}

  navigateToGitTogether() {
    this.router.navigate(['/coworking/git-together']);
  }

  viewCoursePairings() {}
}
