import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[shapeHost]'
})
export class ShapeHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
