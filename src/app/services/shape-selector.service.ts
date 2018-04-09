import { Injectable, EventEmitter } from '@angular/core';
import { ShapeWrapperComponent } from '../shapes/shape-wrapper/shape-wrapper.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShapeSelectorService {

  public selectElement: Subject<any> = new Subject();
  public deselectElement: Subject<any> = new Subject();
  private shapes: ShapeWrapperComponent[] = [];

  constructor() { }

  registerShape(element: ShapeWrapperComponent) {
    this.shapes[element.id] = element;
  }

  getShape(id: string): ShapeWrapperComponent {
    return this.shapes[id];
  }

  select(id: string) {
    let shape = this.getShape(id);
    this.selectElement.next(shape);
  }

  deselect(id: string) {
    let shape = this.getShape(id);
    this.deselectElement.next(shape);
  }
}
