<script lang="ts">
	import { _ } from 'svelte-i18n';
	import stateStore from '../../../stores/state';
	import Card from './components/card/Card.svelte';
	import List from './components/List.svelte';
	import type { ObjectId } from 'mongodb';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let board_id = $page.params.board_id;
	let newCardName = '';
	async function add() {
		const response = await fetch(`/api/createCard/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				name: newCardName,
				board_id: board_id,
				cardType: newCardType
			})
		});

		const result = await response.json();
		getCards();
	}

	$: cards = [];
	$: card = getCardById($stateStore.currentCardId);

	async function getCards() {
		const response = await fetch(`/api/getCardsByBoardId/?board_id=${board_id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		cards = await response.json();
	}

	async function getCardById(id: ObjectId | null) {
		if (!id) return;
		const response = await fetch(`/api/getCardById/?id=${id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		return await response.json();
	}
	onMount(() => {
		getCards();
	});
	import { CardType } from '$lib/enums';
	let newCardType = CardType.List;
</script>

{#if $stateStore.currentCardId}
	{#await card}
		{$_('loading_label')}
	{:then card}
		<div>
			<Card {card} />
		</div>
	{/await}
{:else}
	<div in:fly={{ y: 50, duration: 500 }}>
		<List items={cards} />
		<div style="display: flex; flex-direction:column">
			<form style="display: flex; flex-direction:row; gap: 1em;">
				<input required placeholder="Name..." style="flex:8" type="text" bind:value={newCardName} />
				<select bind:value={newCardType} style="flex: 5">
					<option value={CardType.Calender}>Calender</option>
					<option value={CardType.Chat}>Chat</option>
					<option value={CardType.List}>List</option>
					<option value={CardType.Note}>Note</option>
					<option value={CardType.Todo}>Todo</option>
				</select>
				<button style="flex:1" class="outline" on:click={add}> {$_('add_card_label')} </button>
			</form>
		</div>
	</div>
{/if}

<style>
</style>
