<script lang="ts">
	import type { ObjectId } from 'mongodb';
	/*	TODO: Change listId ot cardId in DB for constistency
	TODO: Rename name to text in type and db */
	import type { Card, ListEntry, CreateEntryRequest } from '../../../../../../lib/types';
	import { fly } from 'svelte/transition';
	import Icon from 'svelte-icons-pack';
	import AiOutlineClose from 'svelte-icons-pack/ai/AiOutlineClose';
	import stateStore from '../../../../../../stores/state';

	export let card: Card;

	let items: ListEntry[] = [];

	let newEntry = '';

	async function getEntrys() {
		const response = await fetch(`/api/getEntrysFromList?card_id=${card._id}`);

		items = await response.json();
	}

	async function deleteEntry(entry: ListEntry) {
		await fetch(`/api/deleteEntry?entry_id=${entry._id}`);
	}
	const createEntry = async () => {
		if (!$stateStore.user) return;

		const _entry: CreateEntryRequest = {
			name: newEntry,
			card_id: card._id,
			user_id: $stateStore.user.id
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
	};
	const handleAdd = async () => {
		await createEntry();
		await getEntrys();

		newEntry = '';
	};
	const handleClose = async (entry: ListEntry) => {
		await deleteEntry(entry);
		await getEntrys();
	};
	getEntrys();
</script>

<div class="container">
	<div class="test">
		<div class="list">
			{#each items as item}
				<div in:fly={{ y: 50, duration: 500 }} class="list-item">
					<div style="text-align: center; ">
						{item.name} - {new Date(item.created_at).toTimeString()}
					</div>
					<button on:click={() => handleClose(item)} class="delete-button" style="width: 48px;">
						<Icon size="12px" src={AiOutlineClose} />
					</button>
				</div>
			{/each}
		</div>
	</div>
	<form>
		<input type="text" bind:value={newEntry} />
		<button class="submit-button" on:click={handleAdd}>Add</button>
	</form>
</div>

<style>
	.test {
		overflow-y: scroll;
		padding-right: 1em;
		height: 600px;
	}
	.delete-button {
		justify-self: flex-end;
		margin-bottom: 0;
	}
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
		margin-right: 1em;
		gap: 0.5em;
	}
	.list-item {
		align-items: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.list-item:hover {
		background-color: #f2f2f2;
	}
</style>
