import { Component, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { ShapeWrapperComponent } from '../shape-wrapper/shape-wrapper.component';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { AnchorPointComponent } from '../anchor-point/anchor-point.component';

@Component({
  selector: 'svg.shape-connection',
  templateUrl: './shape-connection.component.html',
  styleUrls: ['./shape-connection.component.css']
})
export class ShapeConnectionComponent extends ShapeWrapperComponent implements OnInit, AfterViewInit  {

  constructor(protected renderer: Renderer2, protected elementRef: ElementRef, protected shapeSelectorService: ShapeSelectorService, protected drawConnectionService: DrawConnectionService) {
    super(elementRef, renderer, shapeSelectorService, drawConnectionService);
   }

  element1: ShapeWrapperComponent;
  element2: ShapeWrapperComponent;
  startAnchor: AnchorPointComponent;
  endAnchor: AnchorPointComponent;

  ngOnInit() {
    this.isMovable = false;
  }

  ngAfterViewInit() {
    this.setX(this.x);
    this.setY(this.y);
  }

  ngOnChanges() {
  }

  setStartAnchor(anchorPoint: AnchorPointComponent) {
    this.startAnchor = anchorPoint;
    this.element1 = this.startAnchor.parent;
    this.updateViewBox();
  }

  setEndAnchor(anchorPoint: AnchorPointComponent) {
    this.endAnchor = anchorPoint;
    this.element2 = this.endAnchor.parent;
    this.updateViewBox();
  }

  updateViewBox() {
    if(this.startAnchor && this.endAnchor) {
      let w = this.endAnchor.getRealX() > this.startAnchor.getRealX() ? this.endAnchor.getRealX() : this.startAnchor.getRealX();
      let h = this.endAnchor.getRealY() > this.startAnchor.getRealY() ? this.endAnchor.getRealY() : this.startAnchor.getRealY();
      h += 3; // Have to consider line stroke width
      this.width = w;
      this.height = h;
      this.renderer.setAttribute(this.elementRef.nativeElement, "width", this.width.toString());
      this.renderer.setAttribute(this.elementRef.nativeElement, "height", this.height.toString());
    }

  }

}
