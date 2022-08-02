<script>
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';

	export let cancel = false;
	export let preventDefault = false;

	const dispatch = createEventDispatcher();
	const clickHandle = () => {
		dispatch('click', {});
		if (preventDefault) return;
		if (cancel) return goto('/dashboard');
		return history.back();
	};
</script>

<button
	class="mt-3 mb-2 hover:underline inline-block"
	class:text-red-600={cancel}
	clas:text-teal-900={!cancel}
	on:click|preventDefault={clickHandle}
>
	<i class="ld-arrow-left text-lg inline-block align-middle" />
	{cancel ? 'Batalkan Tes' : 'Kembali'}
</button>
