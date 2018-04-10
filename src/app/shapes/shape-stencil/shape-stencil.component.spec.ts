import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeStencilComponent } from './shape-stencil.component';

describe('ShapeStencilComponent', () => {
  let component: ShapeStencilComponent;
  let fixture: ComponentFixture<ShapeStencilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeStencilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeStencilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
