import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SFService } from './specific-form.service';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { profileResolver } from 'src/app/profile/profile.resolver';
import { ActivatedRoute } from '@angular/router';
import { availableClasses } from '../../coworking.models';

@Component({
  selector: 'app-specific-form',
  templateUrl: './specific-form.component.html',
  styleUrls: ['./specific-form.component.css']
})
export class SpecificFormComponent {
  public static Route = {
    path: 'specificForm',
    title: 'GitTogether Partner Matching',
    component: SpecificFormComponent,
    resolve: {
      profile: profileResolver
    }
  };

  specificForm: FormGroup;
  isLoading = false;
  profile: Profile;
  availableClasses = availableClasses;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private sfservice: SFService
  ) {
    this.specificForm = this.fb.group({
      collaborationType: ['', Validators.required],
      specificRequirements: [
        '',
        [Validators.required, Validators.minLength(50)]
      ],
      contactInfo: ['', [Validators.required, Validators.email]]
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
    if (this.specificForm.valid) {
      this.isLoading = true;

      const formValues = this.specificForm.value;
      const logMessage = `
        Specific Partner Preferences Submitted:
        - Project Type: ${formValues.collaborationType}
        - Project Name: ${formValues.className}
        - Time Commitment: ${formValues.timeCommitment}
        - Contact Info: ${formValues.contactInfo}
        - Specific Requirements: ${formValues.specificRequirements}
      `;

      console.log('Specific Form values:', formValues);
      console.log(logMessage);
      if (this.profile.first_name !== null) {
        this.sfservice.generate_response(
          formValues.specificRequirements,
          this.profile.pid,
          formValues.contactInfo,
          formValues.collaborationType,
          this.profile.first_name
        );
      }

      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open(
          'Your partner preferences have been submitted!',
          'Close',
          {
            duration: 5000,
            panelClass: ['success-snackbar']
          }
        );
        this.specificForm.reset();
        this.router.navigate(['/coworking/git-together']);
      }, 1500);
    } else {
      this.snackBar.open(
        'Please complete all required fields correctly',
        'Close',
        {
          duration: 3000,
          panelClass: ['error-snackbar']
        }
      );
    }
  }
}
