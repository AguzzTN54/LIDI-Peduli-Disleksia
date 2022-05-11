<script context="module">
	export const prerender = true;
</script>

<script>
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { APP_NAME } from '$lib/env';
	import Form from '$lib/components/pages/index/form.svelte';
	import BtnMain from '$lib/components/utils/btn-main.svelte';

	let formActive = false;
	let formType;

	const navigation = (action) => {
		formType = action;
		formActive = ['masuk', 'daftar', 'anonim'].includes(action);
	};
</script>

<svelte:head>
	<title>{APP_NAME}</title>
</svelte:head>

<section class="h-screen w-100 flex flex-col justify-center items-center" in:fade>
	<div class="text-center mb-8">
		<h1 class="font-riangriung text-6xl">
			<span class="text-blue-700">L</span><span class="text-orange-600">I</span><span
				class="text-red-600">D</span
			><span class="text-green-800">I</span>
		</h1>
		<h2 class="text-lg font-semibold text-teal-800">Peduli Disleksia</h2>
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
			<BtnMain on:click={() => goto('/panduan')}>Panduan</BtnMain>
			<BtnMain on:click={() => navigation('masuk')}>Masuk</BtnMain>
			<BtnMain on:click={() => navigation('daftar')}>Buat Akun</BtnMain>
			<button
				class="bg-transparent mt-3 hover:underline inline-block text-teal-900"
				on:click={() => navigation('anonim')}
			>
				Lanjutkan Tanpa Akun <i class="ld-arrow-right text-lg inline-block align-middle" />
			</button>
		</div>
	{/if}
</section>
