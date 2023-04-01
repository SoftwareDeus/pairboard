<script>
	import CardContainer from './CardContainer.svelte';

	let items = [
		{ icon: 'favicon.png', text: 'Test1', id: 1 },
		{ icon: 'favicon.png', text: 'Test2', id: 2 },
		{ icon: 'favicon.png', text: 'Test3', id: 3 },
		{ icon: 'favicon.png', text: 'Test4', id: 4 },
		{ icon: 'favicon.png', text: 'Test5', id: 5 },
		{ icon: 'favicon.png', text: 'Test6', id: 6 },
		{ icon: 'favicon.png', text: 'Test7', id: 7 },
		{ icon: 'favicon.png', text: 'Test8', id: 8 },
		{ icon: 'favicon.png', text: 'Test9', id: 9 }
	];
</script>

<div class="List">
	{#each items as item}
		<CardContainer props={item} />
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
