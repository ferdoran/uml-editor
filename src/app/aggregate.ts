import { AggregateMember } from "./aggregate-member";
import { ClassShapeComponent } from "./shapes/class-shape/class-shape.component";

export class Aggregate {
    name: string;
    color: string;
    members: AggregateMember[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addMember(element: ClassShapeComponent, isRoot: boolean) {
        if(this.existMember(element) === -1) {
            let member = new AggregateMember(element, isRoot);
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
        for(let i=0; i < this.members.length; i++) {
            if(this.members[i].element === element)
                return i;
        }

        return -1;
    }
}
