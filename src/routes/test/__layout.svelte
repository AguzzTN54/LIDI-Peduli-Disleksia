<script>
	import { onMount } from 'svelte';
	import { mobile } from '$lib/store';

	const checkViewport = () => {
		mobile.set(window.innerWidth < 650);
		window.addEventListener('resize', () => {
			mobile.set(window.innerWidth < 650);
		});
	};

	onMount(checkViewport);
</script>

<div class="bg-[#ddf4e9] h-full w-full">
	<slot />
</div>
