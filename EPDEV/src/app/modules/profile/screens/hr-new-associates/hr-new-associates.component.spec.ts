import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrNewAssociatesComponent } from './hr-new-associates.component';

describe('HrNewAssociatesComponent', () => {
  let component: HrNewAssociatesComponent;
  let fixture: ComponentFixture<HrNewAssociatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrNewAssociatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrNewAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
