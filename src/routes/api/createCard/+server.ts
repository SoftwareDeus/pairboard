import type { Card } from '$lib/types';
import { json } from '@sveltejs/kit';
import { createCard } from '../../../services/cards';

//TODO:Create card is not correct, needs createCardRequest 
export const GET = async () => {
	const card: Card = await createCard('test', 'list');
	return json(card);
};
