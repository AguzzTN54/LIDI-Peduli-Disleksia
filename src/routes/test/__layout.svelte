<script>
	import { setContext } from 'svelte';
	import Popup from '$lib/components/popup.svelte';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	let show = false;
	const handlePopup = () => (show = !show);
	const cancelTest = () => {
		goto('/dashboard', { replaceState: true });
	};

	let showSendAnswerPopup = false;
	const handleSendAnswerPopup = () => (showSendAnswerPopup = !showSendAnswerPopup);
	const submitAnswer = () => {
		goto('/test/outro', { replaceState: true });
		handleSendAnswerPopup();
	};

	if (browser) {
		setContext('togglePopup', handlePopup);
		setContext('toggleSendAswerPopup', handleSendAnswerPopup);
	}
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
				disimpan dan akan mengulang dari nomor 1 ketika melakukan tes kembali.
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

	<Popup show={showSendAnswerPopup} on:bg-click={handleSendAnswerPopup}>
		<div class="text-lg text-center">
			<div class="flex">
				<button class="ml-auto active:scale-95" on:click={handleSendAnswerPopup}>
					<i class="ld-close text-3xl" />
				</button>
			</div>
			<p class="p-2">Yakin akan mengirimkan jawaban sekarang?</p>
			<button
				on:click={submitAnswer}
				class="p-2 pr-5 pl-5 mt-5 mb-3 rounded-full text-base
        bg-teal-700 text-white hover:bg-teal-800 transition-all active:scale-95"
			>
				Submit Jawaban
			</button>
		</div>
	</Popup>
	<slot />
</div>
