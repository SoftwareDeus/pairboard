<script lang="ts">
	import ListCard from './types/List.svelte';

	import AiOutlineClose from 'svelte-icons-pack/ai/AiOutlineClose';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiSettings from 'svelte-icons-pack/fi/FiSettings';
	import stateStore from '../../../stores/state';
	import type { Card } from '../../../lib/types';
	import List from '../card/types/List.svelte';

	export let card: Card;
	const handleOpenSettings = () => {
		console.log('open settings');
	};

	const handleClose = () => {
		$stateStore.currentCardId = null;
	};
</script>

<div>
	<div class="Header">
		<div class="Text">{card.text}</div>
		<div class="Toolbar">
			<button class="contrast" on:click={handleOpenSettings} id="settings">
				<Icon src={FiSettings} />
			</button>
			<button class="contrast" on:click={handleClose} id="close">
				<Icon src={AiOutlineClose} />
			</button>
		</div>
	</div>
	<List {card} />
	<div class="Footer">Foot</div>
</div>

<style>
	.Text {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: larger;
	}
	.Footer {
		display: grid;
		place-items: end;
		width: 100%;
	}
	.Toolbar {
		display: flex;
		justify-content: space-between;
	}
	.Header {
		padding-top: 4px;
		padding-bottom: 4px;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	Button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: auto;
		margin: 0;
		padding: 8px;
		margin: 6px;
	}
</style>
