import { json } from '@sveltejs/kit';
import type { Card } from '../../../models/card';
import { createCard } from '../../../services/cards';

export const GET = () => {
    const card: Card = createCard({
        id: "1",
        text: 'test',
    })

	return json(card);
}  ;
