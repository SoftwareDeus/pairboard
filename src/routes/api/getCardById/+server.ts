import { json } from '@sveltejs/kit';
import type { Card } from '../../../models/card';
import { getCardById } from '../../../services/cards';

export const GET = (({ url }) => {
    const cardId = Number(url.searchParams.get('id'));
    const card: Card = getCardById(cardId);

	return json(card);
});
