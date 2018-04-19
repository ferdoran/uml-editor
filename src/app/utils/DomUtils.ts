import { ShapeWrapperComponent } from "../shapes/shape-wrapper/shape-wrapper.component";

export class DomUtils {

    public static isChildOf(child: HTMLElement, id: string): boolean {

        if(child.id === id)
            return true;

        let parent = child;
        while(parent) {
            if(parent.id === id) {
                return true;
            }
            else {
                parent = parent.parentElement;
            }
        }

        return false;
    }

    public static drawPath(startPoint: { x: number, y: number }, endPoint: { x: number, y: number }, drawStraight: boolean = true): string {

        let d = "M"; // Move to position first
        if(drawStraight) {
            d += startPoint.x + " " + startPoint.y + " ";
            d += "L" + startPoint.x + " " + startPoint.y + " ";
            d += "L" + endPoint.x + " " + endPoint.y + " ";
        }
        d += "Z"; // Close path

        return d;
    }

    public static isClickOutsideShape(shape: ShapeWrapperComponent, event: MouseEvent) {
        let minX, maxX, minY, maxY;
        if(shape.constructor.name !== "ShapeConnectionComponent") {
            minX = shape.x;
            maxX = shape.x + (shape.width);
            minY = shape.y;
            maxY = shape.y + (shape.height);
        }
        else {
            let x1 = shape['startAnchor'].getRealX();
            let y1 = shape['startAnchor'].getRealY();
            let x2 = shape['endAnchor'].getRealX();
            let y2 = shape['endAnchor'].getRealY();

            minX = Math.min(x1, x2);
            maxX = Math.max(x1, x2);
            minY = Math.min(y1, y2);
            maxY = Math.max(y1, y2);
        }

        return (event.offsetX < minX || event.offsetX > maxX || event.offsetY < minY || event.offsetY > maxY);
    }
}