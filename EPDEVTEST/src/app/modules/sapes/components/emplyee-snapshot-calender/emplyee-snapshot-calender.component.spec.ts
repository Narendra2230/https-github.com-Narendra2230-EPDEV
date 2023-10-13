import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeSnapshotCalenderComponent } from './emplyee-snapshot-calender.component';

describe('EmplyeeSnapshotCalenderComponent', () => {
  let component: EmplyeeSnapshotCalenderComponent;
  let fixture: ComponentFixture<EmplyeeSnapshotCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplyeeSnapshotCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplyeeSnapshotCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
