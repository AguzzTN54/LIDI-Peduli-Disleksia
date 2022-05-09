<script context="module">
	export const prerender = true;
</script>

<script>
	import { fade } from 'svelte/transition';
	import Form from '$lib/components/pages/index/form.svelte';

	let formActive = false;
	let formType;

	const navigation = (action) => {
		formType = action;
		formActive = ['masuk', 'daftar', 'anonim'].includes(action);
	};
</script>

<svelte:head>
	<title>LIDI - Peduli Disleksia</title>
</svelte:head>

<section
	class="bg-teal-300 h-screen w-100 flex flex-col justify-center items-center bg-cover bg-center"
	in:fade
>
	<div class="text-center mb-8">
		<h1 class="font-riangriung text-6xl">
			<span class="text-blue-700">L</span><span class="text-orange-600">I</span><span
				class="text-red-600">D</span
			><span class="text-green-800">I</span>
		</h1>
		<h2 class="text-lg font-bold text-teal-800">Peduli Disleksia</h2>
	</div>

	{#if formActive}
		<div class="w-5/6 sm:w-3/4 md:w-3/6 lg:w-2/6" in:fade>
			<nav class="flex justify-left pl-5 w-5/6 sm:w-3/4 md:w-3/6 lg:w-2/6">
				<button class="hover:text-teal-700 text-teal-900" on:click={() => navigation('/')}>
					<i class="ld-arrow-left align-middle text-lg" /> Kembali
				</button>
			</nav>
			<Form {formType} />
		</div>
	{:else}
		<div class="flex flex-col justify-center items-center w-5/6 sm:w-3/4 md:w-3/6 lg:w-2/6" in:fade>
			<a href="/panduan" class="main-button">Panduan</a>
			<button class="main-button" on:click={() => navigation('masuk')}>Masuk</button>
			<button class="main-button" on:click={() => navigation('daftar')}>Buat Akun</button>
			<button
				class="bg-transparent mt-3 hover:underline inline-block text-teal-900"
				on:click={() => navigation('anonim')}
			>
				Lanjutkan Tanpa Akun <i class="ld-arrow-right text-lg inline-block align-middle" />
			</button>
		</div>
	{/if}
</section>

<style lang="postcss">
	section {
		background-image: url('/images/landing-background.jpg');
	}

	.main-button {
		@apply bg-teal-700 text-white text-center p-3 mt-4 rounded-3xl uppercase transition-all;
		@apply w-full;
		@apply hover:bg-teal-800;
	}
</style>
