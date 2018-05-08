import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundedContextsComponent } from './bounded-contexts.component';

describe('BoundedContextsComponent', () => {
  let component: BoundedContextsComponent;
  let fixture: ComponentFixture<BoundedContextsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoundedContextsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoundedContextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
