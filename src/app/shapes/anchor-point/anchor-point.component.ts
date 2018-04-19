import { Component, OnInit, Output, Input, ViewChild, ElementRef, Renderer2, AfterViewInit, HostBinding, HostListener } from '@angular/core';
import { ShapeWrapperComponent } from '../shape-wrapper/shape-wrapper.component';
import { DrawConnectionService } from '../../services/draw-connection.service';

@Component({
  selector: '[shapeAnchorPoint]',
  templateUrl: './anchor-point.component.html',
  styleUrls: ['./anchor-point.component.css']
})
export class AnchorPointComponent implements OnInit {

  @Input('centerX')
  cx: number = 0;

  @Input('centerY')
  cy: number = 0;

  @Input('radius')
  r: number = 3;

  @Input('parent')
  parent: ShapeWrapperComponent;

  @ViewChild('background') backgroundCircle: ElementRef;
  @ViewChild('anchorPoint') anchorPoint: ElementRef;

  private isHovering: boolean = false;
  private static isDrawing: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private drawConnectionService: DrawConnectionService) {  }

  ngOnInit() {
  }

  toggleBackground(event: MouseEvent) {
    if(this.isHovering) {
      this.isHovering = false;
      this.renderer.setStyle(this.backgroundCircle.nativeElement, "visibility", "hidden");
    }
    else {
      this.isHovering = true;
      this.renderer.setStyle(this.backgroundCircle.nativeElement, "visibility", "visible");
    }

  }

  public getRealX() {
    return this.parent.x + this.cx;
  }

  public getRealY() {
    return this.parent.y + this.cy;
  }

  @HostListener('mousedown', ['$event'])
  startDrawingConnection(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    AnchorPointComponent.isDrawing = true;
    this.drawConnectionService.startDrawing(this);
  }

  @HostListener('mouseup', ['$event'])
  finishDrawingConnection(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if(AnchorPointComponent.isDrawing) {
      AnchorPointComponent.isDrawing = false;
      this.drawConnectionService.finishDrawing(this)
    }
  }
}
