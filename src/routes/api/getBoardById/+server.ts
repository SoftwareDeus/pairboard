import type { Board } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { ObjectId } from 'mongodb';
import { getBoardById } from '../../../services/boards';

export const GET = async ({ url }) => {
	const boardId = url.searchParams.get('board_id');
    const board: Board = await getBoardById(boardId as unknown as ObjectId);

	return json(board);
};
