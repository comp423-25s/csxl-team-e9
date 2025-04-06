import { Component } from '@angular/core';
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
    title: 'Git Together',
    component: InitialFormComponent
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      deadlineProximity: [3, Validators.required],
      workStyle: [3, Validators.required],
      leadershipComfort: [3, Validators.required],
      meetingFrequency: [3, Validators.required],
      conflictResolution: [3, Validators.required]
    });
  }

  navigateToGitTogether() {
    this.router.navigate(['/coworking/git-together']);
  }

  onSubmit() {
    if (this.form.valid) {
      // Enhanced logging with formatted output
      const formValues = this.form.value;
      const logMessage = `
        Initial Preferences Submitted:
        - Deadline Proximity: ${formValues.deadlineProximity}/5
        - Work Style: ${formValues.workStyle}/5
        - Leadership Comfort: ${formValues.leadershipComfort}/5
        - Meeting Frequency: ${formValues.meetingFrequency}/5
        - Conflict Resolution: ${formValues.conflictResolution}/5
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
