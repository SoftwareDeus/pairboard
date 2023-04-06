import type { Board, CreateBoardRequest } from "$lib/types";
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

export async function getBoards(): Promise<Board[]> {
	try {
        const collection = db.collection('boards');
        const boards = await collection.find().toArray();
        return boards as unknown as Board[];
    } catch (e) {
		console.error(e);
        throw e;
    }
}

export async function getBoardById(id: ObjectId): Promise<Board> {
	try {
        const collection = db.collection('boards');
        const board = await collection.findOne({ _id: id });
        return board as unknown as Board;
    } catch (e) {
		console.error(e);
        throw e;
    }
}

export async function createBoard(createBoardRequest: CreateBoardRequest): Promise<Board> {
    	try {
		const collection = db.collection('boards');
		const board = {
			user_id: createBoardRequest.user_id,
			name: createBoardRequest.name,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
		const info = await collection.insertOne(board);
		const lastInsertRowid = info.insertedId;
		const result = { ...board, _id: lastInsertRowid };
		return result;
	} catch (e) {
		console.error(e);
		throw e;
	}
}
