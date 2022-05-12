<script>
	import { onMount, setContext } from 'svelte';
	import { mobile } from '$lib/store';
	import Popup from '$lib/components/utils/popup.svelte';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	const checkViewport = () => {
		mobile.set(window.innerWidth < 650);
		window.addEventListener('resize', () => {
			mobile.set(window.innerWidth < 650);
		});
	};

	const cancelTest = () => {
		goto('/dashboard');
	};

	let show = false;
	const handlePopup = () => (show = !show);

	if (browser) setContext('togglePopup', handlePopup);
	onMount(checkViewport);
</script>

<div class="bg-[#ddf4e9] h-full w-full">
	<Popup {show} on:bg-click={handlePopup}>
		<div class="text-lg text-center">
			<div class="flex">
				<button class="ml-auto active:scale-95" on:click={handlePopup}>
					<i class="ld-close text-3xl" />
				</button>
			</div>
			<p class="p-2">
				Skor tidak akan dihitung apabila tes dibatalkan, pencapaian hingga saat ini tidak akan
				disimpan dan akan mengulang mulai nomor 1 ketika melakukan tes kembali.
			</p>
			<button
				on:click={cancelTest}
				class="p-2 pr-5 pl-5 mt-5 mb-3 rounded-full text-base
        bg-teal-700 text-white hover:bg-teal-800 transition-all active:scale-95"
			>
				Batalkan Sekarang
			</button>
		</div>
	</Popup>
	<slot />
</div>
