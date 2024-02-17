import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeSnapshotDetailsComponent } from './emplyee-snapshot-details.component';

describe('EmplyeeSnapshotDetailsComponent', () => {
  let component: EmplyeeSnapshotDetailsComponent;
  let fixture: ComponentFixture<EmplyeeSnapshotDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplyeeSnapshotDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplyeeSnapshotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
