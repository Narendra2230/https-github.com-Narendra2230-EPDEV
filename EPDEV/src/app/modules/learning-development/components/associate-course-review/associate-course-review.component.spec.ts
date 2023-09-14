import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateCourseReviewComponent } from './associate-course-review.component';

describe('AssociateCourseReviewComponent', () => {
  let component: AssociateCourseReviewComponent;
  let fixture: ComponentFixture<AssociateCourseReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateCourseReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateCourseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
