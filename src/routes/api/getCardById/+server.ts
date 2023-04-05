import { json } from '@sveltejs/kit';
import type { Card } from '../../../models/card';
import { getCardById } from '../../../services/cards';

export const GET = async ({ url }) => {
    const cardId = Number(url.searchParams.get('id'));
    const card: Card = await getCardById(cardId.toString());

	return json(card);
};
