// course-selection.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionService } from './course-selection.service';

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
    { code: 'COMP110', name: 'Introduction to Programming and Data Science' },
    { code: 'COMP426', name: 'Introduction to Programming and Data Science' },
    { code: 'COMP590', name: 'Introduction to Programming and Data Science' },
    { code: 'COMP590', name: 'Introduction to Programming and Data Science' }
  ];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private selectionService: SelectionService
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

  async getCourses() {
    try {
      const courses = await this.selectionService.getCourses();
      //this.availableCourses = courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      this.snackBar.open('Error fetching courses', 'Close', {
        duration: 2000
      });
    }
  }

  async deleteCourse(courseCode: string) {
    this.selectionService.deleteCourse(courseCode);
    this.availableCourses = this.availableCourses.filter(
      (course) => course.code !== courseCode
    );
    this.snackBar.open(`Course ${courseCode} deleted`, 'Close', {
      duration: 2000
    });
  }
}
