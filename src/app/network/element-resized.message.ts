import { BasicElementMessage } from "./element.message";

export class ElementResizedMessage extends BasicElementMessage {
	position: {x: number, y:number};
	dimension: {width: number, height: number};
}