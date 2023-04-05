import type { ListEntry } from '$lib/types';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getEntrysFromList } from '../../../services/list';

export const GET = async ({ url }) => {
	const listId = url.searchParams.get('card_id');
	console.log(listId);
	const entrys: ListEntry[] = await getEntrysFromList(new ObjectId(listId ?? ""));

	return json(entrys);
};
