<script lang="ts">
	import stateStore from '../stores/state';
	import Card from './components/card/Card.svelte';
	import List from './components/List.svelte';
	import { fly } from 'svelte/transition';

	async function add() {
		const response = await fetch('/api/createCard', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		response.json().then((data) => ($stateStore.currentCardId = data.id));
	}

	export let data;
	$: cards = [];
	$: card = getCardFromStore($stateStore.currentCardId ?? '');

	async function getCardFromStore(id: string) {
		return await getCard(id);
	}

	async function get() {
		const response = await fetch('/api/getCards', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		cards = await response.json();
	}

	async function getCard(id: string) {
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
		Loading
	{:then card}
		<div transition:fly>
			<Card {card} />
		</div>
	{/await}
{:else}
	<div transition:fly>
		<List items={cards} />
		<div style="display: flex;">
			<button class="outline" on:click={add}> Add Card </button>
			<button class="secondary" on:click={get}> Get Cards </button>
		</div>
	</div>
{/if}

<style>
</style>
