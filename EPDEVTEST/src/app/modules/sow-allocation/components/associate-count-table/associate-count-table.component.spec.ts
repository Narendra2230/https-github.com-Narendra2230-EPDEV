import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateCountTableComponent } from './associate-count-table.component';

describe('AssociateCountTableComponent', () => {
  let component: AssociateCountTableComponent;
  let fixture: ComponentFixture<AssociateCountTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateCountTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateCountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
