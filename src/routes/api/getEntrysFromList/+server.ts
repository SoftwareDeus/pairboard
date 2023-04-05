import type { ListEntry } from '$lib/types';
import { json } from '@sveltejs/kit';
import { getEntrysFromList } from '../../../services/list';

export const GET = async ({ url }) => {
    const listId = url.searchParams.get('id');
    const entrys: ListEntry[] =await     getEntrysFromList(listId ?? "");

	return json(entrys);
};
