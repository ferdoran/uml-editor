import { BoundedContextMember } from "./bounded-context-member";
import { ClassShapeComponent } from "./shapes/class-shape/class-shape.component";
import { BoundedContextComponent } from "./shapes/bounded-context/bounded-context.component";

export class BoundedContext {

    name: string;
    color: string;
    members: BoundedContextMember[] = [];
    view: BoundedContextComponent;

    constructor(name: string) {
        this.name = name;
    }

    addMember(element: ClassShapeComponent) {
        if (this.existMember(element) === -1) {
            let member = new BoundedContextMember(element);
            this.members.push(member);
        }
    }

    removeMember(element: ClassShapeComponent) {
        let exists = this.existMember(element);
        if (exists >= 0) {
            this.members.splice(exists, 1);
        }
    }

    existMember(element: ClassShapeComponent): number {
        for (let i = 0; i < this.members.length; i++) {
            if (this.members[i].element === element)
                return i;
        }

        return -1;
    }

    getMember(element: ClassShapeComponent) {
        let idx = this.existMember(element);
        if (idx >= 0) {
            return this.members[idx];
        }
    }

    public updateView() {
        this.view.updateViewBox();
    }
}