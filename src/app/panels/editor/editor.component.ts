import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, HostListener } from '@angular/core';
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

  constructor(private compFacRes: ComponentFactoryResolver, private shapeDropService: ShapeDropService, private elementRef: ElementRef) { }

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
    // compRef.instance.setX(position.x - position.x % 10);
    // compRef.instance.setY(position.y - position.y % 10);

    this.elements.push(compRef);
  }

}
