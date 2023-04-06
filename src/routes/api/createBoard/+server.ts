import type { Board, CreateBoardRequest } from '$lib/types';
import { json } from '@sveltejs/kit';
import { createBoard } from '../../../services/boards';

export const POST = async ({request}) => {
    const createBoardRequest: CreateBoardRequest = await request.json();
    const newBoard: Board = await createBoard(createBoardRequest);
    
	return json(newBoard);
}  ;
