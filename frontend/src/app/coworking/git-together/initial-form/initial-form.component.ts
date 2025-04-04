import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IFService } from './initial-form.service';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { profileResolver } from 'src/app/profile/profile.resolver';

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
    component: InitialFormComponent,
    resolve: {
      profile: profileResolver
    }
  };
  profile: Profile;

  constructor(
    private fb: FormBuilder,
    private ifservice: IFService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      one: [3],
      two: [3],
      three: [3],
      four: [3],
      five: [3]
    });

    const data = this.route.snapshot.data as {
      profile: Profile;
    };
    this.profile = data.profile;
  }

  onSubmit() {
    this.ifservice.generate_answers(
      this.form.value.one,
      this.form.value.two,
      this.form.value.three,
      this.form.value.four,
      this.form.value.five,
      this.profile.pid
    );
  }
}
