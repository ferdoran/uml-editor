import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, HostListener, Renderer2 } from '@angular/core';
import { ClassShapeComponent } from '../../shapes/class-shape/class-shape.component';
import { ShapeWrapperComponent } from '../../shapes/shape-wrapper/shape-wrapper.component';
import { ShapeHostDirective } from '../../directives/shape-host.directive';
import { ShapeDropService } from '../../services/shape-drop.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('panel') panel: ElementRef;
  @ViewChild(ShapeHostDirective) shapeHost: ShapeHostDirective;

  elements = [];

  constructor(private compFacRes: ComponentFactoryResolver, private shapeDropService: ShapeDropService, private elementRef: ElementRef, private _renderer: Renderer2) { }

  ngOnInit() {
    let cmpFac = this.compFacRes.resolveComponentFactory(ClassShapeComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;


    // classViewConRef.clear();

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
  }

  ngAfterViewInit() {
    let compStyle = window.getComputedStyle(this.panel.nativeElement)
    let w = +compStyle.width.replace("px", "");
    let h = +compStyle.height.replace("px", "");


    w = w - w % 10;
    h = h - h % 10;
    console.log("[%s, %s]", w, h);
    this._renderer.setStyle(this.panel.nativeElement, "width", w);
    this._renderer.setStyle(this.panel.nativeElement, "height", h);
  }


  private createClassShape(position) {

    let cmpFac = this.compFacRes.resolveComponentFactory(ClassShapeComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac);
    compRef.instance.name = "Class";

    let x = position.x - (compRef.instance.width / 2);
    x = x - x % 10;

    let y = position.y - (compRef.instance.height / 2);
    y = y - y % 10;

    compRef.instance.x = x;
    compRef.instance.y = y;

    this.elements.push(compRef);
  }

}
