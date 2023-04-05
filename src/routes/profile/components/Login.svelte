<script lang="ts">
	import {
		GoogleAuthProvider,
		FacebookAuthProvider,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword
	} from 'firebase/auth';
	import { getAuth, signInWithPopup } from 'firebase/auth';
	import { setUser } from '../../../stores/state';

	import { _ } from 'svelte-i18n';

	let email = '';
	let password = '';
	const handleEmailRegister = () => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};
	const handleEmailLogin = () => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};
	const handleGoogleLogin = () => {
		const auth = getAuth();
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				setUser(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	};
	const handleFacebookLogin = () => {
		const auth = getAuth();
		const provider = new FacebookAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = FacebookAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				setUser(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = FacebookAuthProvider.credentialFromError(error);
			});
	};
</script>

<div class="container login">
	<div class="hor-container">
		<h4 style="margin-bottom:0.25em; display:flex; justify-content:center">
			{$_('login_label')}
		</h4>
		<label>
			{$_('email_label')}
			<input type="text" name="email" bind:value={email} placeholder="Email" />
		</label>
		<label>
			{$_('password_label')}
			<input type="password" name="password" bind:value={password} placeholder="Password" />
		</label>
		<button on:click={handleEmailLogin}>{$_('login_label')}</button>
		<button on:click={handleEmailRegister}>{$_('register_label')}</button>
	</div>
	<div class="splitter" />
	<div class="social-container">
		<div class="social">
			<button on:click={handleGoogleLogin} class="outline">
				<img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" />
				<span>{$_('google_sign_in_label')}</span>
			</button>
		</div>
		<div class="social">
			<button on:click={handleFacebookLogin} class="outline">
				<img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="" />
				<span>{$_('facebook_sign_in_label')}</span>
			</button>
		</div>
	</div>
</div>

<style>
	.splitter {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1em;
		height: minmax(50em, 50em);
	}
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 85vh;
		flex-direction: column;
		gap: 1em;
		flex-wrap: wrap;
	}

	.hor-container {
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
		padding-left: 1em;
		padding-right: 1em;
		border-radius: 0.5em;
	}
</style>
