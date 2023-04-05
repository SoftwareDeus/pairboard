<script lang="ts">
	/*
	TODO: Change listId ot cardId in DB for constistency
	TODO: Rename name to text in type and db
	*/
	import type { Card, ListEntry } from '../../../../lib/types';

	export let card: Card;

	let items: ListEntry[] = [];

	let newEntry = '';

	async function createEntry() {
		const _entry: ListEntry = {
			id: '1',
			name: newEntry,
			listId: card.id,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		};

		const body = JSON.stringify(_entry);

		const response = await fetch('/api/createEntry', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: body
		});

		const test = await response.json();
		return test;
	}
	const handleAdd = () => {
		createEntry();
		newEntry = '';
	};
</script>

<div class="list">
	{#each items as item}
		<div class="list-item">
			{item.name}
		</div>
	{/each}
</div>
<form>
	<input type="text" bind:value={newEntry} />
	<button on:click={handleAdd}>Add</button>
</form>

<style>
</style>
