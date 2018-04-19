import { Component, OnInit, Renderer2, ElementRef, DoCheck } from '@angular/core';
import { ShapeWrapperComponent } from '../shape-wrapper/shape-wrapper.component';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { AnchorPointComponent } from '../anchor-point/anchor-point.component';

@Component({
  selector: 'svg.shape-connection',
  templateUrl: './shape-connection.component.html',
  styleUrls: ['./shape-connection.component.css']
})
export class ShapeConnectionComponent extends ShapeWrapperComponent implements OnInit, DoCheck {

  constructor(protected renderer: Renderer2, protected elementRef: ElementRef, protected shapeSelectorService: ShapeSelectorService, protected drawConnectionService: DrawConnectionService) {
    super(elementRef, renderer, shapeSelectorService, drawConnectionService);
   }

  element1: ShapeWrapperComponent;
  element2: ShapeWrapperComponent;
  startAnchor: AnchorPointComponent;
  endAnchor: AnchorPointComponent;

  x1: number = 0;
  x2: number = 0;
  y1: number = 0;
  y2: number = 0;

  ngOnInit() {
    this.isMovable = false;
  }

  ngDoCheck() {
    this.x1 = this.startAnchor.getRealX();
    this.x2 = this.endAnchor.getRealX();
    this.y1 = this.startAnchor.getRealY();
    this.y2 = this.endAnchor.getRealY();
  }

  setStartAnchor(anchorPoint: AnchorPointComponent) {
    this.startAnchor = anchorPoint;
    this.element1 = this.startAnchor.parent;
  }

  setEndAnchor(anchorPoint: AnchorPointComponent) {
    this.endAnchor = anchorPoint;
    this.element2 = this.endAnchor.parent;
  }
}
