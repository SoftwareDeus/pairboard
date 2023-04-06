import type { Board } from '$lib/types';
import { json } from '@sveltejs/kit';
import { getBoards } from '../../../services/boards';

export const GET = async () => {
	const boards: Board[] = await getBoards();

	return json(boards);
};
