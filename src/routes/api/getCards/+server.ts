import { json } from '@sveltejs/kit';
import type { Card } from '../../../models/card';
import { getCards } from '../../../services/cards';
import type { RequestHandler } from './$types';

export const GET = (async () => {
    const cards: Card[] = await getCards();

	return json(cards);
}) satisfies RequestHandler;
