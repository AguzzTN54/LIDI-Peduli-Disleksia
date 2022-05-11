<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const handleCLick = () => dispatch('click');
</script>

<button
	class="main-button active:scale-95 text-ellipsis overflow-hidden whitespace-nowrap"
	on:click={handleCLick}
>
	<slot />
</button>

<style lang="postcss">
	.main-button {
		@apply bg-teal-700 text-white text-center p-3 mt-4 rounded-3xl uppercase transition-all;
		@apply w-full;
		@apply hover:bg-teal-800;
	}
</style>
