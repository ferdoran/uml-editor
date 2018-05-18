import { Component, OnInit } from '@angular/core';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { ShapeWrapperComponent } from '../../shapes/shape-wrapper/shape-wrapper.component';
import { Subscription } from 'rxjs/Subscription';
import { ClassShapeComponent } from '../../shapes/class-shape/class-shape.component';
import { AggregateService } from '../../services/aggregate.service';
import { BoundedContextService } from '../../services/bounded-context.service';
import { DomUtils } from '../../utils/DomUtils';
import { ElementAttributesChangedMessage } from '../../network/element-attributes-changed.message';
import { SocketService } from '../../services/socket.service';
import { ElementMethodsChangedMessage } from '../../network/element-methods-changed.message';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  subscription: Subscription;
  selectedElement: ShapeWrapperComponent;
  constr: Function;
  newAttrValue: string = "";
  newMethValue: string = "";

  constructor(private shapeSelectorService: ShapeSelectorService, public aggregateService: AggregateService, public bcService: BoundedContextService, private socketService: SocketService) { }


  ngOnInit() {
    this.subscription = this.shapeSelectorService.selectElement.subscribe(elementId => {

      let element = this.shapeSelectorService.getShape(elementId);
      if(DomUtils.isClassShapeComponent(element)) {
        this.selectedElement = element as ClassShapeComponent;
        this.constr = element.constructor;
      }
      else {
        this.selectedElement = null;
        this.constr = null;
      }
    });
    this.shapeSelectorService.deselectElement.subscribe(elementId => {
      if(elementId === this.selectedElement.id) {
        this.selectedElement = null;
        this.constr = null;
      }
    });
  }

  trackFunction(index, item) {
    return index;
  }

  removeAttribute(index: number) {
    let c = this.selectedElement as ClassShapeComponent;
    c.attributes.splice(index, 1);
    c.updateHeights();
    let attrMsg = new ElementAttributesChangedMessage();
    attrMsg.elementId = c.id;
    attrMsg.attributes = c.attributes;
    this.socketService.sendMessage(attrMsg);
  }

  removeMethod(index: number) {
    let c = this.selectedElement as ClassShapeComponent;
    c.methods.splice(index, 1);
    c.updateHeights();
    let attrMsg = new ElementMethodsChangedMessage();
    attrMsg.elementId = c.id;
    attrMsg.methods = c.attributes;
    this.socketService.sendMessage(attrMsg);
  }

  addAttribute() {
    let c = this.selectedElement as ClassShapeComponent;
    c.attributes.push(this.newAttrValue);
    this.newAttrValue = "";
    c.updateHeights();
    let attrMsg = new ElementAttributesChangedMessage();
    attrMsg.elementId = c.id;
    attrMsg.attributes = c.attributes;
    this.socketService.sendMessage(attrMsg);
  }

  addMethod() {
    let c = this.selectedElement as ClassShapeComponent;
    c.methods.push(this.newMethValue);
    this.newMethValue = "";
    c.updateHeights();
    let attrMsg = new ElementMethodsChangedMessage();
    attrMsg.elementId = c.id;
    attrMsg.methods = c.attributes;
    this.socketService.sendMessage(attrMsg);
  }

  selectedAggregate(value) {
    if(value === "0") {
      let agg = this.aggregateService.getAggregateForClass(this.selectedElement as ClassShapeComponent);
      if(agg !== null)
        this.aggregateService.removeAggregateMember(agg.name, this.selectedElement as ClassShapeComponent);
    }
    else {
      this.aggregateService.addAggregateMember(value, this.selectedElement as ClassShapeComponent, false);
    }
  }

  addBoundedContext(bcName) {
    this.bcService.addBoundedContextMember(bcName, this.selectedElement as ClassShapeComponent);
  }

  removeBoundedContext(bcName) {
    this.bcService.removeBoundedContextMember(bcName, this.selectedElement as ClassShapeComponent);
  }

  triggerAggregateRoot(event) {
    console.log("triggered aggregate root change");
    let agg = this.aggregateService.getAggregateForClass(this.selectedElement as ClassShapeComponent);
    if(agg !== null) {
      if(event.checked) {
        if(!agg.setAggregateRoot(this.selectedElement as ClassShapeComponent)){
          event.checked = false;
        }
      }
      else {
        agg.removeAggregateRoot();
      }
    }
    else {
      event.checked = false;
    }
  }

}
