import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from 'src/app/models.module';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { CourseSelectionService } from './course-selection.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { MatchesService } from '../matches/matches.service'; // Assuming you have this service

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
    resolve: { profile: profileResolver }
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
    private courseService: CourseSelectionService,
    private matchesService: MatchesService
  ) {
    const data = this.route.snapshot.data as { profile: Profile };
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

  async deleteCoursePreferences() {
    if (!this.selectedCourse) {
      this.snackBar.open('Please select a course first', 'Close', {
        duration: 3000
      });
      return;
    }

    try {
      await this.matchesService.deleteSpecificAnswer(
        this.profile.pid,
        this.selectedCourse
      );
      await this.getCourses();
      this.snackBar.open('Course preferences deleted successfully', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    } catch (err: unknown) {
      console.error('Error deleting course preferences:', err);
      this.snackBar.open('Failed to delete course preferences', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
