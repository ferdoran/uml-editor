import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skipUntil';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  draggable: Subscription;
  x: number;
  y: number;

  mousePos: {x, y} = {x: 0, y: 0};

  @ViewChild('panel') panel: ElementRef;

  ngAfterViewInit() {

    const obs = Observable.fromEvent(document, "mousemove");

    obs.subscribe((e: MouseEvent) => {
      this.mousePos = {
        x: e.offsetX,
        y: e.offsetY
      };
    });

    // const down = Observable.fromEvent(this.panel.nativeElement, 'mousedown')
    // .filter((e: MouseEvent) => !((e.which && e.which == 3) || (e.button && e.button == 2)))
    // .do((e: MouseEvent) => e.preventDefault())
    // .do((e: MouseEvent) => {
    //   console.log("Mouse down");
    // });

    // const up = Observable.fromEvent(document, 'mouseup')
    //   .do((e: MouseEvent) => e.preventDefault());
    // const mouseMove = Observable.fromEvent(document, 'mousemove')
    //   .do((e: MouseEvent) => e.stopPropagation());
    // const scrollWindow = Observable.fromEvent(document, 'scroll')
    //   .startWith({});
    // const move = Observable.combineLatest(mouseMove, scrollWindow);

    // const drag = down.mergeMap((md: MouseEvent) => {
    //   return move
    //     .map(([mm, s]) => mm)
    //     .do((mm: MouseEvent) => {

    //       this.x = mm.x - mm.x % 10;
    //       this.y = mm.y - mm.y % 10;
    //       console.log("[%s, %s]", mm.x, mm.y);
    //       // this.cable.movePatch(mm);
    //       // this.patches.resetSelection();
    //       // const target = this.patches.locateTarget(mm);
    //       // if (target) {
    //       //   target.isSelected = true;
    //       // }
    //     })
    //     .skipUntil(up
    //       .take(1))
    //       // .do(() => console.log("I did something")))
    //     .take(1);
    // });

    // this.draggable = drag.subscribe((e: MouseEvent) => {
    //   // const target = this.patches.locateTarget(e);
    //   // if (target && this.patches.notConnected(this, target)) {
    //   //   this.patches.connect(this, target);
    //   //   this.signal.connect(target.signal);
    //   // }
    //   // this.patches.resetSelection();
    //   console.log("I did another thing");
    // });
  }
}
