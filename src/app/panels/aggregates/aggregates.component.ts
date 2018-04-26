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

    this.aggregateService.memberAdded.subscribe(data => {

      // remove from other aggregates first
      let oldAgg = this.aggregates.forEach(agg => {
        agg.removeMember(data.element);
      });

      // add to new aggregate
      let agg = this.aggregates.find(element => element.name === data.aggName);
      agg.addMember(data.element, data.isRoot);
    });

    this.aggregateService.memberRemoved.subscribe(data => {
      let agg = this.aggregates.find(element => element.name === data.aggName);
      agg.removeMember(data.element);
    });

    // let a1 = new Aggregate("First Agg");
    // a1.color = "green";
    // let a2 = new Aggregate("Second Agg");
    // a2.color = "blue";

    // this.aggregates.push(a1, a2);
  }

  addAggregate() {
    if (this.newAggregateName.length > 0 && this.aggregates.findIndex(agg => agg.name === this.newAggregateName) === -1) {
      let agg = new Aggregate(this.newAggregateName);
      agg.color = AggregatesComponent.colors[AggregatesComponent.nextColor++ % AggregatesComponent.colors.length];
      this.aggregates.push(agg);
      this.newAggregateName = "";
    }
  }

  removeAggregate(aggName: string) {
    let idx = this.aggregates.findIndex(agg => agg.name === aggName);
    let agg = this.aggregates[idx];
    agg.members.splice(0, agg.members.length);
    this.aggregates.splice(idx, 1);
  }
}
