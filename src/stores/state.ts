import type { User } from "firebase/auth";
import { writable } from "svelte/store";

type State = {
    user: UserData | null;
    language: string;
}

type UserData = {
    name: string;
    email: string;
    verified: boolean;
    photoUrl: string;
}

const stateStore = writable<State>({user: null, language: "en"});

export const setUser = (user: User) => {
    console.log("Setting user: ", user);    
    stateStore.update(state => {
        state.user = {
            name: user.displayName ?? "",
            email: user.email ?? "",
            verified: user.emailVerified,
            photoUrl: user.photoURL ?? ""
        };
        return state;
    });
}


export default stateStore;