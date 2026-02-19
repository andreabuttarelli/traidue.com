<script lang="ts">
	let { class: className = '', animated = false }: { class?: string; animated?: boolean } = $props();
</script>

<span
	class="inline-flex items-center font-sans font-semibold tracking-tight {className}"
	class:logo-animated={animated}
	class:gap-[0.3em]={!animated}
>
	<span
		class="inline-block w-[0.7em] h-[0.9em] rounded-[0.1em] bg-[#5BCEFA]"
		class:logo-box-left={animated}
	></span>
	<span
		class:logo-text={animated}
	>Tra i Due</span>
	<span
		class="inline-block w-[0.7em] h-[0.9em] rounded-[0.1em] bg-[#F5A9B8]"
		class:logo-box-right={animated}
	></span>
</span>

<style>
	.logo-animated {
		gap: 0;
		animation: logo-gap 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
	}

	.logo-box-left {
		opacity: 0;
		transform: translateX(2em);
		animation: box-left 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.logo-box-right {
		opacity: 0;
		transform: translateX(-2em);
		animation: box-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.logo-text {
		opacity: 0;
		animation: text-fade 0.6s ease-out 0.15s forwards;
	}

	@keyframes logo-gap {
		from {
			gap: 0;
		}
		to {
			gap: 0.3em;
		}
	}

	@keyframes box-left {
		0% {
			opacity: 0;
			transform: translateX(2em);
		}
		20% {
			opacity: 1;
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes box-right {
		0% {
			opacity: 0;
			transform: translateX(-2em);
		}
		20% {
			opacity: 1;
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes text-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
