import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetExecutiveDashboardComponent } from './get-executive-dashboard.component';

describe('GetExecutiveDashboardComponent', () => {
  let component: GetExecutiveDashboardComponent;
  let fixture: ComponentFixture<GetExecutiveDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetExecutiveDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetExecutiveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
