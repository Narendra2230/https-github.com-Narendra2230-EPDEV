import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallProductsComponent } from './viewall-products.component';

describe('ViewallProductsComponent', () => {
  let component: ViewallProductsComponent;
  let fixture: ComponentFixture<ViewallProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewallProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
