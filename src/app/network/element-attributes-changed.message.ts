import { BasicElementMessage } from "./element.message";

export class ElementAttributesChangedMessage extends BasicElementMessage {
	attributes: string[];
}