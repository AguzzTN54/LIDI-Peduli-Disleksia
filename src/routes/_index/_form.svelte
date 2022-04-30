<script>
	import Ellipsis from '$lib/components/utils/loader-ellipsis.svelte';
	import { signinWithEmail, signinWithGoogle, signupWithEmail } from '$lib/firebase/auth';
	import { dashToSpace } from '$lib/functions/dashToSpace';

	export let formType;

	let onRequest = false;
	let errorMessage;

	const mailFormat =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	// Signin Data
	let emailLogin;
	let passwordLogin;
	$: isPasswordLoginValid = !(passwordLogin && passwordLogin.length < 6);
	$: isEmailLoginValid = !!emailLogin?.toLowerCase().match(mailFormat);

	// Signup Data
	let email;
	let name;
	let password1;
	let password2;
	let isPasswordValid = false;
	$: isEmailValid = !!email?.toLowerCase().match(mailFormat);
	$: readyToSubmit = isPasswordValid && isEmailValid && name;

	const checkPass = () => {
		isPasswordValid = password1.length > 5 && password1 === password2;
	};

	const handleSubmit = async () => {
		onRequest = true;
		if (formType === 'masuk') {
			const { status, codeMsg } = await signinWithEmail(emailLogin, passwordLogin);
			errorMessage = status === 'failed' ? codeMsg : '';
			onRequest = false;
			return;
		}
		const { status, codeMsg } = await signupWithEmail(email, password1);
		errorMessage = status === 'failed' ? codeMsg : '';
		onRequest = false;
		return;
	};
</script>

<form
	class="w-full flex flex-col justify-center items-center "
	on:submit|preventDefault={handleSubmit}
>
	{#if formType === 'masuk'}
		<input
			type="text"
			id="emailLogin"
			placeholder="Email"
			required
			class="input"
			class:border-red-400={emailLogin && !isEmailLoginValid}
			bind:value={emailLogin}
		/>
		<input
			type="password"
			id="passwordLogin"
			placeholder="Kata Sandi"
			required
			class="input"
			class:border-red-400={!isPasswordLoginValid}
			bind:value={passwordLogin}
		/>
	{:else if formType === 'daftar'}
		<input
			type="text"
			id="name"
			placeholder="Nama"
			required
			class="input"
			class:border-red-400={!name}
			bind:value={name}
		/>
		<input
			type="text"
			id="email"
			placeholder="Email"
			required
			class="input"
			class:border-red-400={email && !isEmailValid}
			bind:value={email}
		/>
		<input
			type="password"
			id="password1"
			placeholder="Kata Sandi"
			required
			class="input"
			class:border-red-400={password1 && password1.length < 6}
			bind:value={password1}
			on:input={checkPass}
		/>
		<input
			type="password"
			id="password2"
			placeholder="Ulangi Kata Sandi"
			required
			class="input"
			class:border-red-400={password2 && !isPasswordValid}
			bind:value={password2}
			on:input={checkPass}
		/>
	{/if}

	{#if errorMessage}
		<span class="text-white bg-red-500 pl-1 pr-1 text-xs">{dashToSpace(errorMessage)}</span>
	{/if}

	<button
		class="w-6/12 mt-2 p-2 uppercase bg-teal-600 text-white rounded-3xl  hover:bg-teal-800 disabled:bg-neutral-300 disabled:hover:bg-neutral-300 transition-all"
		disabled={formType === 'masuk'
			? !isEmailLoginValid || !passwordLogin || !isPasswordLoginValid
			: !readyToSubmit}
	>
		{#if onRequest}
			<Ellipsis />
		{:else}
			{formType === 'masuk' ? 'Masuk' : 'Daftar'}
		{/if}
	</button>
	<button class="login-with-google-btn" on:click|preventDefault={signinWithGoogle}>
		Sign {formType === 'masuk' ? 'in' : 'up'} with Google
	</button>
</form>

<style lang="postcss">
	@tailwind components;

	@layer components {
		.input {
			@apply pl-5 pr-5 pt-3 pb-3 m-2 w-10/12 rounded-3xl;
			@apply shadow border-solid border-2;
			@apply focus:outline-0;
		}

		.login-with-google-btn {
			@apply transition-all mt-3 pt-3 pb-3 pl-10 pr-5 rounded text-[#757575] text-sm font-medium;
			@apply bg-white bg-no-repeat shadow hover:shadow-md;
			@apply active:bg-[#eee];
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
				'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
			background-position: 12px 11px;
			background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
		}
	}
</style>
