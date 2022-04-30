<div class="lds-ellipsis">
	<div />
	<div />
	<div />
	<div />
</div>

<style lang="postcss">
	@tailwind components;

	@layer components {
		.lds-ellipsis {
			@apply relative inline-block;
			height: 0.8rem;
			transform: scale(0.8);
		}
		.lds-ellipsis div {
			position: absolute;
			width: 13px;
			height: 13px;
			border-radius: 50%;
			background: #fff;
			animation-timing-function: cubic-bezier(0, 1, 1, 0);
		}
		.lds-ellipsis div:nth-child(1) {
			left: -2rem;
			animation: lds-ellipsis1 0.6s infinite;
		}
		.lds-ellipsis div:nth-child(2) {
			left: -2rem;
			animation: lds-ellipsis2 0.6s infinite;
		}
		.lds-ellipsis div:nth-child(3) {
			left: -0.5rem;
			animation: lds-ellipsis2 0.6s infinite;
		}
		.lds-ellipsis div:nth-child(4) {
			left: 1rem;
			animation: lds-ellipsis3 0.6s infinite;
		}

		@keyframes lds-ellipsis1 {
			0% {
				transform: scale(0);
			}
			100% {
				transform: scale(1);
			}
		}
		@keyframes lds-ellipsis3 {
			0% {
				transform: scale(1);
			}
			100% {
				transform: scale(0);
			}
		}
		@keyframes lds-ellipsis2 {
			0% {
				transform: translate(0, 0);
			}
			100% {
				transform: translate(24px, 0);
			}
		}
	}
</style>
