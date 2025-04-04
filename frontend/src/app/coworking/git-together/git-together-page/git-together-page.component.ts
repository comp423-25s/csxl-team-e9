import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-git-together-page',
  templateUrl: './git-together-page.component.html',
  styleUrl: './git-together-page.component.css'
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

  navigateToGitTogether() {
    this.router.navigateByUrl('/coworking/git-together');
  }

  navigateToPreferences() {
    this.router.navigateByUrl('/coworking/initialForm');
  }
}
