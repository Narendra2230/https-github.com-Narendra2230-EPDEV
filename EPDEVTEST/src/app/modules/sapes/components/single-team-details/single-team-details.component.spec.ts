import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTeamDetailsComponent } from './single-team-details.component';

describe('SingleTeamDetailsComponent', () => {
  let component: SingleTeamDetailsComponent;
  let fixture: ComponentFixture<SingleTeamDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTeamDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
