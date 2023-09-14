import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsCardComponent } from './requisitions-card.component';

describe('RequisitionsCardComponent', () => {
  let component: RequisitionsCardComponent;
  let fixture: ComponentFixture<RequisitionsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
