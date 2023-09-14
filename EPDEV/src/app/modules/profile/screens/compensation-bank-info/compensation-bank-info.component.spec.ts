import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationBankInfoComponent } from './compensation-bank-info.component';

describe('CompensationBankInfoComponent', () => {
  let component: CompensationBankInfoComponent;
  let fixture: ComponentFixture<CompensationBankInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensationBankInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensationBankInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
