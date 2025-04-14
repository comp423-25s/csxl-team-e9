import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from 'src/app/models.module';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { CourseSelectionService } from './course-selection.service';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.css']
})
export class CourseSelectionComponent implements OnInit {
  public static Route = {
    path: 'git-together/course-selection',
    title: 'Select Course',
    component: CourseSelectionComponent,
    resolve: {
      profile: profileResolver
    }
  };
  profile: Profile;
  selectedCourse: string = '';
  loading: boolean = true;

  async ngOnInit() {
    await this.getCourses();
    this.loading = false;
  }
  courses = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private courseService: CourseSelectionService
  ) {
    const data = this.route.snapshot.data as {
      profile: Profile;
    };
    this.profile = data.profile;
  }

  navigateToGitTogether() {
    this.router.navigate(['/coworking/git-together']);
  }

  viewMatches() {
    this.router.navigate([
      '/coworking/git-together/matches/:course',
      { course: this.selectedCourse }
    ]);
  }

  async getCourses() {
    const results =
      (await this.courseService.get_courses(this.profile.pid)) ?? [];
    this.courses = results;
  }
}
