import { MongoClient, Db } from 'mongodb';
import type { ListEntry } from "$lib/types";
import { MONGODB_URI } from '$env/static/private';

const uri = MONGODB_URI ?? process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db: Db;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db('mydb');
  } catch (e) {
    console.error(e);
    throw e;
  }
}

connectDB();

export async function getEntrysFromList(listId: string): Promise<ListEntry[]> {
  try {
    const collection = db.collection('listEntry');
    const result = await collection.find({ list_id: listId }).toArray();
    return result as unknown as ListEntry[];
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getEntryById(entryId: string): Promise<ListEntry> {
  try {
    const collection = db.collection('listEntry');
    const result = await collection.findOne({ id: entryId });
    return result as unknown as ListEntry;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateEntry(entry: ListEntry): Promise<ListEntry> {
  try {
    const collection = db.collection('listEntry');
    const result = await collection.updateOne({ id: entry.id }, { $set: { text: entry.name } });
    return entry;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function createEntry(entry: ListEntry): Promise<ListEntry> {
  try {
    const collection = db.collection('listEntry');
    const info = await collection.insertOne(entry);
    const lastInsertRowid = info.insertedId.toString();
    const result = { ...entry, id: lastInsertRowid, listId: lastInsertRowid };
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}