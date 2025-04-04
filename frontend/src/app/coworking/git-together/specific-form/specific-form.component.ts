// src/app/coworking/git-together/specific-form/specific-form.component.ts
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-specific-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './specific-form.component.html',
  styleUrls: ['./specific-form.component.css']
})
export class SpecificFormComponent {
  specificForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.specificForm = this.fb.group({
      collaborationType: ['class', Validators.required],
      className: ['', Validators.required],
      specificRequirements: [
        '',
        [Validators.required, Validators.minLength(20)]
      ],
      preferredCommunication: ['', Validators.required],
      timeCommitment: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.specificForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Form would submit:', this.specificForm.value);
        this.isLoading = false;
        this.snackBar.open('Form submitted successfully! (Demo)', 'Close', {
          duration: 3000
        });
        this.specificForm.reset();
      }, 1500);
    }
  }
}
