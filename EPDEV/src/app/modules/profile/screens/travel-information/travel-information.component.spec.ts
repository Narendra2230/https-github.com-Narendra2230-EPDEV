import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelInformationComponent } from './travel-information.component';

describe('TravelInformationComponent', () => {
  let component: TravelInformationComponent;
  let fixture: ComponentFixture<TravelInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
