import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueObjectComponent } from './value-object.component';

describe('ValueObjectComponent', () => {
  let component: ValueObjectComponent;
  let fixture: ComponentFixture<ValueObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
