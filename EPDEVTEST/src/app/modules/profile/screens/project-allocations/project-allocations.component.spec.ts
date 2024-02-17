import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAllocationsComponent } from './project-allocations.component';

describe('ProjectAllocationsComponent', () => {
  let component: ProjectAllocationsComponent;
  let fixture: ComponentFixture<ProjectAllocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAllocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
