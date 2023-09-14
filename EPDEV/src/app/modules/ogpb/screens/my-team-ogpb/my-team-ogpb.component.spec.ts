import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamOgpbComponent } from './my-team-ogpb.component';

describe('MyTeamOgpbComponent', () => {
  let component: MyTeamOgpbComponent;
  let fixture: ComponentFixture<MyTeamOgpbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTeamOgpbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamOgpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
