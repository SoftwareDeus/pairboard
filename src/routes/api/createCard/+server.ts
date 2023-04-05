import { json } from '@sveltejs/kit';
import type { Card } from '../../../models/card';
import { createCard } from '../../../services/cards';

//TODO:Create card is not correct

export const GET = () => {
    const card: Card = createCard({
        id: "1",
        text: 'test',
    })
    console.log(card);
	return json(card);
}  ;
