import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtaEmpDurationComponent } from './fta-emp-duration.component';

describe('FtaEmpDurationComponent', () => {
  let component: FtaEmpDurationComponent;
  let fixture: ComponentFixture<FtaEmpDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtaEmpDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtaEmpDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
