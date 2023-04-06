import { MongoClient, Db, ObjectId } from 'mongodb';
import type { Card } from '$lib/types';
import { MONGODB_URI } from '$env/static/private';

const uri = MONGODB_URI ?? process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db: Db;

async function connectDB() {
	try {
		await client.connect();
		console.log('Connected successfully to server');
		db = client.db('mydb');
	} catch (e) {
		console.error(e);
		throw e;
	}
}

await connectDB();

export async function getCards(): Promise<Card[]> {
	try {
		const collection = db.collection('cards');
		const result = await collection.find().toArray();
		return result as unknown as Card[];
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getCardsByBoardId(boardId: string): Promise<Card[]> {
	try {
		const collection = db.collection('cards');
		const result = await collection.find({board_id: new ObjectId(boardId)}).toArray();

		return result as unknown as Card[];
	}
		catch (e) {
			console.error(e);
			throw e;
		}
	}


export async function getCardById(cardId: ObjectId): Promise<Card> {
	try {
		(cardId);
		const collection = db.collection('cards');
		const result = await collection.findOne({ _id: new ObjectId(cardId) });
		return result as unknown as Card;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function updateCard(card: Card): Promise<Card> {
	try {
		const collection = db.collection('cards');
      await collection.updateOne({ id: card.index }, { $set: { text: card.text } });
		return card;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function createCard(text: string, typeId: number, board_id: ObjectId): Promise<Card> {
	try {
		const collection = db.collection('cards');
		const card = {
			index: (await collection.countDocuments()) + 1,
			text,
			typeId: typeId,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			board_id
		};
		const info = await collection.insertOne(card);
		const lastInsertRowid = info.insertedId;
		const result = { ...card, _id: lastInsertRowid };
		return result;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function deleteCard(cardId: string): Promise<void> {
	try {
		const collection = db.collection('cards');
		await collection.deleteOne({ id: cardId });
	} catch (e) {
		console.error(e);
		throw e;
	}
}
