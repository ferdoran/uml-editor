import { Component, ViewChild, ElementRef, Renderer2, HostListener} from '@angular/core';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { v4 as uuid } from 'uuid';
import { DomUtils } from '../../utils/DomUtils';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { environment } from '../../../environments/environment';
import { SocketService } from '../../services/socket.service';
import { ElementCreatedMessage } from '../../network/element-created.message';
import { ElementMovedMessage } from '../../network/element-moved.message';
import { ElementResizedMessage } from '../../network/element-resized.message';

@Component({
    selector: '[shape-wrapper]',
    template: '',
    styleUrls: ['./shape-wrapper.component.css']
})
export class ShapeWrapperComponent {
  public width: number;
  public height: number;
  public x?: number = 0;
  public y?: number = 0;
  protected type: string = "none";
  protected isMouseDown: boolean = false;
  protected isDragging: boolean = false;
  public isSelected: boolean = false;
  private readonly DRAG_TIMEOUT: number = 100;
  private dragTimer: NodeJS.Timer;
  public id: string;
  protected resizeShape: ElementRef;
  protected isResizing: boolean = false;
  protected resizeDirection: string = "";
  protected movementX: number = 0;
  protected movementY: number = 0;
  protected anchorPointsWrapper: ElementRef;
  protected isMovable: boolean = true;
  public hasInitializedView: boolean = false;
  public isDeletable: boolean = true;

  public serialize(): string {
    let s = {
      type: this.type,
      position: {
        x: this.x,
        y: this.y
      },
      dimensions: {
        width: this.width,
        height: this.height
      }
    };

    return JSON.stringify(s);
  }


  constructor(protected elementRef: ElementRef, protected renderer: Renderer2, protected shapeSelectorService: ShapeSelectorService, protected drawConnectionService: DrawConnectionService, protected socketService: SocketService) {
      this.id = uuid();
      this.renderer.setAttribute(this.elementRef.nativeElement, "id", this.id);
      this.shapeSelectorService.registerShape(this);
  }

  @HostListener('document:mousedown', ['$event']) deselect(event: MouseEvent, target: any) {
    if(this.isSelected) {
      if (DomUtils.isClickOutsideShape(this, event) && !DomUtils.isChildOf(event.target as HTMLElement, "properties-panel")) {
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
      // this.isDragging = true;
    this.dragTimer = setTimeout(() => {
      if (this.isMouseDown) {
        this.isDragging = true;
        this.movementX = 0;
        this.movementY = 0;
        if(this.resizeShape) {
          this.renderer.addClass(this.resizeShape.nativeElement, "d-none");
        }
      }
    }, this.DRAG_TIMEOUT);
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    // event.preventDefault();
    this.isMouseDown = false;
    if(this.isDragging) {
      let movedMessage = new ElementMovedMessage();
      movedMessage.elementId = this.id;
      movedMessage.position = { x: this.x, y: this.y };
      this.socketService.sendMessage(movedMessage);
      if(this.resizeShape) {
        this.renderer.removeClass(this.resizeShape.nativeElement, "d-none");
      }
      this.isDragging = false;
    }
    if(this.isResizing) {
      let resizedMessage = new ElementResizedMessage();
      resizedMessage.elementId = this.id;
      resizedMessage.position = { x: this.x, y: this.y };
      resizedMessage.dimension = { width: this.width, height: this.height };
      this.socketService.sendMessage(resizedMessage);
      this.isResizing = false;
    }
    this.resizeDirection = "";
    clearTimeout(this.dragTimer);
    console.debug("Mouse has been released");
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    // event.preventDefault();
    if (this.isMovable && this.isMouseDown && this.isDragging) {

      this.movementX += event.movementX;
      this.movementY += event.movementY;

      if(Math.abs(this.movementX) >= environment.gridSize) {
        // move horizontal
        let x = this.x + this.movementX;
        this.setX(x);
        this.movementX = 0;
      }
      if(Math.abs(this.movementY) >= environment.gridSize) {
        // move vertical
        let y = this.y + this.movementY;
        this.setY(y);
        this.movementY = 0;
      }
      // TODO: Extend panel size when element is moved out of it
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

  public updateViewBox() {
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

  public setId(id: string) {
    this.shapeSelectorService.removeShape(this.id);
    this.id = id;
    this.renderer.setAttribute(this.elementRef.nativeElement, "id", this.id);
    this.shapeSelectorService.registerShape(this);
  }

  @HostListener('mouseenter') protected highlight() {
    if(!this.isSelected) {
      this.renderer.setStyle(this.elementRef.nativeElement, "outline", "1px dashed green");
      if(this.anchorPointsWrapper)
        this.renderer.removeClass(this.anchorPointsWrapper.nativeElement, "d-none");
    }
  }

  select() {
    this.renderer.setStyle(this.elementRef.nativeElement, "outline", "3px solid lightblue");
    // draw resizable rect
    if(this.resizeShape)
      this.renderer.removeClass(this.resizeShape.nativeElement, "d-none");
    if(this.anchorPointsWrapper)
      this.renderer.addClass(this.anchorPointsWrapper.nativeElement, "d-none");

  }

   @HostListener('mouseleave') protected unhighlight() {
    if(!this.isSelected) {
      this.renderer.setStyle(this.elementRef.nativeElement, "outline", "none");
      if (this.resizeShape)
        this.renderer.addClass(this.resizeShape.nativeElement, "d-none");
      if (this.anchorPointsWrapper)
        this.renderer.addClass(this.anchorPointsWrapper.nativeElement, "d-none");
    }
  }

  resizeWidth(isNegative: boolean, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isResizing) {
      let w: number = 0;
      let x: number = this.x;
      this.movementX += event.movementX;
      if(this.movementX >= environment.gridSize || this.movementX <= -environment.gridSize) {
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
      if(this.movementY >= environment.gridSize || this.movementY <= -environment.gridSize) {
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
