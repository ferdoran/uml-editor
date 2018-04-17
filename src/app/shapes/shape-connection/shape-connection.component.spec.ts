import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeConnectionComponent } from './shape-connection.component';

describe('ShapeConnectionComponent', () => {
  let component: ShapeConnectionComponent;
  let fixture: ComponentFixture<ShapeConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
