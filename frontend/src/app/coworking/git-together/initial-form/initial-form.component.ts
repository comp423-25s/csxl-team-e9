import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrl: './initial-form.component.css'
})
export class InitialFormComponent {
  form: FormGroup;
  public static Route = {
    path: 'initial-form',
    title: 'Git Together',
    component: InitialFormComponent
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      deadlines: [3],
      divisionOfWork: [3],
      leadershipComfort: [3],
      meetingFrequency: [3],
      conflictApproach: [3]
    });
  }

  navigateToGitTogether() {
    this.router.navigateByUrl('/coworking/git-together');
  }

  navigateToSubmitted() {
    this.router.navigateByUrl('/coworking/pref-submitted');
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
