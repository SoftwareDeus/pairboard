import type { Card } from '$lib/types';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { createCard } from '../../../services/cards';

export const POST = async ({request}) => {
	const {board_id, name, cardType} = await request.json();
	if (!board_id) return json({ error: 'Board ID is required' });
	const card: Card = await createCard(name, cardType, new ObjectId(board_id));
	return json(card);
};