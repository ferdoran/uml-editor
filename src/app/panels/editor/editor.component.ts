import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, HostListener, Renderer2, ComponentRef } from '@angular/core';
import { ClassShapeComponent } from '../../shapes/class-shape/class-shape.component';
import { ShapeWrapperComponent } from '../../shapes/shape-wrapper/shape-wrapper.component';
import { ShapeHostDirective } from '../../directives/shape-host.directive';
import { ShapeDropService } from '../../services/shape-drop.service';
import { DrawConnectionService } from '../../services/draw-connection.service';
import { ShapeConnectionComponent } from '../../shapes/shape-connection/shape-connection.component';
import { DomUtils } from '../../utils/DomUtils';
import { AnchorPointComponent } from '../../shapes/anchor-point/anchor-point.component';
import { SocketService } from '../../services/socket.service';
import { EntityComponent } from '../../shapes/entity/entity.component';
import { ValueObjectComponent } from '../../shapes/value-object/value-object.component';
import { AggregateService } from '../../services/aggregate.service';
import { Aggregate } from '../../aggregate';
import { AggregateComponent } from '../../shapes/aggregate/aggregate.component';
import { BoundedContextService } from '../../services/bounded-context.service';
import { BoundedContext } from '../../bounded-context';
import { BoundedContextComponent } from '../../shapes/bounded-context/bounded-context.component';
import { environment } from '../../../environments/environment'
import { DeletionService } from '../../services/deletion.service';
import { ColorService } from '../../services/color.service';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { ElementCreatedMessage } from '../../network/element-created.message';
import { ElementDeletedMessage } from '../../network/element-deleted.message';
import { ElementMovedMessage } from '../../network/element-moved.message';
import { ElementResizedMessage } from '../../network/element-resized.message';
import { ElementAttributesChangedMessage } from '../../network/element-attributes-changed.message';
import { ElementMethodsChangedMessage } from '../../network/element-methods-changed.message';
import { AggregateCreatedMessage } from '../../network/aggregate-created.message';
import { BoundedContextCreatedMessage } from '../../network/bc-created.message';
import { AggregateChangedMessage } from '../../network/aggregate-changed.message';
import { AggregateDeletedMessage } from '../../network/aggregate-deleted.message';
import { BoundedContextDeletedMessage } from '../../network/bc-deleted.message';
import { BoundedContextChangedMessage } from '../../network/bc-changed.message';
import { ZoomService } from '../../services/zoom.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('panel') panel: ElementRef;
  @ViewChild(ShapeHostDirective) shapeHost: ShapeHostDirective;

  elements: ComponentRef<ShapeWrapperComponent>[] = [];

  public static readonly JSON_DOC = "{\"uml-model\": [{\"id\":\"b5e1ac70-d699-4201-8b2a-13472a60d47d\",\"type\":\"Class\",\"stereotype\":\"<<class>>\",\"name\":\"Class123\",\"attributes\":[],\"methods\":[],\"position\":{\"x\":80,\"y\":70},\"dimensions\":{\"width\":200,\"height\":100},\"innerDimensions\":{\"attrRectHeight\":0,\"methRectHeight\":0,\"nameRectHeight\":100},\"style\":{\"fontSize\":10}},{\"id\":\"73604a65-552a-443d-b52e-5535e458797a\",\"type\":\"Class\",\"stereotype\":\"<<class>>\",\"name\":\"COerson\",\"attributes\":[],\"methods\":[],\"position\":{\"x\":560,\"y\":130},\"dimensions\":{\"width\":200,\"height\":100},\"innerDimensions\":{\"attrRectHeight\":0,\"methRectHeight\":0,\"nameRectHeight\":100},\"style\":{\"fontSize\":10}},{\"id\":\"310c567a-4aee-4156-bf86-3d36879bfb71\",\"type\":\"Connection\",\"position\":{\"x\":0,\"y\":0},\"from\":{\"element\":\"b5e1ac70-d699-4201-8b2a-13472a60d47d\",\"anchorPoint\":{\"x\":280,\"y\":95}},\"to\":{\"element\":\"73604a65-552a-443d-b52e-5535e458797a\",\"anchorPoint\":{\"x\":560,\"y\":155}},\"dimensions\":{}}]}";

  constructor(private compFacRes: ComponentFactoryResolver,
    private shapeDropService: ShapeDropService,
    private elementRef: ElementRef,
    private _renderer: Renderer2,
    private _drawConnectionService: DrawConnectionService,
    private socketService: SocketService,
    private aggregateService: AggregateService,
    private bcService: BoundedContextService,
    private deletionService: DeletionService,
    private colorService: ColorService,
    private shapeSelectorService: ShapeSelectorService,
    private zoomService: ZoomService) { }

  ngOnInit() {
    let classFac = this.compFacRes.resolveComponentFactory(ClassShapeComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    this.shapeDropService.droppedShape.subscribe(droppedData => {
      let selfy = this;

      let pt = this.panel.nativeElement.createSVGPoint();
      pt.x = droppedData.x;
      pt.y = droppedData.y;

      let svgP = pt.matrixTransform(this.panel.nativeElement.getScreenCTM().inverse());
      if (droppedData.type === "class") {
        this.createClassShape({ x: svgP.x, y: svgP.y });
      }
      else if (droppedData.type === "interface") {

      }
      else if (droppedData.type === "entity") {
        this.createEntity({ x: svgP.x, y: svgP.y });
      }
      else if (droppedData.type === "valueobject") {
        this.createValueObject({ x: svgP.x, y: svgP.y });
      }
    });

    this._drawConnectionService.drawConnection.subscribe(drawData => {
      this.drawPath(drawData.startAnchor, drawData.endAnchor);
    });

    this.aggregateService.aggregateAdded.subscribe(agg => {
      this.createAggregate(agg);
      let msg = new AggregateCreatedMessage();
      msg.aggregateName = agg.name;
      msg.color = agg.color;

      this.socketService.sendMessage(msg);
    });

    this.aggregateService.aggregateRemoved.subscribe(agg => {
      let idx = this.elements.findIndex(elem => elem.instance.id === agg.name);
      let elem = this.elements[idx];

      let msg = new AggregateDeletedMessage();
      msg.aggregateName = agg.name;

      this.elements.splice(idx, 1);
      elem.destroy();

      this.socketService.sendMessage(msg);
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

      let memberList: {elementId: string, isRoot: boolean}[] = [];
      agg.members.forEach(member => {
        let m = {elementId: member.element.id, isRoot: member.isAggregateRoot};
        memberList.push(m);
      });

      let msg = new AggregateChangedMessage();
      msg.aggregateName = agg.name;
      msg.aggregateMembers = memberList;

      this.socketService.sendMessage(msg);
    });

    this.aggregateService.memberRemoved.subscribe(data => {
      let agg = this.aggregateService.aggregates.find(element => element.name === data.aggName);
      agg.removeMember(data.element);

      let elem = this.getElementById(data.aggName);
      elem.updateViewBox();

      let memberList: { elementId: string, isRoot: boolean }[] = [];
      agg.members.forEach(member => {
        let m = { elementId: member.element.id, isRoot: member.isAggregateRoot };
        memberList.push(m);
      });

      let msg = new AggregateChangedMessage();
      msg.aggregateName = agg.name;
      msg.aggregateMembers = memberList;

      this.socketService.sendMessage(msg);
    });

    ///////////////////////////////
    this.bcService.contextAdded.subscribe(bc => {
      this.createBoundedContext(bc);

      let msg = new BoundedContextCreatedMessage();
      msg.bcName = bc.name;
      msg.color = bc.color;

      this.socketService.sendMessage(msg);
    });

    this.bcService.contextRemoved.subscribe(bc => {
      let idx = this.elements.findIndex(elem => elem.instance.id === bc.name);
      let elem = this.elements[idx];

      let msg = new BoundedContextDeletedMessage();
      msg.bcName = bc.name;

      this.elements.splice(idx, 1);
      elem.destroy();
      this.socketService.sendMessage(msg);
    });

    this.bcService.memberAdded.subscribe(data => {

      // add to new aggregate
      let bc = this.bcService.contexts.find(element => element.name === data.bcName);
      bc.addMember(data.element);

      let elem = this.getElementById(data.bcName);
      elem.updateViewBox();

      let memberList: {elementId: string}[] = [];
      bc.members.forEach(member => {
        let m = { elementId: member.element.id };
        memberList.push(m);
      });

      let msg = new BoundedContextChangedMessage();
      msg.bcName = bc.name;
      msg.bcMembers = memberList;

      this.socketService.sendMessage(msg);
    });

    this.bcService.memberRemoved.subscribe(data => {
      let bc = this.bcService.contexts.find(element => element.name === data.bcName);
      bc.removeMember(data.element);

      let elem = this.getElementById(data.bcName);
      elem.updateViewBox();

      let memberList: { elementId: string }[] = [];
      bc.members.forEach(member => {
        let m = { elementId: member.element.id };
        memberList.push(m);
      });

      let msg = new BoundedContextChangedMessage();
      msg.bcName = bc.name;
      msg.bcMembers = memberList;

      this.socketService.sendMessage(msg);
    });

    this.deletionService.elementDeleted.subscribe(element => {
      let deletionMsg = new ElementDeletedMessage();
      deletionMsg.elementId = element.id;
      this.socketService.sendMessage(deletionMsg);
      this.destroyElement(element);
    });

    this.socketService.onEvent<ElementCreatedMessage>('ElementCreatedMessage').subscribe(data => {
      console.log("Created Shape: " + data.shape);
      switch(data.shape) {
        case "ClassShapeComponent":
          this.createClassShapeFromEvent(data);
          break;
        case "EntityComponent":
          this.createEntityFromEvent(data);
          break;
        case "ValueObjectComponent":
          this.createValueObjectFromEvent(data);
          break;
      }
    });


    this.zoomService.zoomEvent.subscribe(zoomLevel => {
      let svg = this.panel.nativeElement;
      let compStyle = window.getComputedStyle(svg);
      let w = +compStyle.width.replace("px", "");
      let h = +compStyle.height.replace("px", "");

      let cX = w / 2;
      let cY = h / 2;

      var transformMatrix = [1, 0, 0, 1, 0, 0];

      for(var i = 0; i < 4; i++) {
        transformMatrix[i] *= zoomLevel;
      }
      transformMatrix[4] += (1-zoomLevel) * cX;
      transformMatrix[5] += (1-zoomLevel) * cY;

      var newMatrix = "matrix(" + transformMatrix.join(' ') + ")";
      this._renderer.setAttribute(this.panel.nativeElement, "transform", newMatrix);
    });

    //////////////////// NETWORK MESSAGES

    this.socketService.onEvent<ElementDeletedMessage>('ElementDeletedMessage').subscribe(data => {
      this.destroyElementById(data.elementId);
    });

    this.socketService.onEvent<ElementMovedMessage>('ElementMovedMessage').subscribe(data => {
      let element = this.getElementById(data.elementId);
      element.setX(data.position.x);
      element.setY(data.position.y);
    });

    this.socketService.onEvent<ElementResizedMessage>('ElementResizedMessage').subscribe(data => {
      let element = this.getElementById(data.elementId);
      element.setX(data.position.x);
      element.setY(data.position.y);
      element.setWidth(data.dimension.width);
      element.setHeight(data.dimension.height);
    });

    this.socketService.onEvent<ElementAttributesChangedMessage>('ElementAttributesChangedMessage').subscribe(data => {
      let element = this.getElementById(data.elementId) as ClassShapeComponent;
      element.attributes = data.attributes;
      element.updateHeights();
    });

    this.socketService.onEvent<ElementMethodsChangedMessage>('ElementMethodsChangedMessage').subscribe(data => {
      let element = this.getElementById(data.elementId) as ClassShapeComponent;
      element.attributes = data.methods;
      element.updateHeights();
    });

    this.socketService.onEvent<AggregateCreatedMessage>('AggregateCreatedMessage').subscribe(data => {
      let agg = new Aggregate(data.aggregateName);
      agg.color = data.color;
      this.aggregateService.addAggregate(agg);
      this.createAggregate(agg);
    });

    this.socketService.onEvent<AggregateChangedMessage>('AggregateChangedMessage').subscribe(data => {
      let agg = this.aggregateService.aggregates.find(agg => agg.name === data.aggregateName);
      agg.members = [];
      data.aggregateMembers.forEach(member => {
        let m = this.getElementById(member.elementId) as ClassShapeComponent;
        agg.addMember(m, member.isRoot);
      });

      agg.updateView();
    });

    this.socketService.onEvent<AggregateDeletedMessage>('AggregateDeletedMessage').subscribe(data => {
      let agg = this.aggregateService.aggregates.find(agg => agg.name === data.aggregateName);
      this.destroyElementById(data.aggregateName);
      this.aggregateService.removeAggregate(agg);
    });

    this.socketService.onEvent<BoundedContextCreatedMessage>('BoundedContextCreatedMessage').subscribe(data => {
      let bc = new BoundedContext(data.bcName);
      bc.color = data.color;

      this.bcService.addBoundedContext(bc);
      this.createBoundedContext(bc);
    });

    this.socketService.onEvent<BoundedContextChangedMessage>('BoundedContextChangedMessage').subscribe(data => {
      let bc = this.bcService.contexts.find(con => con.name === data.bcName);
      bc.members = [];
      data.bcMembers.forEach(member => {
        let m = this.getElementById(member.elementId) as ClassShapeComponent;
        bc.addMember(m);
      });

      bc.updateView();
    });

    this.socketService.onEvent<BoundedContextDeletedMessage>('BoundedContextDeletedMessage').subscribe(data => {
      let bc = this.bcService.contexts.find(con => con.name === data.bcName);
      this.bcService.removeBoundedContext(bc);
      this.destroyElementById(data.bcName);
    });
  }

  ngAfterViewInit() {
    let compStyle = window.getComputedStyle(this.panel.nativeElement)
    let w = +compStyle.width.replace("px", "");
    let h = +compStyle.height.replace("px", "");

    this._renderer.setStyle(this.panel.nativeElement, "width", w);
    this._renderer.setStyle(this.panel.nativeElement, "height", h);

    // Join Room
    // this.socketService.emit('joinRoom', 'UML');
    // this.socketService.emit('message', {room: 'UML', message: 'Hi everybody!'});
    // this.socketService.emit('leaveRoom', 'UML');
    // setTimeout(() => {
    //   // let json = this.serializeElements();
    //   this.importFromJson(EditorComponent.JSON_DOC);
    // }, 2000)
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
    x = x - x % environment.gridSize;

    let y = position.y - (compRef.instance.height / 2);
    y = y - y % environment.gridSize;

    compRef.instance.x = x;
    compRef.instance.y = y;

    let msg = new ElementCreatedMessage();
    msg.shape = compRef.instance.constructor.name;
    msg.elementId = compRef.instance.id;
    msg.position = { x: compRef.instance.x, y: compRef.instance.y };
    msg.dimension = { width: compRef.instance.width, height: compRef.instance.height };

    this.elements.push(compRef);
    this.socketService.sendMessage(msg);
  }

  private createValueObject(position) {
    let cmpFac = this.compFacRes.resolveComponentFactory(ValueObjectComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac);
    compRef.instance.name = "Class";

    let x = position.x - (compRef.instance.width / 2);
    x = x - x % environment.gridSize;

    let y = position.y - (compRef.instance.height / 2);
    y = y - y % environment.gridSize;

    compRef.instance.x = x;
    compRef.instance.y = y;

    let msg = new ElementCreatedMessage();
    msg.shape = compRef.instance.constructor.name;
    msg.elementId = compRef.instance.id;
    msg.position = { x: compRef.instance.x, y: compRef.instance.y };
    msg.dimension = { width: compRef.instance.width, height: compRef.instance.height };

    this.elements.push(compRef);
    this.socketService.sendMessage(msg);
  }

  private createClassShape(position) {

    let cmpFac = this.compFacRes.resolveComponentFactory(ClassShapeComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac);
    compRef.instance.name = "Class";

    let x = position.x - (compRef.instance.width / 2);
    x = x - x % environment.gridSize;

    let y = position.y - (compRef.instance.height / 2);
    y = y - y % environment.gridSize;

    compRef.instance.x = x;
    compRef.instance.y = y;

    let msg = new ElementCreatedMessage();
    msg.shape = compRef.instance.constructor.name;
    msg.elementId = compRef.instance.id;
    msg.position = { x: compRef.instance.x, y: compRef.instance.y };
    msg.dimension = { width: compRef.instance.width, height: compRef.instance.height };

    this.elements.push(compRef);
    this.socketService.sendMessage(msg);
  }

  private createClassShapeFromEvent(data: ElementCreatedMessage) {
    let cmpFac = this.compFacRes.resolveComponentFactory(ClassShapeComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac);
    compRef.instance.name = "Class";

    compRef.instance.x = data.position.x;
    compRef.instance.y = data.position.y;
    compRef.instance.width = data.dimension.width;
    compRef.instance.height = data.dimension.height;
    compRef.instance.setId(data.elementId);

    this.elements.push(compRef);
  }

  private createEntityFromEvent(data: ElementCreatedMessage) {
    let cmpFac = this.compFacRes.resolveComponentFactory(EntityComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac);
    compRef.instance.name = "Entity";

    compRef.instance.x = data.position.x;
    compRef.instance.y = data.position.y;
    compRef.instance.width = data.dimension.width;
    compRef.instance.height = data.dimension.height;
    compRef.instance.setId(data.elementId);

    this.elements.push(compRef);
  }

  private createValueObjectFromEvent(data: ElementCreatedMessage) {
    let cmpFac = this.compFacRes.resolveComponentFactory(ValueObjectComponent);
    let classViewConRef = this.shapeHost.viewContainerRef;

    let compRef = classViewConRef.createComponent(cmpFac);
    compRef.instance.name = "Value Object";

    compRef.instance.x = data.position.x;
    compRef.instance.y = data.position.y;
    compRef.instance.width = data.dimension.width;
    compRef.instance.height = data.dimension.height;
    compRef.instance.setId(data.elementId);

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

  private destroyElementById(elementId: string) {
    let element = this.getElementById(elementId);
    this.destroyElement(element);
  }

  private destroyElement(element: ShapeWrapperComponent) {
    let idx = this.elements.findIndex(el => el.instance === element);
    if(idx >= 0) {
      let cmpRef = this.elements[idx];
      this.elements.splice(idx, 1);
      cmpRef.destroy();
    }
  }

  @HostListener('document:keydown', ['$event']) onDeleteKey(event: KeyboardEvent) {
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
        this.shapeSelectorService.deselectElement.next(element.instance.id);
        this.deletionService.elementDeleted.next(element.instance)
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

    if (element1 && element2 && (!DomUtils.isClassShapeComponent(element1) || !DomUtils.isClassShapeComponent(element2))) {
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
