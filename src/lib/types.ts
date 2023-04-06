import type { ObjectId } from 'mongodb';

export type Board = {
	_id: ObjectId;
	name: string;
	created_at: string;
	updated_at: string;
	user_id: string;
}
export type Card = {
	_id: ObjectId;
	board_id: ObjectId;
	index: number;
	text: string;
	typeId: number;
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
	user_id: string;
};

export type CreateEntryRequest = {
	name: string;
	card_id: ObjectId;
	user_id: string;
};

export type CreateBoardRequest = {
	name: string;
	user_id: string;
}
