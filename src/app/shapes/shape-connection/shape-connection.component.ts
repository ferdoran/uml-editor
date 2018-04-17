import { Component, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { ShapeWrapperComponent } from '../shape-wrapper/shape-wrapper.component';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { DrawConnectionService } from '../../services/draw-connection.service';

@Component({
  selector: 'svg.shape-connection',
  templateUrl: './shape-connection.component.html',
  styleUrls: ['./shape-connection.component.css']
})
export class ShapeConnectionComponent extends ShapeWrapperComponent implements OnInit, AfterViewInit {

  constructor(protected renderer: Renderer2, protected elementRef: ElementRef, protected shapeSelectorService: ShapeSelectorService, protected drawConnectionService: DrawConnectionService) {
    super(elementRef, renderer, shapeSelectorService, drawConnectionService);
   }

  pathDescription: string = "";
  element1: ShapeWrapperComponent; // TODO: add reference to connected element
  element2: ShapeWrapperComponent; // TODO: add reference to connected element
  startPosition: any = { x: 0, y: 0 };
  endPosition: any = { x: 0, y: 0 };

  ngOnInit() {
    this.width = 200;
    this.height = 100;
  }

  ngAfterViewInit() {
    this.updateViewBox();
    this.setX(this.x);
    this.setY(this.y);
    this.renderer.setStyle(this.elementRef.nativeElement, "stroke", "black");
    this.renderer.setStyle(this.elementRef.nativeElement, "stroke-width", "3px");
    this.renderer.setStyle(this.elementRef.nativeElement, "cursor", "move");
  }

  setStartPosition(newPos) {
    this.startPosition = newPos;
    this.updateViewBox();
  }

  setEndPosition(newPos) {
    this.endPosition = newPos;
    this.updateViewBox();
  }

  setPathDescription(pathDesc: string) {
    this.pathDescription = pathDesc;
    // this.renderer.setAttribute(this.elementRef.nativeElement, "d", this.pathDescription);
  }

  updateViewBox() {
    let w = this.endPosition.x > this.startPosition.x ? this.endPosition.x : this.startPosition.x;
    let h = this.endPosition.y > this.startPosition.y ? this.endPosition.y : this.startPosition.y;
    h += 3; // Have to consider line stroke width
    this.width = w;
    this.height = h;
    this.renderer.setAttribute(this.elementRef.nativeElement, "width", this.width.toString())
    this.renderer.setAttribute(this.elementRef.nativeElement, "height", this.height.toString())
  }

}
