import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassShapeComponent } from './class-shape.component';

describe('ClassShapeComponent', () => {
  let component: ClassShapeComponent;
  let fixture: ComponentFixture<ClassShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
