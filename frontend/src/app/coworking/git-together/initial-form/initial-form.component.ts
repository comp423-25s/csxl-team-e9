import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IFService } from './initial-form.service';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrls: ['./initial-form.component.css']
})
export class InitialFormComponent {
  form: FormGroup;
  public static Route = {
    path: 'initialForm',
    title: 'Initial Form',
    component: InitialFormComponent,
    resolve: {
      profile: profileResolver
    }
  };
  profile: Profile;

  constructor(
    private fb: FormBuilder,
    private ifservice: IFService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      one: [1, Validators.required],
      two: [1, Validators.required],
      three: [1, Validators.required],
      four: [1, Validators.required],
      five: [1, Validators.required]
    });

    const data = this.route.snapshot.data as {
      profile: Profile;
    };
    this.profile = data.profile;
  }

  navigateToGitTogether() {
    this.router.navigate(['/coworking/git-together']);
  }

  onSubmit() {
    console.log(this.form.value);
    this.ifservice.generate_answers(
      this.form.value.one,
      this.form.value.two,
      this.form.value.three,
      this.form.value.four,
      this.form.value.five,
      this.profile.pid
    );
    if (this.form.valid) {
      // Enhanced logging with formatted output
      const formValues = this.form.value;
      const logMessage = `
        Initial Preferences Submitted:
        - Deadline Proximity: ${formValues.one}/5
        - Work Style: ${formValues.two}/5
        - Leadership Comfort: ${formValues.three}/5
        - Meeting Frequency: ${formValues.four}/5
        - Conflict Resolution: ${formValues.five}/5
      `;

      console.log('Form values:', formValues);
      console.log(logMessage);

      // Show success message
      this.snackBar.open('Preferences saved successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      // Navigate to submitted page
      this.router.navigate(['/coworking/git-together']);
    } else {
      // Show error message if form is invalid
      this.snackBar.open('Please complete all fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
