// course-selection.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.css']
})
export class CourseSelectionComponent {
  public static Route = {
    path: 'git-together/course-selection',
    title: 'Select Course',
    component: CourseSelectionComponent
  };

  availableCourses = [
    { code: 'COMP110', name: 'Introduction to Programming and Data Science' }
  ];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  navigateToGitTogether() {
    this.router.navigate(['/coworking/git-together']);
  }

  viewMatches(courseCode: string) {
    this.router.navigate([
      '/coworking/git-together/matches/:course',
      { course: courseCode }
    ]);
  }
}
