import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateLeaveComponent } from './associate-leave.component';

describe('AssociateLeaveComponent', () => {
  let component: AssociateLeaveComponent;
  let fixture: ComponentFixture<AssociateLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
