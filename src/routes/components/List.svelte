<script lang="ts">
	import CardContainer from './CardContainer.svelte';
	import type { Card } from '../../lib/types';

	export let items: Card[] = [];
</script>

<div class="List">
	{#each items as card}
		<CardContainer props={{ card }} />
	{/each}
</div>

<style>
	.List {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		align-content: center;
		gap: 1em;
		padding: 1em;
	}
</style>
