import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterLandingComponent } from './requester-landing.component';

describe('RequesterLandingComponent', () => {
  let component: RequesterLandingComponent;
  let fixture: ComponentFixture<RequesterLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequesterLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
