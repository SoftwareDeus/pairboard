import { register, init } from 'svelte-i18n';
import { browser } from '$app/environment'
import { locale } from 'svelte-i18n';

register('en', () => import('../locales/en.json'));
register('de', () => import('../locales/de.json'));
const defaultLocale = 'en'

export const currentLocale = locale;

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
})