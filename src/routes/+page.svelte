<script lang="ts">
	import type { Board, CreateBoardRequest } from '$lib/types';
	import { onMount } from 'svelte';
	import stateStore from '../stores/state';
	import { fly } from 'svelte/transition';

	let boardId = '';
	let newBoardName = '';
	let boards: Board[] = [];

	const getBoards = async () => {
		const response = await fetch('/api/getBoards', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		boards = await response.json();
	};
	const handleCreate = async () => {
		if (!$stateStore.user || newBoardName === '') return;

		let request: CreateBoardRequest = {
			name: newBoardName,
			user_id: $stateStore.user.id
		};

		const response = await fetch('/api/createBoard', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(request)
		});

		await getBoards();
	};
	const handleSearch = async () => {
		if (boardId === '') return;

		const response = await fetch(`/api/getBoardById/?board_id=${boardId}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		return await response.json();
	};
	onMount(async () => {
		await getBoards();
	});
</script>

<div class="container">
	<h1>Boards</h1>

	<div class="boards">
		{#each boards as board}
			<a href={`/board/${board._id}`} in:fly={{ y: 50, duration: 500 }} class="board">
				<b>{board.name}</b>
				<div>{board.user_id}</div>
				<div>{board._id}</div>
				<div>{new Date(board.created_at).toDateString()}</div>
				<div>{new Date(board.updated_at).toDateString()}</div>
			</a>
		{/each}
	</div>
	<form style="display: flex; gap: 1em" on:submit={handleSearch}>
		<input style="flex:8" bind:value={boardId} placeholder="Board..." />
		<button style="flex:1" type="submit">Suchen</button>
	</form>

	<form style="display: flex; gap: 1em" on:submit={handleCreate}>
		<input style="flex:8" placeholder="Name..." bind:value={newBoardName} />
		<button style="flex:1" type="submit">Erstellen</button>
	</form>
</div>

<style>
	h1 {
		text-align: center;
	}
	.board {
		display: flex;
		justify-content: space-between;
		padding: 1em;
		cursor: pointer;
		flex-wrap: wrap;
	}
	.boards {
		padding-bottom: 1em;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
	.board:hover {
		background-color: #f5f5f5;
	}
</style>
