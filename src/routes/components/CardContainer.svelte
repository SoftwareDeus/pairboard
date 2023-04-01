<script lang="ts">
	import ClickOutside from 'svelte-click-outside';
	import AiOutlineFullscreen from 'svelte-icons-pack/ai/AiOutlineFullscreen';
	import Icon from 'svelte-icons-pack/Icon.svelte';

	enum heights {
		expanded = '600px',
		collapsed = '150px'
	}

	type Props = {
		icon: string;
		text: string;
		id: number;
	};

	type State = {
		isActive: boolean;
		order: number;
	};
	export let props: Props;

	const state: State = {
		isActive: false,
		order: props.id
	};
	let height: string = heights.collapsed;

	const toggleActive = () => {
		if (!state.isActive) {
			state.isActive = !state.isActive;
			height = heights.expanded;
		} else {
			state.isActive = !state.isActive;
			height = heights.collapsed;
		}
	};

	const handleClickOutside = () => {
		if (state.isActive) {
			toggleActive();
		}
	};
</script>

<ClickOutside on:clickoutside={handleClickOutside}>
	<div
		on:dblclick={toggleActive}
		style={`order: ${state.order}; height: ${height}`}
		class="Container"
	>
		<div class="Header">
			<div class="Icon">
				<img src={props.icon} alt="icon" width="24" height="24" />
			</div>
			<div class="Text">{props.text}</div>
		</div>

		<div class="Content">MAIN</div>

		<div class="Footer">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={toggleActive} class="FullScreenIcon">
				<Icon src={AiOutlineFullscreen} />
			</div>
		</div>
	</div>
</ClickOutside>

<style>
	.FullScreenIcon {
		padding-right: 4px;
		cursor: pointer;
	}
	.Footer {
		display: grid;
		place-items: end; 	
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.Header {
		background-color: var(--primary);
		color: #fff;
		display: flex;
		padding-top: 4px;
		padding-bottom: 4px;
		border-top-left-radius: 0.5em;
		border-top-right-radius: 0.5em;
	}
	.Icon {
		display: grid;
		margin-right: 8px;
		margin-left: 2px;
	}
	.Container {
		width: 340px;
		height: 150px;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
		position: relative;
		border-radius: 0.5em;
		transition: height 1s ease-in-out;
	}
</style>
