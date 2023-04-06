import { MongoClient, Db, ObjectId } from 'mongodb';
import type { CreateEntryRequest, ListEntry } from '$lib/types';
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

export async function getEntrysFromList(card_id: ObjectId): Promise<ListEntry[]> {
	try {
		const collection = db.collection('listEntrys');
		const result = await collection.find({ card_id }).toArray();
		return result as unknown as ListEntry[];
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function getEntryById(entryId: string): Promise<ListEntry> {
	try {
		const collection = db.collection('listEntrys');
		const result = await collection.findOne({ id: entryId });
		return result as unknown as ListEntry;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function updateEntry(entry: ListEntry): Promise<ListEntry> {
	try {
		const collection = db.collection('listEntrys');
		const result =
			await collection.updateOne({ _id: entry._id }, { $set: { text: entry.name } });
		return entry;
	} catch (e) {
		console.error(e);
		throw e;
	}
}

export async function deleteEntry(entryId: ObjectId) {
	try {
		const collection = db.collection('listEntrys');
		collection.findOneAndDelete({ _id: entryId });
	}
	catch(e) {
		console.error(e);
		throw e;
	}
}

export async function createEntry(
	{ card_id, name, user_id }: CreateEntryRequest
): Promise<ListEntry> {
	try {
		const collection = db.collection('listEntrys');
		const entry = {
			index: (await collection.countDocuments()) + 1,
			card_id: new ObjectId(card_id),
			name,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			user_id
		};
		const info = await collection.insertOne(entry);
		const lastInsertRowid = info.insertedId;
		const result = { ...entry, _id: lastInsertRowid };
		return result;
	} catch (e) {
		console.error(e);
		throw e;
	}
}
