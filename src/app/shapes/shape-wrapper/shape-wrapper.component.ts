import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
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
import { ShapeSelectorService } from '../../services/shape-selector.service';
import {v4 as uuid} from 'uuid';
import { DomUtils } from '../../utils/DomUtils';

@Component({
  selector: '[shape-wrapper]',
  // templateUrl: './shape-wrapper.component.html',
  template: '',
  styleUrls: ['./shape-wrapper.component.css']
})
export class ShapeWrapperComponent {

  public width: number;
  public height: number;
  public x?: number = 0;
  public y?: number = 0;
  protected isMouseDown: boolean = false;
  protected isDragging: boolean = false;
  public isSelected: boolean = false;
  protected gridSize: number = 10;
  private readonly DRAG_TIMEOUT: number = 50;
  private dragTimer: NodeJS.Timer;
  public id: string;

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2, protected shapeSelectorService: ShapeSelectorService) {
    this.id = uuid();
    renderer.setAttribute(this.elementRef.nativeElement, "id", this.id);
    shapeSelectorService.registerShape(this);
  }

  // @HostListener('click', ['$event']) onClick(event: MouseEvent) {
  //   // event.preventDefault();

  //   console.log("I have been clicked!", event);

  // }

  @HostListener('document:mousedown', ['$event', '$event.target']) deselect(event: MouseEvent, target: any) {
    if(this.isSelected) {
      let minX = this.x;
      let maxX = this.x + (this.width);
      let minY = this.y;
      let maxY = this.y + (this.height);
      if(this.isSelected && (event.offsetX < minX || event.offsetX > maxX || event.offsetY < minY || event.offsetY > maxY) && !DomUtils.isChildOf(event.target as HTMLElement, "properties-panel")) {
        // deselect
        console.log("click not on position");
        this.isSelected = false;
        this.shapeSelectorService.deselectElement.next(this.id);
        this.unhighlight();
      }
      // else if() {

      // }

    }
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    event.preventDefault();
    if(!this.isSelected) {
      this.isSelected = true;
      this.shapeSelectorService.selectElement.next(this.id)
      this.select();
    }
    this.isMouseDown = true;
    console.log("Mouse has been downed on me!", this.isSelected);
    if(this.isMouseDown)
      this.isDragging = true;
    // this.dragTimer = setTimeout(() => {
    //   if (this.isMouseDown) {
    //     this.isDragging = true;
    //   }
    // }, this.DRAG_TIMEOUT);
  }

  @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    // event.preventDefault();
    this.isMouseDown = false;
    this.isDragging = false;
    clearTimeout(this.dragTimer);
    console.log("Mouse has been released");
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    // event.preventDefault();
    if(this.isMouseDown && this.isDragging) {
      let x = event.offsetX - (this.width / 2);
      let y = event.offsetY - (this.height / 2);
      x = x + this.gridSize - x % this.gridSize;
      y = y + this.gridSize - y % this.gridSize;
      this.x = x;
      this.y = y;
      this.renderer.setAttribute(this.elementRef.nativeElement, "x", x.toString());
      this.renderer.setAttribute(this.elementRef.nativeElement, "y", y.toString());
    }
  }

  @HostListener('mouseenter') highlight() {
    if(!this.isSelected) {
      this.renderer.setStyle(this.elementRef.nativeElement, "outline", "1px dashed green");
    }

  }

  select() {
    this.renderer.setStyle(this.elementRef.nativeElement, "outline", "3px solid lightblue");
  }

  @HostListener('mouseleave') unhighlight() {
    if(!this.isSelected) {
      this.renderer.setStyle(this.elementRef.nativeElement, "outline", "none");
    }
  }

}
