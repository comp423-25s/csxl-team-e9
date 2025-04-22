import { Component } from '@angular/core';
import { TeacherPairingsService } from './teacher-pairings-matches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teacher-pairings-matches',
  templateUrl: './teacher-pairings-matches.component.html',
  styleUrl: './teacher-pairings-matches.component.css'
})
export class TeacherPairingsMatchesComponent {
  selectedCourse: string = '';

  public static Route = {
    path: 'git-together/teacher-pairings/:course',
    title: 'GitTogether Pairings',
    component: TeacherPairingsMatchesComponent
  };

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private TPsvc: TeacherPairingsService,
    private route: ActivatedRoute
  ) {
    {
      this.route.params.subscribe((params) => {
        this.selectedCourse = params['course'] || '';
      });
    }
  }

  async ngOnInit() {
    const clas = this.selectedCourse;
    const data = await this.TPsvc.getTeacherCoursePairingsAsync(clas);
    console.log(data);
  }
}
