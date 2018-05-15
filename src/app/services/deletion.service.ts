import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ClassShapeComponent } from '../shapes/class-shape/class-shape.component';
import { ShapeWrapperComponent } from '../shapes/shape-wrapper/shape-wrapper.component';

@Injectable()
export class DeletionService {
  elementDeleted: Subject<ShapeWrapperComponent> = new Subject();
  classDeleted: Subject<ClassShapeComponent> = new Subject();
  constructor() { }

}
