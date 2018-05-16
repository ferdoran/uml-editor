import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
export class AppComponent {
  title = 'app';
  draggable: Subscription;
  x: number;
  y: number;

  mousePos: {x, y} = {x: 0, y: 0};

  @ViewChild('panel') panel: ElementRef;

  @HostListener('document:mousemove', ['$event']) mouseMove(e: MouseEvent) {
    this.mousePos = {
      x: e.clientX,
      y: e.clientY
    };
  }
}
