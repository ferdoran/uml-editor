import { BasicMessage } from "./basic.message";

export class BoundedContextDeletedMessage extends BasicMessage {
	bcName: string;
}