<script context="module">
	export const prerender = true;
</script>

<svelte:head>
	<title>LIDI - Peduli Disleksia</title>
</svelte:head>

<section
	class="bg-teal-300 h-screen w-100 flex flex-col justify-center items-center bg-cover bg-center"
>
	<div class="text-center mb-5">
		<h1 class="font-riangriung text-6xl">
			<span class="text-blue-700">L</span><span class="text-orange-600">I</span><span
				class="text-red-600">D</span
			><span class="text-green-800">I</span>
		</h1>
		<h2 class="text-lg font-bold">Peduli Disleksia</h2>
	</div>
	<button class="main-button">Panduan</button>
	<button class="main-button">Masuk</button>
	<button class="main-button">Buat Akun</button>
	<button class="bg-transparent mt-3 hover:underline inline-block">
		Lanjutkan Tanpa Akun <i class="ld-arrow-right text-lg inline-block align-middle" />
	</button>
</section>

<style lang="postcss">
	@tailwind components;

	section {
		background-image: url('/images/landing-background.jpg');
	}

	@layer components {
		.main-button {
			@apply bg-teal-700 text-white p-3 mt-4 rounded-3xl uppercase transition-all;
			@apply w-5/6 sm:w-3/4 md:w-3/6 lg:w-2/6;
			@apply hover:bg-teal-800;
		}
	}
</style>
