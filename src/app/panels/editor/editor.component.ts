import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, HostListener, Renderer2, ComponentRef } from '@angular/core';
import { ClassShapeComponent } from '../../shapes/class-shape/class-shape.component';
import { ShapeWrapperComponent } from '../../shapes/shape-wrapper/shape-wrapper.component';
import { ShapeHostDirective } from '../../directives/shape-host.directive';
import { ShapeDropService } from '../../services/shape-drop.service';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { ShapeConnectionComponent } from '../../shapes/shape-connection/shape-connection.component';
import { DomUtils } from '../../utils/DomUtils';
import { AnchorPointComponent } from '../../shapes/anchor-point/anchor-point.component';
import { Constants } from '../../constants';
import { SocketService } from '../../services/socket.service';
import { EntityComponent } from '../../shapes/entity/entity.component';
import { ValueObjectComponent } from '../../shapes/value-object/value-object.component';
import { AggregateService } from '../../services/aggregate.service';
import { Aggregate } from '../../aggregate';
import { AggregateComponent } from '../../shapes/aggregate/aggregate.component';
import { BoundedContextService } from '../../services/bounded-context.service';
import { BoundedContext } from '../../bounded-context';
import { BoundedContextComponent } from '../../shapes/bounded-context/bounded-context.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('panel') panel: ElementRef;
  @ViewChild(ShapeHostDirective) shapeHost: ShapeHostDirective;

  elements: ComponentRef<ShapeWrapperComponent>[] = [];

  public static readonly GRIDSIZE = 10;
  public static readonly JSON_DOC = "{\"uml-model\": [{\"id\":\"b5e1ac70-d699-4201-8b2a-13472a60d47d\",\"type\":\"Class\",\"stereotype\":\"<<class>>\",\"name\":\"Class123\",\"attributes\":[],\"methods\":[],\"position\":{\"x\":80,\"y\":70},\"dimensions\":{\"width\":200,\"height\":100},\"innerDimensions\":{\"attrRectHeight\":0,\"methRectHeight\":0,\"nameRectHeight\":100},\"style\":{\"fontSize\":10}},{\"id\":\"73604a65-552a-443d-b52e-5535e458797a\",\"type\":\"Class\",\"stereotype\":\"<<class>>\",\"name\":\"COerson\",\"attributes\":[],\"methods\":[],\"position\":{\"x\":560,\"y\":130},\"dimensions\":{\"width\":200,\"height\":100},\"innerDimensions\":{\"attrRectHeight\":0,\"methRectHeight\":0,\"nameRectHeight\":100},\"style\":{\"fontSize\":10}},{\"id\":\"310c567a-4aee-4156-bf86-3d36879bfb71\",\"type\":\"Connection\",\"position\":{\"x\":0,\"y\":0},\"from\":{\"element\":\"b5e1ac70-d699-4201-8b2a-13472a60d47d\",\"anchorPoint\":{\"x\":280,\"y\":95}},\"to\":{\"element\":\"73604a65-552a-443d-b52e-5535e458797a\",\"anchorPoint\":{\"x\":560,\"y\":155}},\"dimensions\":{}}]}";

  constructor(private compFacRes: ComponentFactoryResolver,
    private shapeDropService: ShapeDropService,
    private elementRef: ElementRef,
    private _renderer: Renderer2,
    private _drawConnectionService: DrawConnectionService,
    private socketService: SocketService,
    private aggregateService: AggregateService,
    private bcService: BoundedContextService) { }

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
      else if (droppedData.type === "entity") {
        var x = droppedData.x - this.elementRef.nativeElement.offsetLeft;
        var y = droppedData.y - this.elementRef.nativeElement.offsetTop;
        this.createEntity({ x: x, y: y });
      }
      else if (droppedData.type === "valueobject") {
        var x = droppedData.x - this.elementRef.nativeElement.offsetLeft;
        var y = droppedData.y - this.elementRef.nativeElement.offsetTop;
        this.createValueObject({ x: x, y: y });
      }
    });

    this._drawConnectionService.drawConnection.subscribe(drawData => {
      this.drawPath(drawData.startAnchor, drawData.endAnchor);
    });

    this.aggregateService.aggregateAdded.subscribe(agg => {
      this.createAggregate(agg);
    });

    this.aggregateService.aggregateRemoved.subscribe(agg => {
      let idx = this.elements.findIndex(elem => elem.instance.id === agg.name);
      let elem = this.elements[idx];

      this.elements.splice(idx, 1);
      elem.destroy();
    });

    this.aggregateService.memberAdded.subscribe(data => {

      // remove from other aggregates first
      let oldAgg = this.aggregateService.aggregates.forEach(agg => {
        agg.removeMember(data.element);
      });

      // add to new aggregate
      let agg = this.aggregateService.aggregates.find(element => element.name === data.aggName);
      agg.addMember(data.element, data.isRoot);

      let elem = this.getElementById(data.aggName);
      elem.updateViewBox();
    });

    this.aggregateService.memberRemoved.subscribe(data => {
      let agg = this.aggregateService.aggregates.find(element => element.name === data.aggName);
      agg.removeMember(data.element);

      let elem = this.getElementById(data.aggName);
      elem.updateViewBox();
    });

    ///////////////////////////////
    this.bcService.contextAdded.subscribe(bc => {
      this.createBoundedContext(bc);
    });

    this.bcService.contextRemoved.subscribe(agg => {
      let idx = this.elements.findIndex(elem => elem.instance.id === agg.name);
      let elem = this.elements[idx];

      this.elements.splice(idx, 1);
      elem.destroy();
    });

    this.bcService.memberAdded.subscribe(data => {

      // remove from other aggregates first
      let oldBc = this.bcService.contexts.forEach(bc => {
        bc.removeMember(data.element);
      });

      // add to new aggregate
      let bc = this.bcService.contexts.find(element => element.name === data.bcName);
      bc.addMember(data.element);

      let elem = this.getElementById(data.bcName);
      elem.updateViewBox();
    });

    this.bcService.memberRemoved.subscribe(data => {
      let bc = this.bcService.contexts.find(element => element.name === data.bcName);
      bc.removeMember(data.element);

      let elem = this.getElementById(data.bcName);
      elem.updateViewBox();
    });
  }

  ngAfterViewInit() {
    let compStyle = window.getComputedStyle(this.panel.nativeElement)
    let w = +compStyle.width.replace("px", "");
    let h = +compStyle.height.replace("px", "");


    w = w - w % Constants.GRIDSIZE;
    h = h - h % Constants.GRIDSIZE;
    this._renderer.setStyle(this.panel.nativeElement, "width", w);
    this._renderer.setStyle(this.panel.nativeElement, "height", h);

    // Join Room
    this.socketService.emit('joinRoom', 'UML');+
    this.socketService.emit('message', {room: 'UML', message: 'Hi everybody!'});
    // this.socketService.emit('leaveRoom', 'UML');
    setTimeout(() => {
      // let json = this.serializeElements();
      this.importFromJson(EditorComponent.JSON_DOC);
    }, 2000)
  }

  private drawPath(from: AnchorPointComponent, to: AnchorPointComponent) {
    let cmpFac = this.compFacRes.resolveComponentFactory(ShapeConnectionComponent);
    let cmpViewConRef = this.shapeHost.viewContainerRef;

    let compRef = cmpViewConRef.createComponent(cmpFac, 0);
    compRef.instance.setStartAnchor(from);
    compRef.instance.setEndAnchor(to);
    this.elements.push(compRef);
  }

  private createEntity(position) {
    let cmpFac = this.compFacRes.resolveComponentFactory(EntityComponent);
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

  private createValueObject(position) {
    let cmpFac = this.compFacRes.resolveComponentFactory(ValueObjectComponent);
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

  private createAggregate(aggregate: Aggregate) {
    let cmpFac = this.compFacRes.resolveComponentFactory(AggregateComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac, 0);

    compRef.instance.setId(aggregate.name);
    compRef.instance.agg = aggregate;
    aggregate.view = compRef.instance;
    compRef.instance.updateViewBox();

    this.elements.push(compRef);
  }

  private createBoundedContext(bc: BoundedContext) {
    let cmpFac = this.compFacRes.resolveComponentFactory(BoundedContextComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac, 0);

    compRef.instance.setId(bc.name);
    compRef.instance.bc = bc;
    bc.view = compRef.instance;
    compRef.instance.updateViewBox();

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
      if(element.instance.isDeletable) {
        this.elements.splice(idx, 1);
        element.destroy();
      }
    });
  }

  public serializeElements(): string {
    let elementsJson: string[] = [];
    this.elements.forEach(element => {
      const elemXml = element.instance.serialize();
      elementsJson.push(elemXml);
    });
    let model = "{\"uml-model\": [" + elementsJson  + "]}";
    return model;
  }

  public importFromJson(json: string) {
    let parsed = JSON.parse(json);
    this.elements = [];
    this.shapeHost.viewContainerRef.clear();

    if(parsed && parsed["uml-model"]) {
      let model = parsed["uml-model"];
      model = model.sort((a, b) => {
        if (a.type === "Connection" && b.type === "Class") {
          return 1
        }
        else if (a.type === "Class" && b.type === "Connection") {
          return -1;
        }
        else if ((a.type === "Class" && b.type === "Class") || (a.type === "Connection" && b.type === "Connection")) {
          return 0;
        }
      });
      model.forEach(element => {
        switch(element.type) {
          case "Class":
            this.createClassFromJsonObject(element);
            break;
          case "Connection":
            this.createConnectionFromJsonObject(element);
            break;
        }
      })
    }
    else {
      console.error("Not a valid format");
    }
  }

  createClassFromJsonObject(jsonObj) {
    if(jsonObj.type !== "Class") {
      throw new Error("Not an object of type ClassShape");
    }

    let cmpFac = this.compFacRes.resolveComponentFactory(ClassShapeComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac);
    compRef.instance.setId(jsonObj.id);
    compRef.instance.name = jsonObj.name;
    compRef.instance.stereotype = jsonObj.stereotype;
    compRef.instance.attributes = jsonObj.attributes;
    compRef.instance.methods = jsonObj.methods;
    compRef.instance.fontSize = jsonObj.style.fontSize;
    compRef.instance.nameRectHeight = jsonObj.innerDimensions.nameRectHeight;
    compRef.instance.attrRectHeight = jsonObj.innerDimensions.attrRectHeight;
    compRef.instance.methRectHeight = jsonObj.innerDimensions.methRectHeight;
    compRef.instance.setX(jsonObj.position.x);
    compRef.instance.setY(jsonObj.position.y);
    compRef.instance.setWidth(jsonObj.dimensions.width);
    compRef.instance.setHeight(jsonObj.dimensions.height);

    this.elements.push(compRef);
  }

  createConnectionFromJsonObject(jsonObj) {
    if (jsonObj.type !== "Connection") {
      throw new Error("Not an object of type Connection");

    }

    let element1 = this.getElementById(jsonObj.from.element);
    let element2 = this.getElementById(jsonObj.to.element);

    if (element1 && element2 && (element1.constructor.name !== "ClassShapeComponent" || element2.constructor.name !== "ClassShapeComponent")) {
      throw new Error("From or To Element is not of type ClassShape")
    }

    let from = element1 as ClassShapeComponent;
    let to = element2 as ClassShapeComponent;

    if (!from.hasInitializedView || !from.hasInitializedView) {
      console.debug("Elements not finished rendering yet")
      from.checker.detectChanges();
      to.checker.detectChanges();
    }

    let ap1 = from.getAnchorPointFromCoordinate(jsonObj.from.anchorPoint.x, jsonObj.from.anchorPoint.y);
    let ap2 = to.getAnchorPointFromCoordinate(jsonObj.to.anchorPoint.x, jsonObj.to.anchorPoint.y);

    let cmpFac = this.compFacRes.resolveComponentFactory(ShapeConnectionComponent);
    let cmpViewConRef = this.shapeHost.viewContainerRef;

    let compRef = cmpViewConRef.createComponent(cmpFac, 0);

    compRef.instance.id = jsonObj.id;
    compRef.instance.setStartAnchor(ap1);
    compRef.instance.setEndAnchor(ap2);
    compRef.changeDetectorRef.detectChanges();
    this.elements.push(compRef);
  }

  getElementById(id: string): ShapeWrapperComponent {
    return this.elements.find(element => element.instance.id === id).instance;
  }
}
