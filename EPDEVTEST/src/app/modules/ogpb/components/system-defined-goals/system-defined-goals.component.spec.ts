import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDefinedGoalsComponent } from './system-defined-goals.component';

describe('SystemDefinedGoalsComponent', () => {
  let component: SystemDefinedGoalsComponent;
  let fixture: ComponentFixture<SystemDefinedGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDefinedGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDefinedGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
