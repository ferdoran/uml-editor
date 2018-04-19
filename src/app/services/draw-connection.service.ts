import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AnchorPointComponent } from '../shapes/anchor-point/anchor-point.component';

@Injectable()
export class DrawConnectionService {

  public drawConnection: Subject<{startAnchor: AnchorPointComponent, endAnchor: AnchorPointComponent}> = new Subject();
  private startAnchor: AnchorPointComponent;

  constructor() { }

  startDrawing(anchorPoint: AnchorPointComponent) {
    this.startAnchor = anchorPoint;
    console.log("anchor: ", anchorPoint);
  }

  finishDrawing(anchorPoint: AnchorPointComponent) {
    let drawData = {
      startAnchor: this.startAnchor,
      endAnchor: anchorPoint
    };
    this.drawConnection.next(drawData);
  }

}
