import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssoOnBilableProjectsComponent } from './asso-on-bilable-projects.component';

describe('AssoOnBilableProjectsComponent', () => {
  let component: AssoOnBilableProjectsComponent;
  let fixture: ComponentFixture<AssoOnBilableProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssoOnBilableProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssoOnBilableProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
