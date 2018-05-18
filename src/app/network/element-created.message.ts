import { BasicElementMessage } from "./element.message";

export class ElementCreatedMessage extends BasicElementMessage {
	position: {x: number, y: number};
	dimension: {width: number, height: number}
	shape: string;
}