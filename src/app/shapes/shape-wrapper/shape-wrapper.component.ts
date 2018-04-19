import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { v4 as uuid } from 'uuid';
import { DomUtils } from '../../utils/DomUtils';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { Constants } from '../../constants';

@Component({
  selector: '[shape-wrapper]',
  // templateUrl: './shape-wrapper.component.html',
  template: '',
  styleUrls: ['./shape-wrapper.component.css']
})
export class ShapeWrapperComponent {
  public width: number;
  public height: number;
  public x?: number = 0;
  public y?: number = 0;
  protected isMouseDown: boolean = false;
  protected isDragging: boolean = false;
  public isSelected: boolean = false;
  private readonly DRAG_TIMEOUT: number = 50;
  private dragTimer: NodeJS.Timer;
  public id: string;
  protected resizeShape: ElementRef;
  protected isResizing: boolean = false;
  protected resizeDirection: string = "";
  protected movementX: number = 0;
  protected movementY: number = 0;
  protected anchorPoints: ElementRef;
  protected isMovable: boolean = true;

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2, protected shapeSelectorService: ShapeSelectorService, protected drawConnectionService: DrawConnectionService) {
    this.id = uuid();
    renderer.setAttribute(this.elementRef.nativeElement, "id", this.id);
    shapeSelectorService.registerShape(this);
  }

  @HostListener('document:mousedown', ['$event', '$event.target']) deselect(event: MouseEvent, target: any) {
    if(this.isSelected) {
      let minX = this.x;
      let maxX = this.x + (this.width);
      let minY = this.y;
      let maxY = this.y + (this.height);
      if(this.isSelected && (event.offsetX < minX || event.offsetX > maxX || event.offsetY < minY || event.offsetY > maxY) && !DomUtils.isChildOf(event.target as HTMLElement, "properties-panel")) {
        // deselect
        console.debug("click not on position");
        this.isSelected = false;
        this.shapeSelectorService.deselectElement.next(this.id);
        this.unhighlight();
      }
    }
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    event.preventDefault();
    if(!this.isSelected) {
      this.isSelected = true;
      this.shapeSelectorService.selectElement.next(this.id)
      this.select();
    }
    this.isMouseDown = true;
    console.debug("Mouse has been downed on me!", this.isSelected);
    if(this.isMouseDown && !this.isResizing)
      this.isDragging = true;
    // this.dragTimer = setTimeout(() => {
    //   if (this.isMouseDown) {
    //     this.isDragging = true;
    //   }
    // }, this.DRAG_TIMEOUT);
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    // event.preventDefault();
    this.isMouseDown = false;
    this.isDragging = false;
    this.isResizing = false;
    this.resizeDirection = "";
    clearTimeout(this.dragTimer);
    console.debug("Mouse has been released");
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    // event.preventDefault();
    if(this.isMouseDown && this.isDragging && this.isMovable) {
      let x = event.offsetX - (this.width / 2);   // FIXME: different behaviour for ShapeConnectionComponent required because width and height are different
      let y = event.offsetY - (this.height / 2);  // FIXME: different behaviour for ShapeConnectionComponent required because width and height are different
      x = x + Constants.GRIDSIZE - x % Constants.GRIDSIZE;
      y = y + Constants.GRIDSIZE - y % Constants.GRIDSIZE;
      this.x = x;
      this.y = y;
      this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
      this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
    }
    else if(this.isResizing) {
      switch(this.resizeDirection) {
        case "nw":
          this.resizeWidth(true, event);
          this.resizeHeight(true, event);
          break;
        case "n":
          this.resizeHeight(true, event);
          break;
        case "ne":
          this.resizeWidth(false, event);
          this.resizeHeight(true, event);
          break;
        case "w":
          this.resizeWidth(true, event);
          break;
        case "e":
          this.resizeWidth(false, event);
          break;
        case "sw":
          this.resizeWidth(true, event);
          this.resizeHeight(false, event);
          break;
        case "s":
          this.resizeHeight(false, event);
          break;
        case "se":
          this.resizeWidth(false, event);
          this.resizeHeight(false, event);
      }
    }
  }

  protected updateViewBox() {
    this.renderer.setAttribute(this.elementRef.nativeElement, "viewBox", "-5 -5 " + (this.width + 10) + " " + (this.height + 10));
  }

  public setX(x: number) {
    this.x = x;
    this.renderer.setAttribute(this.elementRef.nativeElement, "x", this.x.toString());
  }

  public setY(y: number) {
    this.y = y;
    this.renderer.setAttribute(this.elementRef.nativeElement, "y", this.y.toString());
  }

  public setHeight(h: number) {
    this.height = h;
    this.renderer.setAttribute(this.elementRef.nativeElement, "height", this.height.toString());
    this.updateViewBox();
  }

  public setWidth(w: number) {
    this.width = w;
    this.renderer.setAttribute(this.elementRef.nativeElement, "width", this.width.toString());
    this.updateViewBox();
  }

  @HostListener('mouseenter') protected highlight() {
    if(!this.isSelected) {
      this.renderer.setStyle(this.elementRef.nativeElement, "outline", "1px dashed green");
      if(this.anchorPoints)
        this.renderer.removeClass(this.anchorPoints.nativeElement, "d-none");
    }
  }

  select() {
    this.renderer.setStyle(this.elementRef.nativeElement, "outline", "3px solid lightblue");
    // draw resizable rect
    if(this.resizeShape)
      this.renderer.removeClass(this.resizeShape.nativeElement, "d-none");
    if(this.anchorPoints)
      this.renderer.addClass(this.anchorPoints.nativeElement, "d-none");

  }

   @HostListener('mouseleave') protected unhighlight() {
    if(!this.isSelected) {
      this.renderer.setStyle(this.elementRef.nativeElement, "outline", "none");
      if (this.resizeShape)
        this.renderer.addClass(this.resizeShape.nativeElement, "d-none");
      if (this.anchorPoints)
        this.renderer.addClass(this.anchorPoints.nativeElement, "d-none");
    }
  }

  resizeWidth(isNegative: boolean, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isResizing) {
      let w: number = 0;
      let x: number = this.x;
      this.movementX += event.movementX;
      if(this.movementX >= Constants.GRIDSIZE || this.movementX <= -Constants.GRIDSIZE) {
        if (isNegative) {
          w = this.width - this.movementX;
          x = x + this.movementX;
        }
        else {
          w = this.width + this.movementX;
        }
        this.setWidth(w);
        this.setX(x);
        this.movementX = 0;
      }
    }
  }

  resizeHeight(isNegative: boolean, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isResizing) {
      let h: number = 0;
      let y: number = this.y;
      this.movementY += event.movementY;
      if(this.movementY >= Constants.GRIDSIZE || this.movementY <= -Constants.GRIDSIZE) {
        if (isNegative) {
          h = this.height - this.movementY;
          y = y + this.movementY;
        }
        else {
          h = this.height + this.movementY;
        }
        this.setHeight(h);
        this.setY(y);
        this.movementY = 0;
      }
    }
  }

}
