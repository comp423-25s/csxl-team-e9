import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitTogetherPageComponent } from './git-together-page.component';

describe('GitTogetherPageComponent', () => {
  let component: GitTogetherPageComponent;
  let fixture: ComponentFixture<GitTogetherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitTogetherPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitTogetherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
