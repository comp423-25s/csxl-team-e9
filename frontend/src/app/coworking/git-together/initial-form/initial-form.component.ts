import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IFService } from './initial-form.service';

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

  constructor(
    private fb: FormBuilder,
    private ifservice: IFService
  ) {
    this.form = this.fb.group({
      one: [3],
      two: [3],
      three: [3],
      four: [3],
      five: [3]
    });
  }

  onSubmit() {
    this.ifservice.generate_answers(
      this.form.value.one,
      this.form.value.two,
      this.form.value.three,
      this.form.value.four,
      this.form.value.five
    );
  }
}
