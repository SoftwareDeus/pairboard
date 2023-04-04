import { json } from '@sveltejs/kit';
import type { Card } from '../../../models/card';
import { getCards } from '../../../services/cards';
import type { RequestHandler } from './$types';

export const GET = (() => {
    const card: Card[] = getCards();

	return json(card);
}) satisfies RequestHandler;
