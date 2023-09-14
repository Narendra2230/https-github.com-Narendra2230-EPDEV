import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDateComponent } from './global-date.component';

describe('GlobalDateComponent', () => {
  let component: GlobalDateComponent;
  let fixture: ComponentFixture<GlobalDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
