import { Component, OnInit } from '@angular/core';
import { Aggregate } from '../../aggregate';
import { AggregateService } from '../../services/aggregate.service';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-aggregates',
  templateUrl: './aggregates.component.html',
  styleUrls: ['./aggregates.component.css']
})
export class AggregatesComponent implements OnInit {
  newAggregateName: string = "";
  constructor(protected aggregateService: AggregateService, private colorService: ColorService) { }

  ngOnInit() {
  }

  addAggregate() {
    if (this.newAggregateName.length > 0 && this.aggregateService.aggregates.findIndex(agg => agg.name === this.newAggregateName) === -1) {
      let agg = new Aggregate(this.newAggregateName);
      agg.color = this.colorService.nextColor();
      this.aggregateService.addAggregate(agg);
      this.newAggregateName = "";
      this.aggregateService.aggregateAdded.next(agg);
    }
  }

  removeAggregate(aggName: string) {
    let idx = this.aggregateService.aggregates.findIndex(agg => agg.name === aggName);
    let agg = this.aggregateService.aggregates[idx];
    this.aggregateService.removeAggregate(agg);
    this.aggregateService.aggregateRemoved.next(agg);

  }
}
