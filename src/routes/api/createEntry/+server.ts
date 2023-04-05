import type { ListEntry } from '$lib/types';
import { json } from '@sveltejs/kit';
import { createEntry } from '../../../services/list';

export const POST = async ({request}) => {
    const entry = await request.json();
    const newEntry: ListEntry = await createEntry(entry);
    
	return json(newEntry);
}  ;
