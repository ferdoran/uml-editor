import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShapeDropService {

  public droppedShape: Subject<{type: string, x: number, y: number}> = new Subject();

  constructor() { }

}
