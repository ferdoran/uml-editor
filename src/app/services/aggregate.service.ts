import { Injectable } from '@angular/core';
import { ClassShapeComponent } from '../shapes/class-shape/class-shape.component';
import { Subject } from 'rxjs/Subject';
import { Aggregate } from '../aggregate';

@Injectable()
export class AggregateService {

  memberAdded: Subject<{aggName: string, element: ClassShapeComponent, isRoot: boolean}> = new Subject();
  memberRemoved: Subject<{ aggName: string, element: ClassShapeComponent }> = new Subject();
  aggregates: Aggregate[] = [];

  constructor() { }

  public addAggregateMember(aggName: string, element: ClassShapeComponent, isRoot: boolean) {
    this.memberAdded.next({aggName: aggName, element: element, isRoot: isRoot});
  }

  public removeAggregateMember(aggName: string, element: ClassShapeComponent) {
    this.memberRemoved.next({ aggName: aggName, element: element });
  }

  public getAggregateForClass(element: ClassShapeComponent): Aggregate {
    for(let i=0; i < this.aggregates.length; i++) {
      let agg = this.aggregates[i];
      if(agg.existMember(element) >= 0) {
        return agg;
      }
    }
    return null;
  }
}
