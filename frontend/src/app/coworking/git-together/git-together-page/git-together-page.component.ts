import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-git-together-page',
  templateUrl: './git-together-page.component.html',
  styleUrls: ['./git-together-page.component.css']
})
export class GitTogetherPageComponent implements OnInit {
  public static Route = {
    path: 'git-together',
    title: 'Git Together',
    component: GitTogetherPageComponent
  };

  constructor(
    private router: Router,
    protected snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

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
}
