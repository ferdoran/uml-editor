import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DrawConnectionService {

  public drawConnection: Subject<any> = new Subject();
  private startPosition: any;
  private startAnchor: any;

  constructor() { }

  startDrawing(startPosition, anchorPoint) {
    this.startPosition = startPosition;
    console.log("anchor: ", anchorPoint);
  }

  finishDrawing(endPosition, anchorPoint) {
    let drawData = {
      startPosition: this.startPosition,
      endPosition: endPosition,
    };
    this.drawConnection.next(drawData);
    this.startPosition = null;
  }

}
