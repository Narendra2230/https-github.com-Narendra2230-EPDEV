import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestsAllowedComponent } from './assests-allowed.component';

describe('AssestsAllowedComponent', () => {
  let component: AssestsAllowedComponent;
  let fixture: ComponentFixture<AssestsAllowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssestsAllowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssestsAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
