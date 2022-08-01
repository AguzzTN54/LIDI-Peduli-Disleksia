<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let show = false;

	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('bg-click');
	};
</script>

{#if show}
	<div
		class="fixed w-screen h-screen bg-gray-400/[.3] backdrop-blur z-[9999] flex justify-center items-center"
		transition:fade={{ duration: 250 }}
		on:click={handleClick}
	>
		<div
			class="w-11/12 sm:w-2/5 sm:min-w-[350px] bg-white rounded-lg p-5"
			transition:fly={{ y: -10, duration: 250 }}
			on:click|stopPropagation
		>
			<slot />
		</div>
	</div>
{/if}
