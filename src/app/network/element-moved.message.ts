import { BasicElementMessage } from "./element.message";

export class ElementMovedMessage extends BasicElementMessage {
	position: {x: number, y: number};
}