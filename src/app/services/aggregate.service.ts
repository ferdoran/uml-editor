import { Injectable } from '@angular/core';
import { ClassShapeComponent } from '../shapes/class-shape/class-shape.component';
import { Subject } from 'rxjs/Subject';
import { Aggregate } from '../aggregate';

@Injectable()
export class AggregateService {

  memberAdded: Subject<{aggName: string, element: ClassShapeComponent, isRoot: boolean}> = new Subject();
  memberRemoved: Subject<{ aggName: string, element: ClassShapeComponent }> = new Subject();
  aggregateAdded: Subject<Aggregate> = new Subject();
  aggregateRemoved: Subject<Aggregate> = new Subject();
  aggregates: Aggregate[] = [];

  constructor() { }

  public addAggregate(aggregate: Aggregate) {
    this.aggregates.push(aggregate);
  }

  public removeAggregate(agg: Aggregate) {
    let idx = this.aggregates.findIndex(aggr => aggr.name === agg.name);
    agg.members.splice(0, agg.members.length);
    this.aggregates.splice(idx, 1);
  }

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
