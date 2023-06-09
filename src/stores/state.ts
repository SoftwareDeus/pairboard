import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';
import { locale } from 'svelte-i18n';
import type { ObjectId } from 'mongodb';

type State = {
	user: UserData | null;
	language: string;
	currentCardId: ObjectId | null;
};

type UserData = {
	id: string;
	name: string;
	email: string;
	verified: boolean;
	photoUrl: string;
};

const initialState: State = { user: null, language: 'en', currentCardId: null };
const storedState = typeof window !== 'undefined' ? localStorage.getItem('state') : null;
const stateStore = writable<State>(storedState ? JSON.parse(storedState) : initialState);

stateStore.subscribe((state) => {
	locale.set(state.language);
});

export const setUser = (user: User) => {
	stateStore.update((state) => {
		state.user = {
			id: user.uid ?? '',
			name: user.displayName ?? '',
			email: user.email ?? '',
			verified: user.emailVerified,
			photoUrl: user.photoURL ?? ''
		};
		if (typeof window !== 'undefined') {
			localStorage.setItem('state', JSON.stringify(state));
		}
		return state;
	});
};

export default stateStore;
