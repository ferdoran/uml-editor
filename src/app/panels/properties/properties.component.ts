import { Component, OnInit } from '@angular/core';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { ShapeWrapperComponent } from '../../shapes/shape-wrapper/shape-wrapper.component';
import { Subscription } from 'rxjs/Subscription';
import { ClassShapeComponent } from '../../shapes/class-shape/class-shape.component';
import { AggregateService } from '../../services/aggregate.service';
import { BoundedContextService } from '../../services/bounded-context.service';

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

  constructor(private shapeSelectorService: ShapeSelectorService, public aggregateService: AggregateService, public bcService: BoundedContextService) { }


  ngOnInit() {
    this.subscription = this.shapeSelectorService.selectElement.subscribe(elementId => {

      let element = this.shapeSelectorService.getShape(elementId);
      this.selectedElement = element as ClassShapeComponent;
      this.constr = element.constructor;
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
  }

  removeMethod(index: number) {
    let c = this.selectedElement as ClassShapeComponent;
    c.methods.splice(index, 1);
    c.updateHeights();
  }

  addAttribute() {
    let c = this.selectedElement as ClassShapeComponent;
    c.attributes.push(this.newAttrValue);
    this.newAttrValue = "";
    c.updateHeights();
  }

  addMethod() {
    let c = this.selectedElement as ClassShapeComponent;
    c.methods.push(this.newMethValue);
    this.newMethValue = "";
    c.updateHeights();
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

  selectedBoundedContext(value) {
    if (value === "0") {
      let bc = this.bcService.getBoundedContextForClass(this.selectedElement as ClassShapeComponent);
      if (bc !== null)
        this.bcService.removeBoundedContextMember(bc.name, this.selectedElement as ClassShapeComponent);
    }
    else {
      this.bcService.addBoundedContextMember(value, this.selectedElement as ClassShapeComponent);
    }
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
