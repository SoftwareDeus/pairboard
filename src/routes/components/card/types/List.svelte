<script lang="ts">
	import type { ObjectId } from 'mongodb';
	/*	TODO: Change listId ot cardId in DB for constistency
	TODO: Rename name to text in type and db */
	import type { Card, ListEntry, CreateEntryRequest } from '../../../../lib/types';
	import { fly } from 'svelte/transition';
	import Icon from 'svelte-icons-pack';
	import AiOutlineClose from 'svelte-icons-pack/ai/AiOutlineClose';

	export let card: Card;

	let items: ListEntry[] = [];

	let newEntry = '';

	async function getEntrys() {
		const response = await fetch(`/api/getEntrysFromList?card_id=${card._id}`);

		items = await response.json();
		console.log(items, 'getItems');
	}
	async function createEntry() {
		const _entry: CreateEntryRequest = {
			name: newEntry,
			card_id: card._id
		};

		const body = JSON.stringify(_entry);
		const response = await fetch('/api/createEntry', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: body
		});

		return await response.json();
	}
	const handleAdd = () => {
		createEntry();
		getEntrys();
		newEntry = '';
	};

	getEntrys();
</script>

<div class="container">
	<div class="list">
		{#each items as item}
			<div in:fly class="list-item">
				<div
					style="font-size:larger; display:flex; justify-content:center; width:100%; text-align:center"
				>
					{item.name}
				</div>
				<button style="width: 48px">
					<Icon size="16px" src={AiOutlineClose} />
				</button>
			</div>
		{/each}
	</div>
	<form>
		<input type="text" bind:value={newEntry} />
		<button class="submit-button" on:click={handleAdd}>Add</button>
	</form>
</div>

<style>
	.submit-button {
		flex: 1;
	}
	input {
		flex: 9;
	}

	form {
		display: flex;
		flex-direction: row;
		gap: 1em;
		padding-top: 0.5em;
	}
	.list {
		display: flex;
		flex-direction: column;
	}
	.list-item {
		display: flex;
		flex-direction: row;
		padding: 0.5em;
		justify-content: space-between;
		cursor: pointer;
		align-items: center;
	}

	.list-item:hover {
		background-color: #f2f2f2;
	}
</style>
