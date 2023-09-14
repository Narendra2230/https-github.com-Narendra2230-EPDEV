import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileManagerViewComponent } from './profile-manager-view.component';

describe('ProfileManagerViewComponent', () => {
  let component: ProfileManagerViewComponent;
  let fixture: ComponentFixture<ProfileManagerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileManagerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
