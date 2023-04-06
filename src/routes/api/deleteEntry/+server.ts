import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { deleteEntry } from '../../../services/list';

export const GET = async ({ url }) => {
	const entryId = url.searchParams.get('entry_id');
	await deleteEntry(new ObjectId(entryId ?? ""));

	return json(true);
};
