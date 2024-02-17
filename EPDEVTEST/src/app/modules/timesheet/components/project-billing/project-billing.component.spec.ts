import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBillingComponent } from './project-billing.component';

describe('ProjectBillingComponent', () => {
  let component: ProjectBillingComponent;
  let fixture: ComponentFixture<ProjectBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
