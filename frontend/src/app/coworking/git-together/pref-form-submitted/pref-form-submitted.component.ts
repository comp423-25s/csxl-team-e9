import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pref-form-submitted',
  templateUrl: './pref-form-submitted.component.html',
  styleUrl: './pref-form-submitted.component.css'
})
export class PrefFormSubmittedComponent {
  public static Route = {
    path: 'pref-submitted',
    title: 'Git Together',
    component: PrefFormSubmittedComponent
  };

  constructor(private router: Router) {}

  navigateToGitTogether() {
    this.router.navigateByUrl('/coworking/git-together');
  }
}
