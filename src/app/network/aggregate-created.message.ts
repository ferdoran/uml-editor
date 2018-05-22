import { BasicMessage } from "./basic.message";

export class AggregateCreatedMessage extends BasicMessage {
	aggregateName: string;
	color: string;
}