import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-initial-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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
      one: [3],
      two: [3],
      three: [3],
      four: [3],
      five: [3]
    });
  }

  onSubmit() {
    const one = this.form.value.one;
    const two = this.form.value.two;
    const three = this.form.value.three;
    const four = this.form.value.four;
    const five = this.form.value.five;
  }
}
