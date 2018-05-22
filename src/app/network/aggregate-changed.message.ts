import { BasicMessage } from "./basic.message";

export class AggregateChangedMessage extends BasicMessage {
	aggregateName: string;
	aggregateMembers: {elementId: string, isRoot: boolean}[];
}