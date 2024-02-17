/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyReportingComponent } from './my-reporting.component';

describe('MyReportingComponent', () => {
  let component: MyReportingComponent;
  let fixture: ComponentFixture<MyReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
