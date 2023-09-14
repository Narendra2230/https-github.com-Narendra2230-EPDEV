import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssociatesComponent } from './hr-associates.component';

describe('HrAssociatesComponent', () => {
  let component: HrAssociatesComponent;
  let fixture: ComponentFixture<HrAssociatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAssociatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
