import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowshiftRosterComponent } from './sowshift-roster.component';

describe('SowshiftRosterComponent', () => {
  let component: SowshiftRosterComponent;
  let fixture: ComponentFixture<SowshiftRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowshiftRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowshiftRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
