<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import getIcon from './hooks/getIcon';

	export let cardType: number;
</script>

<div class="icon">
	<Icon size={'64px'} src={getIcon(cardType)} />
</div>

<style>
	.icon {
		width: 100%;
		height: 100%;
		display: flex;
		padding-top: 1em;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
