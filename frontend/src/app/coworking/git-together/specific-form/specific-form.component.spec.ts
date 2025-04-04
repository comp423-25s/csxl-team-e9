import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificFormComponent } from './specific-form.component';

describe('SpecificFormComponent', () => {
  let component: SpecificFormComponent;
  let fixture: ComponentFixture<SpecificFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
