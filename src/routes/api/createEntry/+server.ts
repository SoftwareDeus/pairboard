import type { ListEntry } from '$lib/types';
import { json } from '@sveltejs/kit';
import { createEntry } from '../../../services/list';

export const POST = (entry: ListEntry) => {
    const newEntry: ListEntry= createEntry(entry);

	return json(newEntry);
}  ;
