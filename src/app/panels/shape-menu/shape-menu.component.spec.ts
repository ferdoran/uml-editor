import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeMenuComponent } from './shape-menu.component';

describe('ShapeMenuComponent', () => {
  let component: ShapeMenuComponent;
  let fixture: ComponentFixture<ShapeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
