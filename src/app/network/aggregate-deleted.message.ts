import { BasicMessage } from "./basic.message";

export class AggregateDeletedMessage extends BasicMessage {
	aggregateName: string;
}