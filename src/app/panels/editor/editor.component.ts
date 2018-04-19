import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, HostListener, Renderer2 } from '@angular/core';
import { ClassShapeComponent } from '../../shapes/class-shape/class-shape.component';
import { ShapeWrapperComponent } from '../../shapes/shape-wrapper/shape-wrapper.component';
import { ShapeHostDirective } from '../../directives/shape-host.directive';
import { ShapeDropService } from '../../services/shape-drop.service';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { ShapeConnectionComponent } from '../../shapes/shape-connection/shape-connection.component';
import { DomUtils } from '../../utils/DomUtils';
import { AnchorPointComponent } from '../../shapes/anchor-point/anchor-point.component';
import { Constants } from '../../constants';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('panel') panel: ElementRef;
  @ViewChild(ShapeHostDirective) shapeHost: ShapeHostDirective;

  elements = [];

  public static readonly GRIDSIZE = 10;

  constructor(private compFacRes: ComponentFactoryResolver, private shapeDropService: ShapeDropService, private elementRef: ElementRef, private _renderer: Renderer2, private _drawConnectionService: DrawConnectionService) { }

  ngOnInit() {
    let classFac = this.compFacRes.resolveComponentFactory(ClassShapeComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    this.shapeDropService.droppedShape.subscribe(droppedData => {
      let selfy = this;
      if (droppedData.type === "class") {
        var x = droppedData.x - this.elementRef.nativeElement.offsetLeft;
        var y = droppedData.y - this.elementRef.nativeElement.offsetTop;
        this.createClassShape({ x: x, y: y });
      }
      else if (droppedData.type === "interface") {

      }
    });

    this._drawConnectionService.drawConnection.subscribe(drawData => {
      this.drawPath(drawData.startAnchor, drawData.endAnchor);
    })
  }

  ngAfterViewInit() {
    let compStyle = window.getComputedStyle(this.panel.nativeElement)
    let w = +compStyle.width.replace("px", "");
    let h = +compStyle.height.replace("px", "");


    w = w - w % Constants.GRIDSIZE;
    h = h - h % Constants.GRIDSIZE;
    this._renderer.setStyle(this.panel.nativeElement, "width", w);
    this._renderer.setStyle(this.panel.nativeElement, "height", h);
  }

  private drawPath(from: AnchorPointComponent, to: AnchorPointComponent) {
    let cmpFac = this.compFacRes.resolveComponentFactory(ShapeConnectionComponent);
    let cmpViewConRef = this.shapeHost.viewContainerRef;

    let compRef = cmpViewConRef.createComponent(cmpFac, 0);
    compRef.instance.setStartAnchor(from);
    compRef.instance.setEndAnchor(to);
    this.elements.push(compRef);
  }


  private createClassShape(position) {

    let cmpFac = this.compFacRes.resolveComponentFactory(ClassShapeComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac);
    compRef.instance.name = "Class";

    let x = position.x - (compRef.instance.width / 2);
    x = x - x % Constants.GRIDSIZE;

    let y = position.y - (compRef.instance.height / 2);
    y = y - y % Constants.GRIDSIZE;

    compRef.instance.x = x;
    compRef.instance.y = y;

    this.elements.push(compRef);
  }

  @HostListener('document:keydown', ['$event']) deleteElement(event: KeyboardEvent) {
    switch(event.keyCode) {
      case 46: // Delete Key
        this.deleteSelectedElements();
        break;
    }
  }

  private deleteSelectedElements() {
    let selectedElements = this.elements.filter(elem => elem.instance.isSelected);
    selectedElements.forEach(element => {
      let idx = this.elements.indexOf(element);
      this.elements.splice(idx, 1);
      element.destroy();
    });
  }
}
