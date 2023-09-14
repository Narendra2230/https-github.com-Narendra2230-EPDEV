import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateExitComponent } from './associate-exit.component';

describe('AssociateExitComponent', () => {
  let component: AssociateExitComponent;
  let fixture: ComponentFixture<AssociateExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
