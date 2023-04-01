<script lang="ts">
	import '@picocss/pico';
	import { isLoading } from 'svelte-i18n';
	import { initializeApp } from 'firebase/app';
	import { waitLocale } from 'svelte-i18n';
	import { currentLocale } from '../lib/i18n';
	import stateStore from '../stores/state';

	import { _ } from 'svelte-i18n';

	const firebaseConfig = {
		apiKey: 'AIzaSyAohTU1EYedY09eD7aC-EsS9irUQDFR3_Y',

		authDomain: 'pairboard-8d78d.firebaseapp.com',

		projectId: 'pairboard-8d78d',

		storageBucket: 'pairboard-8d78d.appspot.com',

		messagingSenderId: '322665135679',

		appId: '1:322665135679:web:668fb1d8dcd4508016028a',

		measurementId: 'G-TWGZF7JZZP'
	};

	const app = initializeApp(firebaseConfig);
	waitLocale().then(() => {
		currentLocale.set('en');
	});
</script>

<nav>
	{#if $isLoading}
		Loading
	{:else}
		<a href="/">{$_('home_label')}</a>
		<a href="/profile">
			<img style="height: 32px" src={$stateStore.user?.photoUrl} alt="" />
			{#if $stateStore.user}
				{#if $stateStore.user.name}
					{$stateStore.user.name}
				{:else}
					{$stateStore.user.email}
				{/if}
			{:else}
				{$_('login_label')}
			{/if}
		</a>
		<a href="/settings">{$_('settings_label')}</a>
	{/if}
</nav>

<slot />

<style>
	:root {
		--primary: #a7d0e0;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: var(--primary);
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
	}
	a {
		/* good color for babyblue background			 */
		color: white;
		font-weight: 600;
		text-decoration: none;
	}
</style>
