import { ClassShapeComponent } from "./shapes/class-shape/class-shape.component";

export class AggregateMember {
    element: ClassShapeComponent;
    isAggregateRoot: boolean;

    constructor(element: ClassShapeComponent, isRoot: boolean) {
        this.element = element;
        this.isAggregateRoot = isRoot;
    }
}
