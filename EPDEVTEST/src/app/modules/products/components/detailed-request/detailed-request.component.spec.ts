import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRequestComponent } from './detailed-request.component';

describe('DetailedRequestComponent', () => {
  let component: DetailedRequestComponent;
  let fixture: ComponentFixture<DetailedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
