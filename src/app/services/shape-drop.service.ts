import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShapeDropService {

  public droppedShape: Subject<any> = new Subject();

  constructor() { }

}
