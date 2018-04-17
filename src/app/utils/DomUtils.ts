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
}