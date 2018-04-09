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
}