import { BasicElementMessage } from "./element.message";

export class ElementMethodsChangedMessage extends BasicElementMessage {
	methods: string[];
}