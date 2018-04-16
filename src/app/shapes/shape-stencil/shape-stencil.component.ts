import { Component, OnInit, HostListener, ViewChild, ElementRef, Input, Output, AfterViewInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ShapeDropService } from '../../services/shape-drop.service';

@Component({
  selector: '[app-shape-stencil]',
  templateUrl: './shape-stencil.component.html',
  styleUrls: ['./shape-stencil.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class ShapeStencilComponent implements OnInit, AfterViewInit {

  @Input('layer') dragLayer: any;

  isDragging: boolean = false;
  clonedNode: any;

  constructor(private content: ElementRef , private _renderer: Renderer2, private shapeDropService: ShapeDropService) { }


  ngOnInit() {}

  ngAfterViewInit() {
  }

  @HostListener('mousedown', ['$event']) onDragStart(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    // append div with the content
    this._renderer.setStyle(this.dragLayer.parentNode, "left", event.clientX.toString() + "px");
    this._renderer.setStyle(this.dragLayer.parentNode, "top", event.clientY.toString() + "px");
    let con = this.content.nativeElement.cloneNode(true);

    this._renderer.setAttribute(con, "x", "0");
    this._renderer.appendChild(this.dragLayer, con);
    this.clonedNode = con;

  }

  @HostListener('document:mousemove', ['$event']) onDragMove(event: MouseEvent) {
    if(this.isDragging) {
      let bbox = this.clonedNode.getBBox();
      this._renderer.setStyle(this.dragLayer.parentNode, "left", event.clientX - (bbox.width / 2) + "px");
      this._renderer.setStyle(this.dragLayer.parentNode, "top", event.clientY - (bbox.height / 2) + "px");

    }
  }

  @HostListener('document:mouseup', ['$event']) onDragEnd(event: MouseEvent) {
    if(this.isDragging) {
      this.isDragging = false;

      let dropped = {
        type: this.clonedNode.getAttribute("shapeType"),
        x: event.pageX,
        y: event.pageY
      };

      this.shapeDropService.droppedShape.next(dropped);
      this._renderer.removeChild(this.dragLayer, this.clonedNode);
      this._renderer.setStyle(this.dragLayer.parentNode, "left", "0");
      this._renderer.setStyle(this.dragLayer.parentNode, "top", "0");


    }

  }

}
