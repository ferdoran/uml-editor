import { BasicMessage } from "./basic.message";

export class BoundedContextCreatedMessage extends BasicMessage {
	bcName: string;
	color: string;
}