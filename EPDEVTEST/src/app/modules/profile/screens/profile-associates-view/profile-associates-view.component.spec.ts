import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAssociatesViewComponent } from './profile-associates-view.component';

describe('ProfileAssociatesViewComponent', () => {
  let component: ProfileAssociatesViewComponent;
  let fixture: ComponentFixture<ProfileAssociatesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAssociatesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAssociatesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
