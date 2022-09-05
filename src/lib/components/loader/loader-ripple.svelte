<div class="loader flex items-center flex-col">
	<div class="loader-icon relative">
		<span class="block absolute h-full w-full" />
	</div>
	<p class="text-xs pt-7 text-teal-800">Tunggu Sebentar ..</p>
</div>

<style lang="postcss">
			@apply fixed bg-white/[.8] p-10 shadow-xl rounded-lg;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 9999;
		}
		.loader-icon {
			width: 3.5rem;
			height: 3.5rem;
		}
		span {
			top: 0;
			left: 0;
		}
		span::before,
		span::after {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			margin: auto;
			width: 100%;
			height: 100%;
			border: 5px solid;
			@apply border-teal-800;
			border-radius: 50%;
			animation: loaderAnim1 0.8s cubic-bezier(0, 0.2, 0.8, 1) infinite;
		}

		span::after {
			animation-delay: -0.5s;
		}

		@keyframes loaderAnim1 {
			0% {
				transform: scale(0);
				opacity: 1;
			}
			20% {
				opacity: 1;
			}
			100% {
				transform: scale(1.5);
				opacity: 0;
			}
		}
</style>
