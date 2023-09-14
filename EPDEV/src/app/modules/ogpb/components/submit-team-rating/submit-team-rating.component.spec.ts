import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTeamRatingComponent } from './submit-team-rating.component';

describe('SubmitTeamRatingComponent', () => {
  let component: SubmitTeamRatingComponent;
  let fixture: ComponentFixture<SubmitTeamRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitTeamRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTeamRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
