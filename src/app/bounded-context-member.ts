import { ClassShapeComponent } from "./shapes/class-shape/class-shape.component";

export class BoundedContextMember {
    element: ClassShapeComponent;

    constructor(element: ClassShapeComponent) {
        this.element = element;
    }
}