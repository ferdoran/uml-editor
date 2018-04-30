import { Component, OnInit, ElementRef, Renderer2, AfterViewInit, ViewContainerRef, ViewChild, HostListener, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { ShapeWrapperComponent } from '../shape-wrapper/shape-wrapper.component';
import { Subscription } from 'rxjs/Subscription';
import { element } from 'protractor';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { AnchorPointComponent } from '../anchor-point/anchor-point.component';
import { AggregateService } from '../../services/aggregate.service';

@Component({
  selector: 'svg.class-shape ',
  templateUrl: './class-shape.component.html',
  styleUrls: ['./class-shape.component.css'],
  providers: [AnchorPointComponent]
})
export class ClassShapeComponent extends ShapeWrapperComponent implements OnInit, AfterViewInit {
  stereotype: string = "<<class>>";
  name: string = "Class";
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
  @ViewChild('resizeRect') resizeGroup: ElementRef;
  @ViewChild('displayGroup') displayGroup: ElementRef;
  @ViewChild('anchorPointsWrapper') protected anchorPointsWrapper: ElementRef;
  @ViewChildren(AnchorPointComponent) anchorPoints: QueryList<AnchorPointComponent>;

  constructor(public checker: ChangeDetectorRef,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected shapeSelectorService: ShapeSelectorService,
    protected drawConnectionService: DrawConnectionService,
    protected aggregateService: AggregateService)
  {
    super(elementRef, renderer, shapeSelectorService, drawConnectionService);
    this.width = 200;
    this.height = 100;
  }

  ngOnInit() {
    this.updateHeights();
    this.type = "Class";
  }

  ngAfterViewInit() {
    this.setX(this.x);
    this.setY(this.y);
    this.renderer.setStyle(this.elementRef.nativeElement, "cursor", "move");
    this.renderer.setAttribute(this.elementRef.nativeElement, "width", this.width.toString());
    this.renderer.setAttribute(this.elementRef.nativeElement, "height", this.height.toString());

    this.resizeShape = this.resizeGroup;
    this.updateViewBox();
    this.hasInitializedView = true;
  }

  updateHeights() {
    let nameRectHeight = this.fontSize + this.fontSize * 2;
    if(this.attributes.length === 0 && this.methods.length === 0) {
      nameRectHeight *= 2;
    }
    // this.nameRectHeight = nameRectHeight;

    let attrRectHeight = 0;
    if(this.attributes.length > 0) {
      attrRectHeight = this.fontSize * (this.attributes.length + 2);
    }
    // this.attrRectHeight = attrRectHeight;

    let methRectHeight = 0;
    if(this.methods.length > 0) {
      methRectHeight = this.fontSize * (this.methods.length + 2);
    }
    // this.methRectHeight = methRectHeight;

    let innerHeight = nameRectHeight + attrRectHeight + methRectHeight;
    let heightRatio = this.height / innerHeight;

    this.nameRectHeight = nameRectHeight * heightRatio;
    this.attrRectHeight = attrRectHeight * heightRatio;
    this.methRectHeight = methRectHeight * heightRatio;

    // this.setHeight(nameRectHeight + attrRectHeight + methRectHeight);
  }

  public getAnchorPointFromCoordinate(x: number, y: number): AnchorPointComponent {
    if(this.anchorPoints) {
      return this.anchorPoints.find(ap => {
        if (ap.getRealX() === x && ap.getRealY() === y)
          return true;
        return false;
      });
    }
  }

  public setX(x: number) {
    // console.log("changed x[%s] to [%s]", this.x, x);
    this.x = x;
    this.renderer.setAttribute(this.elementRef.nativeElement, "x", this.x.toString());
    this.renderer.setAttribute(this.stereotypeText.nativeElement, "x", (this.width / 2).toString());
    this.renderer.setAttribute(this.nameText.nativeElement, "x", (this.width / 2).toString());
    this.updateAggregate();
  }

  public setHeight(h: number) {
    if(h > 0) {
      this.height = h;
      this.renderer.setAttribute(this.elementRef.nativeElement, "height", this.height.toString());
      this.updateViewBox();
      this.updateHeights();
      this.updateAggregate();
    }
  }

  public setWidth(w: number) {
    if(w > 0) {
      this.width = w;
      this.renderer.setAttribute(this.elementRef.nativeElement, "width", this.width.toString());
      this.updateViewBox();
      this.updateAggregate();
    }
  }

  protected updateAggregate() {
    let agg = this.aggregateService.getAggregateForClass(this);
    if(agg) {
      agg.updateView();
    }
  }

  public setY(y: number) {
    // console.log("changed y[%s] to [%s]", this.y, y);
    this.y = y;
    this.renderer.setAttribute(this.elementRef.nativeElement, "y", this.y.toString());
    this.renderer.setAttribute(this.stereotypeText.nativeElement, "y", (this.nameRectHeight / 2).toString());
    this.renderer.setAttribute(this.nameText.nativeElement, "y", (this.nameRectHeight / 2 + 10).toString());
    this.updateAggregate();
  }

  startResize(event: MouseEvent, direction: string) {
    event.preventDefault();
    event.stopPropagation();
    this.isResizing = true;
    this.resizeDirection = direction;
  }


  stopResize(event: MouseEvent) {
    event.preventDefault();
    if(this.isResizing) {
      this.isResizing = false;
      this.resizeDirection = "";
    }
  }

  public serialize(): string {
    let s = {
      id: this.id,
      type: this.type,
      stereotype: this.stereotype,
      name: this.name,
      attributes: this.attributes,
      methods: this.methods,
      position: {
        x: this.x,
        y: this.y
      },
      dimensions: {
        width: this.width,
        height: this.height
      },
      innerDimensions: {
        attrRectHeight: this.attrRectHeight,
        methRectHeight: this.methRectHeight,
        nameRectHeight: this.nameRectHeight
      },
      style: {
        fontSize: this.fontSize
      }
    };
    return JSON.stringify(s);
  }

}
