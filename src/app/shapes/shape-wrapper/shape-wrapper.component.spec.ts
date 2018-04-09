import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeWrapperComponent } from './shape-wrapper.component';

describe('ShapeWrapperComponent', () => {
  let component: ShapeWrapperComponent;
  let fixture: ComponentFixture<ShapeWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
