import { Component, OnInit } from '@angular/core';
import { BoundedContext } from '../../bounded-context';
import { BoundedContextService } from '../../services/bounded-context.service';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-bounded-contexts',
  templateUrl: './bounded-contexts.component.html',
  styleUrls: ['./bounded-contexts.component.css']
})
export class BoundedContextsComponent implements OnInit {
  contexts: BoundedContext[] = [];
  newContextName: string = "";
  constructor(private bcService: BoundedContextService, private colorService: ColorService) { }

  ngOnInit() {
    this.bcService.contexts = this.contexts;
  }

  addBoundedContext() {
    if (this.newContextName.length > 0 && this.contexts.findIndex(bc => bc.name === this.newContextName) === -1) {
      let bc = new BoundedContext(this.newContextName);
      bc.color = this.colorService.nextColor();
      this.bcService.addBoundedContext(bc);
      this.newContextName = "";
      this.bcService.contextAdded.next(bc);
    }
  }

  removeBoundedContext(bcName: string) {
    let idx = this.contexts.findIndex(bc => bc.name === bcName);
    let bc = this.contexts[idx];
    this.bcService.removeBoundedContext(bc);
    this.bcService.contextRemoved.next(bc);
  }

}
