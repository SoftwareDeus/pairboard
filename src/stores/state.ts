import type { User } from "firebase/auth";
import { writable } from "svelte/store";
import { locale } from 'svelte-i18n';

type State = {
    user: UserData | null;
    language: string;
}

type UserData = {
    id: string;
    name: string;
    email: string;
    verified: boolean;
    photoUrl: string;
}

const initialState: State = { user: null, language: "en" };
const storedState = typeof window !== 'undefined' ? localStorage.getItem("state") : null;
const stateStore = writable<State>(storedState ? JSON.parse(storedState) : initialState);

stateStore.subscribe(state => {
    locale.set(state.language);
})

export const setUser = (user: User) => {
    console.log(user, "EINGELOGGT");
    stateStore.update(state => {
        state.user = {
            id: user.uid ?? "",
            name: user.displayName ?? "",
            email: user.email ?? "",
            verified: user.emailVerified,
            photoUrl: user.photoURL ?? ""
        };
        if (typeof window !== 'undefined') {
            localStorage.setItem("state", JSON.stringify(state));
        }
        return state;
    });
}

export default stateStore;