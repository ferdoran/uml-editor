import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundedContextComponent } from './bounded-context.component';

describe('BoundedContextComponent', () => {
  let component: BoundedContextComponent;
  let fixture: ComponentFixture<BoundedContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoundedContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoundedContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
