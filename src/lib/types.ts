import type { ObjectId } from 'mongodb';

export type Card = {
	_id: ObjectId;
	index: number;
	text: string;
	type: string;
	created_at: string;
	updated_at: string;
};

export type ListEntry = {
	_id: ObjectId;
	index: number;
	card_id: ObjectId;
	name: string;
	created_at: string;
	updated_at: string;
};

export type CreateEntryRequest = {
	name: string;
	card_id: ObjectId;
};
