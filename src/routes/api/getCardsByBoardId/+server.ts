import type { Card } from '$lib/types';
import { json } from '@sveltejs/kit';
import { getCardsByBoardId } from '../../../services/cards';

export const GET = async ({url}) => {
	const boardId = url.searchParams.get('board_id');
	if (!boardId || boardId === "") 
		return json({error: "Board ID is required"});

	const cards: Card[] = await getCardsByBoardId(boardId);

	return json(cards);
};

