import { Component, OnInit, Renderer2, ElementRef, DoCheck, AfterViewInit, ComponentRef } from '@angular/core';
import { ShapeWrapperComponent } from '../shape-wrapper/shape-wrapper.component';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { AnchorPointComponent } from '../anchor-point/anchor-point.component';
import { DeletionService } from '../../services/deletion.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'svg.shape-connection',
  templateUrl: './shape-connection.component.html',
  styleUrls: ['./shape-connection.component.css']
})
export class ShapeConnectionComponent extends ShapeWrapperComponent implements OnInit, DoCheck, AfterViewInit {

  constructor(protected renderer: Renderer2,
    protected elementRef: ElementRef,
    protected shapeSelectorService: ShapeSelectorService,
    protected drawConnectionService: DrawConnectionService,
    protected deletionService: DeletionService,
    protected socketService: SocketService)
    {
      super(elementRef, renderer, shapeSelectorService, drawConnectionService, socketService);
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
    this.type = "Connection";
    this.isMovable = false;
    this.deletionService.classDeleted.subscribe(element => {
      if(this.element1 === element || this.element2 === element) {
        this.deletionService.elementDeleted.next(this);
      }
    })
  }

  ngAfterViewInit() {
    this.hasInitializedView = true;
  }

  ngDoCheck() {
    if(this.startAnchor && this.endAnchor) {

      this.x1 = this.startAnchor.getRealX();
      this.x2 = this.endAnchor.getRealX();
      this.y1 = this.startAnchor.getRealY();
      this.y2 = this.endAnchor.getRealY();
    }
  }

  setStartAnchor(anchorPoint: AnchorPointComponent) {
    this.startAnchor = anchorPoint;
    this.element1 = this.startAnchor.parent;
  }

  setEndAnchor(anchorPoint: AnchorPointComponent) {
    this.endAnchor = anchorPoint;
    this.element2 = this.endAnchor.parent;
  }

  public serialize(): string {
    let s = {
      id: this.id,
      type: this.type,
      position: {
        x: this.x,
        y: this.y
      },
      from: {
        element: this.element1.id,
        anchorPoint: {
          x: this.x1,
          y: this.y1
        }
      },
      to: {
        element: this.element2.id,
        anchorPoint: {
          x: this.x2,
          y: this.y2
        }
      },
      dimensions: {
        width: this.width,
        height: this.height
      }
    };
    return JSON.stringify(s);
  }
}
