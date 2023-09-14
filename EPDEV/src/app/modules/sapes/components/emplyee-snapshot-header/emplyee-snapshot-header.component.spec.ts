import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeSnapshotHeaderComponent } from './emplyee-snapshot-header.component';

describe('EmplyeeSnapshotHeaderComponent', () => {
  let component: EmplyeeSnapshotHeaderComponent;
  let fixture: ComponentFixture<EmplyeeSnapshotHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplyeeSnapshotHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplyeeSnapshotHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
