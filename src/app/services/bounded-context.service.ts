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

  public getBoundedContextsForClass(element: ClassShapeComponent): BoundedContext[] {
    let bcs: BoundedContext[] = [];
    for (let i = 0; i < this.contexts.length; i++) {
      let bc = this.contexts[i];
      if (bc.existMember(element) >= 0) {
        bcs.push(bc);
      }
    }
    return bcs;
  }

  public getOtherBoundedContextsForClass(element: ClassShapeComponent): BoundedContext[] {
    let bcs: BoundedContext[] = [];
    bcs = this.contexts.filter(bc => bc.existMember(element) === -1);
    return bcs;
  }

  public addBoundedContext(bc: BoundedContext) {
    this.contexts.push(bc);
  }

  public removeBoundedContext(bc: BoundedContext) {
    let idx = this.contexts.findIndex(con => con.name === bc.name);
    bc.members.splice(0, bc.members.length);
    this.contexts.splice(idx, 1);
  }

}
