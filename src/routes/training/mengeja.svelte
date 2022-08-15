<script>
	import { fade } from 'svelte/transition';
	import Header from '$lib/components/header.svelte';
	import { getItem } from '$lib/helpers/spelling/index';

	let category, word, letterList;
	let content = getItem();
	$: ({ category, word, letterList } = content);

	let userAnswer = [];
	let wrongAnswer = false;

	const wrong = () => {
		wrongAnswer = true;
		const x = setTimeout(() => {
			wrongAnswer = false;
			clearTimeout(x);
		}, 500);
	};

	let showToast = false;
	const complete = () => {
		showToast = true;
		const x = setTimeout(() => {
			showToast = false;
			clearTimeout(x);
			reload();
		}, 1000);
	};

	const chooseLetter = (letter) => {
		const i = userAnswer.length;
		if (word.split('')[i] !== letter) return wrong();
		userAnswer = [...userAnswer, letter];
		if (userAnswer.join('') === word) complete();
		return;
	};

	const reload = () => {
		userAnswer = [];
		content = getItem();
	};
</script>

<svelte:head>
	<title>Mengeja Kata</title>
</svelte:head>

{#if showToast}
	<div
		transition:fade
		class="fixed top-1/2 left-1/2 -translate-x-1/2 bg-white w-36 rounded-lg aspect-square z-10 flex items-center justify-center"
	>
		<div
			class="text-green-400 text-5xl w-[50%] aspect-square flex items-center justify-center border-4 border-green-400 rounded-full"
		>
			<i class="ld-check" />
		</div>
	</div>
{/if}

<section class="w-full h-full">
	<div class="w-full h-full bg-white/[.7] backdrop-blur-md flex flex-col relative overflow-auto">
		<Header />

		<div class="flex flex-col items-center px-12 uppercase">
			<div
				class="sm:w-[50%] md:w-80 max-w-[80%] aspect-square px-10 rounded-xl -mt-5 -mb-8  relative"
			>
				<button
					class="bg-teal-700 absolute w-10 aspect-square right-0 rounded-md text-white active:scale-95"
					on:click={reload}
				>
					<i class="ld-reload" />
				</button>
				<img src="/images/{category}/{word}.png" alt="Huruf" />
				<!-- <div class="px-2 text-center">{word}</div> -->
			</div>
			<div class="flex">
				{#each word.split('') as l, i}
					<div
						class="p-2 text-5xl font-bold word w-16 h-16 text-center transition-all duration-500"
						class:bg-red-600={userAnswer.length === i && wrongAnswer}
					>
						{@html userAnswer[i] ? l : '&nbsp;'}
					</div>
				{/each}
			</div>
			<div class="flex flex-wrap justify-between w-full lg:w-[70%] py-5">
				{#each letterList as letter}
					<div class="w-1/3 sm:w-1/5 text-center p-2">
						<button
							class="uppercase w-16 aspect-square bg-teal-700 text-white rounded-md active:scale-95 transition-all"
							on:click={() => chooseLetter(letter)}
						>
							{letter}
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.word::after {
		content: '';
		@apply block bg-teal-700 w-full h-[10%];
	}
</style>
