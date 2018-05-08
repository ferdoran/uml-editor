import { Component, OnInit } from '@angular/core';
import { BoundedContext } from '../../bounded-context';
import { BoundedContextService } from '../../services/bounded-context.service';

@Component({
  selector: 'app-bounded-contexts',
  templateUrl: './bounded-contexts.component.html',
  styleUrls: ['./bounded-contexts.component.css']
})
export class BoundedContextsComponent implements OnInit {

  static colors: string[] = ['green', 'blue', 'red', 'orange', 'pink'];
  static nextColor: number = 0;
  contexts: BoundedContext[] = [];
  newContextName: string = "";
  constructor(private bcService: BoundedContextService) { }

  ngOnInit() {
    this.bcService.contexts = this.contexts;
  }

  addBoundedContext() {
    if (this.newContextName.length > 0 && this.contexts.findIndex(agg => agg.name === this.newContextName) === -1) {
      let agg = new BoundedContext(this.newContextName);
      agg.color = BoundedContextsComponent.colors[BoundedContextsComponent.nextColor++ % BoundedContextsComponent.colors.length];
      this.contexts.push(agg);
      this.newContextName = "";
      this.bcService.contextAdded.next(agg);
    }
  }

  removeBoundedContext(aggName: string) {
    let idx = this.contexts.findIndex(agg => agg.name === aggName);
    let agg = this.contexts[idx];
    agg.members.splice(0, agg.members.length);
    this.contexts.splice(idx, 1);
    this.bcService.contextRemoved.next(agg);
  }

}
