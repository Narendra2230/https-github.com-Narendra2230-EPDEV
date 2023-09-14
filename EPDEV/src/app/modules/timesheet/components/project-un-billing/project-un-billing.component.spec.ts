import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUnBillingComponent } from './project-un-billing.component';

describe('ProjectUnBillingComponent', () => {
  let component: ProjectUnBillingComponent;
  let fixture: ComponentFixture<ProjectUnBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUnBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUnBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
