import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { ClassShapeComponent } from '../../shapes/class-shape/class-shape.component';
import { ShapeWrapperComponent } from '../../shapes/shape-wrapper/shape-wrapper.component';
import { ShapeHostDirective } from '../../directives/shape-host.directive';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('panel') panel: ElementRef;
  @ViewChild(ShapeHostDirective) shapeHost: ShapeHostDirective;

  elements = [];

  constructor(private compFacRes: ComponentFactoryResolver) { }

  ngOnInit() {
    let cmpFac = this.compFacRes.resolveComponentFactory(ClassShapeComponent);
    let viewConRef = this.shapeHost.viewContainerRef;
    viewConRef.clear();

    let compRef = viewConRef.createComponent(cmpFac);
    compRef.instance.name = "somePerson";

    let compRef2 = viewConRef.createComponent(cmpFac);
    compRef2.instance.name = "otherPerson";

    this.elements.push(compRef.instance);
    this.elements.push(compRef2.instance);
    // this.elements.push(shape);
  }

  ngAfterViewInit() {
    // this.panel.nativeElement.width = "100%";
    // this.panel.nativeElement.height = "100%";

    console.log(this.elements);
  }

}
