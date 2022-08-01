<script>
	import { user, mobile } from '$lib/stores/global-store';
	import { fade } from 'svelte/transition';

	export let dashboard = false;
	let name;
	let photoURL;

	$: ({ name, photoURL } = $user);
	const photoError = () => {
		photoURL = '/images/avatar.png';
	};
</script>

<header
	class="flex pl-5 pr-5 pt-2 pb-2 lg:pt-8 lg:pr-10 lg:pl-10 justify-between sm:items-center"
	in:fade
>
	<div class="flex flex-row" class:flex-col={dashboard && $mobile}>
		<picture class="w-1/2">
			<img
				class="w-[35px] sm:w-[48px] rounded-full border-2 border-white outline outline-emerald-500"
				src={photoURL}
				alt="profile"
				crossorigin="anonymous"
				on:error={photoError}
			/>
		</picture>

		{#if dashboard}
			<div class="sm:pl-10 pt-2 -mb-1 sm:pt-0">
				<span>Hello</span>
				<h1 class="font-extrabold text-3xl -mt-1 text-teal-800">{name.split(' ')[0]}</h1>
			</div>
		{:else}
			<div class="pt-2 ml-2 flex items-center">
				<h1 class="font-extrabold text-xl -mt-1 text-teal-800">{name.split(' ')[0]}</h1>
			</div>
		{/if}
	</div>
	<div class="font-riangriung leading-4 text-right sm:text-2xl sm:leading-6">
		<span class="block text-teal-700">Peduli</span>
		<span class="block text-teal-700">Disleksia</span>
	</div>
</header>
