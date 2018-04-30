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

    getMember(element: ClassShapeComponent) {
        let idx = this.existMember(element);
        if(idx >= 0) {
            return this.members[idx];
        }
    }

    setAggregateRoot(element: ClassShapeComponent): boolean  {
        let idx = this.existMember(element);
        if(idx >= 0) {
            // Check if Aggregate Root already exists
            let roots = this.members.filter(elem => elem.isAggregateRoot === true);
            if(roots.length > 1) {
                // only 1 aggregate root may exist
                console.error(new Error("Too many Aggregate Roots for [" + this.name + "]"));
                return false;
            }
            else if(roots.length === 1 && roots[0] !== this.members[idx]) {
                // aggregate root already exists
                console.error(new Error("Already got an aggregate root for [" + this.name + "]"));
                return false;
            }
            else if(roots.length === 0) {
                this.members[idx].isAggregateRoot = true;
                return true;
            }
        }
        return false;
    }

    removeAggregateRoot() {
        this.members.forEach(elem => elem.isAggregateRoot = false);
    }
}
