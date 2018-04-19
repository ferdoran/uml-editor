import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorPointComponent } from './anchor-point.component';

describe('AnchorPointComponent', () => {
  let component: AnchorPointComponent;
  let fixture: ComponentFixture<AnchorPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnchorPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
