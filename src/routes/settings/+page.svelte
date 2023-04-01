<script lang="ts">
	import stateStore from '../../stores/state';

	import { _ } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';

	export function changeLanguage(lang: string) {
		locale.set(lang);
	}
	$: changeLanguage($stateStore.language);
</script>

<div class="container">
	<div class="settings">
		<h4>{$_('settings_label')}</h4>
		<div class="settings-item">
			<label>
				{$_('language_label')}
				<select bind:value={$stateStore.language}>
					<option value="en">{$_('english_label')}</option>
					<option value="de">{$_('german_label')}</option>
				</select>
			</label>
		</div>
	</div>
</div>
