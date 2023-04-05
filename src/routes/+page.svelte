<script lang="ts">
	import { _ } from 'svelte-i18n';
	import stateStore from '../stores/state';
	import Card from './components/card/Card.svelte';
	import List from './components/List.svelte';
	import { fly } from 'svelte/transition';
	import type { ObjectId } from 'mongodb';

	async function add() {
		const response = await fetch('/api/createCard', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		response.json().then((data) => ($stateStore.currentCardId = data.id));
	}

	$: cards = [];
	$: card = getCard($stateStore.currentCardId);

	async function get() {
		const response = await fetch('/api/getCards', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		cards = await response.json();
	}

	async function getCard(id: ObjectId | null) {
		if (!id) return;
		const response = await fetch(`/api/getCardById/?id=${id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		return await response.json();
	}
</script>

{#if $stateStore.currentCardId}
	{#await card}
		{$_('loading_label')}
	{:then card}
		<div transition:fly>
			<Card {card} />
		</div>
	{/await}
{:else}
	<div transition:fly>
		<List items={cards} />
		<div style="display: flex;">
			<button class="outline" on:click={add}> {$_('add_card_label')} </button>
			<button class="secondary" on:click={get}> {$_('get_cards_label')}</button>
		</div>
	</div>
{/if}

<style>
</style>
