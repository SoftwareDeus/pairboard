import type { CreateEntryRequest, ListEntry } from '$lib/types';
import { json } from '@sveltejs/kit';
import { createEntry } from '../../../services/list';

export const POST = async ({request}) => {
    const createEntryRequest: CreateEntryRequest = await request.json();
    const newEntry: ListEntry = await createEntry(createEntryRequest);
    
	return json(newEntry);
}  ;
