<script>
	import Ellipsis from '../loader/loader-ellipsis.svelte';

	export let twClass = '';
	export let loading = false;
	export let text = 'Submit';
	export let disabled = false;
</script>

<button class="submit {twClass} " {disabled}>
	{#if loading}
		<Ellipsis />
	{:else}
		{text}
	{/if}
</button>

<style lang="postcss">
	.submit {
		@apply w-6/12 mt-2 p-2 uppercase text-white rounded-3xl transition-all;
		@apply hover:bg-teal-800 disabled:bg-neutral-300 disabled:hover:bg-neutral-300;
	}
</style>
