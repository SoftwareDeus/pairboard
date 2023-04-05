import type { Card } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { ObjectId } from 'mongodb';
import { getCardById } from '../../../services/cards';

export const GET = async ({ url }) => {
	const cardId = url.searchParams.get('id');
	console.log(cardId, "MEEP");
	const card: Card = await getCardById(cardId as unknown as ObjectId);

	return json(card);
};
