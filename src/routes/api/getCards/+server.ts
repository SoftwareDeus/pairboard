import type { Card } from '$lib/types';
import { json } from '@sveltejs/kit';
import { getCards } from '../../../services/cards';

export const GET = async () => {
	const cards: Card[] = await getCards();

	return json(cards);
};
