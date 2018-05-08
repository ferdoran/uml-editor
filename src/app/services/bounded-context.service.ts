import { Injectable } from '@angular/core';
import { ClassShapeComponent } from '../shapes/class-shape/class-shape.component';
import { Subject } from 'rxjs/Subject';
import { BoundedContext } from '../bounded-context';

@Injectable()
export class BoundedContextService {

  memberAdded: Subject<{ bcName: string, element: ClassShapeComponent}> = new Subject();
  memberRemoved: Subject<{ bcName: string, element: ClassShapeComponent }> = new Subject();
  contextAdded: Subject<BoundedContext> = new Subject();
  contextRemoved: Subject<BoundedContext> = new Subject();
  contexts: BoundedContext[] = [];

  constructor() { }

  public addBoundedContextMember(bcName: string, element: ClassShapeComponent) {
    this.memberAdded.next({ bcName: bcName, element: element});
  }

  public removeBoundedContextMember(bcName: string, element: ClassShapeComponent) {
    this.memberRemoved.next({ bcName: bcName, element: element });
  }

  public getBoundedContextForClass(element: ClassShapeComponent): BoundedContext {
    for (let i = 0; i < this.contexts.length; i++) {
      let bc = this.contexts[i];
      if (bc.existMember(element) >= 0) {
        return bc;
      }
    }
    return null;
  }

}
