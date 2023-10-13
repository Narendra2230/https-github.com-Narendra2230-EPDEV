import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseReviewComponent } from './admin-course-review.component';

describe('AdminCourseReviewComponent', () => {
  let component: AdminCourseReviewComponent;
  let fixture: ComponentFixture<AdminCourseReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
