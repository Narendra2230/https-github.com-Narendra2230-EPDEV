import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleCmptComponent } from './toggle-cmpt.component';

describe('ToggleCmptComponent', () => {
  let component: ToggleCmptComponent;
  let fixture: ComponentFixture<ToggleCmptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleCmptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleCmptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
