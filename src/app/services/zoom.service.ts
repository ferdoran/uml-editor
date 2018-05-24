import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ZoomService {

  private zoomLevel: number = 1;

  zoomEvent: Subject<number> = new Subject();
  constructor() { }

  public zoom(amount: number) {
    this.zoomLevel += amount;
    this.zoomEvent.next(this.zoomLevel);
  }

}
