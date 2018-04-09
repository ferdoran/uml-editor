import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, ViewContainerRef, ViewChild, HostListener } from '@angular/core';
import { ShapeWrapperComponent } from '../shape-wrapper/shape-wrapper.component';
import { Subscription } from 'rxjs/Subscription';
import { element } from 'protractor';
import { ShapeSelectorService } from '../../services/shape-selector.service';

@Component({
  selector: 'svg.class-shape ',
  templateUrl: './class-shape.component.html',
  styleUrls: ['./class-shape.component.css']
})
export class ClassShapeComponent extends ShapeWrapperComponent implements OnInit, AfterViewInit {
  stereotype: string = "<<class>>";
  name: string = "Class";
  html: string;
  nameRectHeight: number = 10;
  attrRectHeight: number = 10;
  methRectHeight: number = 10;
  fontSize: number = 10;

  public attributes: string[] = [];
  public methods: string[] = [];

  @ViewChild('nameRect') nameRect: ElementRef;
  @ViewChild('stereotypeText') stereotypeText: ElementRef;
  @ViewChild('nameText') nameText: ElementRef;
  @ViewChild('attrRect') attrRect: ElementRef;
  @ViewChild('methRect') methRect: ElementRef;

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2, protected shapeSelectorService: ShapeSelectorService) {
    super(elementRef, renderer, shapeSelectorService);
  }

  ngOnInit() {
    this.width = 200;
    this.height = 100;
    this.x = 100;
    this.y = 100;

    this.attributes.push("test");
    this.attributes.push("test2");
    this.attributes.push("test3");
    this.attributes.push("test3");

    this.methods.push("meth1()");
    this.methods.push("meth2()");
    this.methods.push("meth3()");
    this.methods.push("meth4()");
    this.updateHeights();
  }

  ngAfterViewInit() {

    this.renderer.setAttribute(this.elementRef.nativeElement, "x", this.x.toString());
    this.renderer.setAttribute(this.elementRef.nativeElement, "y", this.y.toString());
    this.renderer.setAttribute(this.stereotypeText.nativeElement, "x", (this.width / 2).toString());
    this.renderer.setAttribute(this.stereotypeText.nativeElement, "y", (this.nameRectHeight / 2).toString());
    this.renderer.setAttribute(this.nameText.nativeElement, "x", (this.width / 2).toString());
    this.renderer.setAttribute(this.nameText.nativeElement, "y", (this.nameRectHeight / 2 + 10).toString());
    this.renderer.setStyle(this.elementRef.nativeElement, "cursor", "move");
  }

  updateHeights() {
    let nameRectHeight = this.fontSize + this.fontSize * 2;
    this.nameRectHeight = nameRectHeight;

    let attrRectHeight = this.fontSize * (this.attributes.length + 2);
    this.attrRectHeight = attrRectHeight;

    let methRectHeight = this.fontSize * (this.methods.length + 2);
    this.methRectHeight = methRectHeight;

    this.height = nameRectHeight + attrRectHeight + methRectHeight;
  }

}
