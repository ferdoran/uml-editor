import { Component, OnInit, ChangeDetectorRef, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ShapeWrapperComponent } from '../shape-wrapper/shape-wrapper.component';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { Aggregate } from '../../aggregate';
import * as concaveman from "concaveman";
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'svg.aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent extends ShapeWrapperComponent implements OnInit, AfterViewInit {

  polyPoints: string;
  agg: Aggregate;

  protected cx: number = 0;
  protected cy: number = 0;
  protected rx: number = 0;
  protected ry: number = 0;

  constructor(protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected shapeSelectorService: ShapeSelectorService,
    protected drawConnectionService: DrawConnectionService,
    protected socketService: SocketService) {
    super(elementRef, renderer, shapeSelectorService, drawConnectionService, socketService);
   }

  ngOnInit() {
    this.type = "Aggregate";
    this.isMovable = false;
    this.isDeletable = false;
  }

  ngAfterViewInit() {
    this.hasInitializedView = true;
  }

  public updateViewBox() {
    if(this.agg && this.agg.members.length > 0) {
      let points = [];

      this.agg.members.forEach(member => {
        let x1 = member.element.x;
        let x2 = member.element.x + member.element.width;
        let y1 = member.element.y;
        let y2 = member.element.y + member.element.height;

        points.push([x1 - 10, y1 - 10]);
        points.push([x1 - 10, y2 + 10]);
        points.push([x2 + 10, y1 - 10]);
        points.push([x2 + 10, y2 + 10]);
      });
      let poly = concaveman(points, 3, 0);
      poly.pop();

      let polyPoints = "";
      poly.forEach((point, index) => {
        polyPoints += point[0] + "," + point[1];
        if(index < poly.length - 1) {
          polyPoints += " ";
        }
      });
      this.polyPoints = polyPoints;
    }
    else if (this.agg && this.agg.members.length === 0) {
      this.polyPoints = "";
    }
  }

}
