<script lang="ts">
	import CardContainer from './card/CardContainer.svelte';
	import type { Card } from '../../../../lib/types';
	import { fly } from 'svelte/transition';
	export let items: Card[] = [];
</script>

<div class="List">
	{#each items as card}
		<div in:fly={{ y: 50, duration: 500 }}><CardContainer props={{ card }} /></div>
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
