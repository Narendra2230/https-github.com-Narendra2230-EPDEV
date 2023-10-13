import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtaDurationComponent } from './fta-duration.component';

describe('FtaDurationComponent', () => {
  let component: FtaDurationComponent;
  let fixture: ComponentFixture<FtaDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtaDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtaDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
