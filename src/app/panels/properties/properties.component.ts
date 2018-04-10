import { Component, OnInit } from '@angular/core';
import { ShapeSelectorService } from '../../services/shape-selector.service';
import { ShapeWrapperComponent } from '../../shapes/shape-wrapper/shape-wrapper.component';
import { Subscription } from 'rxjs/Subscription';
import { ClassShapeComponent } from '../../shapes/class-shape/class-shape.component';

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

  constructor(private shapeSelectorService: ShapeSelectorService) { }


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

}