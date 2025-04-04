import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-initial-form',
  templateUrl: './initial-form.component.html',
  styleUrl: './initial-form.component.css'
})
export class InitialFormComponent {
  form: FormGroup;
  public static Route = {
    path: 'initialForm',
    title: 'Initial Form',
    component: InitialFormComponent
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      deadlines: [3],
      divisionOfWork: [3],
      leadershipComfort: [3],
      meetingFrequency: [3],
      conflictApproach: [3]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
