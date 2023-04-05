import { json } from '@sveltejs/kit';
import type { Card } from '../../../models/card';
import { createCard } from '../../../services/cards';

//TODO:Create card is not correct

export  const GET =async () => {
    const card: Card = await createCard({
        id: "1",
        text: 'test',
        type: 'list'
    })
    console.log(card);
	return json(card);
}  ;
