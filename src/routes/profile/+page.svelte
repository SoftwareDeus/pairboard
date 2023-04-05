<script>
	import Login from './components/Login.svelte';
	import stateStore from '../../stores/state';
	import { _ } from 'svelte-i18n';
</script>

{#if $stateStore.user === null}
	<Login />
{:else}
	<div class="container">
		<div class="user-info">
			<h4>User</h4>
			<img src={$stateStore.user.photoUrl} alt="" />
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>
				{$_('name_label')}
				<div>{$stateStore.user.name}</div>
			</label>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>
				{$_('email_label')}
				<div>{$stateStore.user.email}</div>
			</label>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>
				{$_('verified_label')}
				<div>{$stateStore.user.verified ? $_('yes_label') : $_('no_label')}</div>
			</label>
			<button
				on:click={() => {
					$stateStore.user = null;
				}}
			>
				{$_('logout_label')}
			</button>
		</div>
	</div>
{/if}

<style>
	.user-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	label {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-weight: bold;
		width: 100%;
	}
</style>
