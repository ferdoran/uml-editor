import { Component, OnInit } from '@angular/core';
import { Aggregate } from '../../aggregate';
import { AggregateService } from '../../services/aggregate.service';

@Component({
  selector: 'app-aggregates',
  templateUrl: './aggregates.component.html',
  styleUrls: ['./aggregates.component.css']
})
export class AggregatesComponent implements OnInit {

  static colors: string[] = ['green', 'blue', 'red', 'orange', 'pink'];
  static nextColor: number = 0;
  aggregates: Aggregate[] = [];
  newAggregateName: string = "";
  constructor(private aggregateService: AggregateService) { }

  ngOnInit() {
    this.aggregateService.aggregates = this.aggregates;
  }

  addAggregate() {
    if (this.newAggregateName.length > 0 && this.aggregates.findIndex(agg => agg.name === this.newAggregateName) === -1) {
      let agg = new Aggregate(this.newAggregateName);
      agg.color = AggregatesComponent.colors[AggregatesComponent.nextColor++ % AggregatesComponent.colors.length];
      this.aggregates.push(agg);
      this.newAggregateName = "";
      this.aggregateService.aggregateAdded.next(agg);
    }
  }

  removeAggregate(aggName: string) {
    let idx = this.aggregates.findIndex(agg => agg.name === aggName);
    let agg = this.aggregates[idx];
    agg.members.splice(0, agg.members.length);
    this.aggregates.splice(idx, 1);
    this.aggregateService.aggregateRemoved.next(agg);
  }
}
