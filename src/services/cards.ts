import { MongoClient, Db } from 'mongodb';
import type { Card } from "$lib/types";
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

export async function getCardById(cardId: string): Promise<Card> {
  try {
    const collection = db.collection('cards');
    const result = await collection.findOne({ id: cardId });
    return result as unknown as Card;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateCard(card: Card): Promise<Card> {
  try {
    const collection = db.collection('cards');
    const result = await collection.updateOne({ id: card.id }, { $set: { text: card.text } });
    return card;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function createCard(card: Card): Promise<Card> {
  try {
    const collection = db.collection('cards');
    const info = await collection.insertOne(card);
    const lastInsertRowid = info.insertedId.toString();
    const result = { ...card, id: lastInsertRowid, listId: lastInsertRowid };
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