import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatesOgpbComponent } from './associates-ogpb.component';

describe('AssociatesOgpbComponent', () => {
  let component: AssociatesOgpbComponent;
  let fixture: ComponentFixture<AssociatesOgpbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatesOgpbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatesOgpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
