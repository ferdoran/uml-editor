import { BasicMessage } from "./basic.message";

export class BoundedContextChangedMessage extends BasicMessage {
	bcName: string;
	bcMembers: { elementId: string }[];
}