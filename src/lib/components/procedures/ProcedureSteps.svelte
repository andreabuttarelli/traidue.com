<script lang="ts">
	// Step navigation shared by the 3D viewers: a compact stepper under the model on small screens,
	// a timeline beside it on desktop where the current step opens with its description.
	import type { Step3D } from './procedure-3d';

	let { steps, step = $bindable(), playing = $bindable() }: { steps: Step3D[]; step: number; playing: boolean } = $props();
	const last = $derived(steps.length - 1);
	const go = (i: number) => {
		playing = false;
		step = Math.max(0, Math.min(last, i));
	};
</script>

{#snippet chips(s: Step3D)}
	{#if s.keep.length || s.remove.length}
		<div class="flex flex-wrap gap-1.5 mt-2.5">
			{#each s.keep as k}<span class="text-[11px] rounded-full px-2 py-0.5 bg-brand-pink/40 text-on-brand">conservato: {k}</span>{/each}
			{#each s.remove as r}<span class="text-[11px] rounded-full px-2 py-0.5 border border-dashed border-border text-muted">rimosso: {r}</span>{/each}
		</div>
	{/if}
{/snippet}

{#snippet controls()}
	<div class="flex items-center gap-2">
		<button type="button" class="ctrl" onclick={() => go(step - 1)} disabled={step === 0} aria-label="Passo precedente">&larr;</button>
		<button type="button" class="ctrl grow lg:grow-0 lg:px-4 font-medium" onclick={() => go(step + 1)} disabled={step === last}>
			{step === 0 ? 'Inizia' : 'Avanti'} &rarr;
		</button>
		<button type="button" class="ctrl px-3 text-xs ml-auto" aria-pressed={playing} onclick={() => (playing = !playing)}>{playing ? '❚❚ Pausa' : '▶ Riproduci'}</button>
	</div>
{/snippet}

<!-- small screens: progress segments + the current step -->
<!-- controls first, so they don't move under the thumb when the text length changes -->
<div class="lg:hidden">
	<div class="mb-3">{@render controls()}</div>
	<div class="flex gap-1" role="group" aria-label="Passi dell'intervento">
		{#each steps as s, i}
			<button
				type="button"
				class="h-6 flex-1 grid items-center"
				aria-label="Passo {i}: {s.title}"
				aria-current={i === step ? 'step' : undefined}
				onclick={() => go(i)}
			>
				<span class="block h-1.5 rounded-full transition-colors {i < step ? 'bg-brand-blue/50' : i === step ? 'bg-brand-blue' : 'bg-border'}"></span>
			</button>
		{/each}
	</div>
	<div aria-live="polite">
		<p class="text-xs text-muted mt-2 tabular-nums">Passo {step} di {last}</p>
		<p class="text-base font-semibold text-primary mt-0.5">{steps[step].title}</p>
		<p class="text-sm text-muted-text leading-relaxed mt-1">{steps[step].text}</p>
		{@render chips(steps[step])}
	</div>
</div>

<!-- desktop: timeline, the current step expanded -->
<div class="hidden lg:flex flex-col self-start">
	<div class="flex items-baseline justify-between mb-2">
		<p class="text-xs font-medium uppercase tracking-wide text-muted">Passi</p>
		<p class="text-xs text-muted tabular-nums">{step} / {last}</p>
	</div>
	<div class="h-1 rounded-full bg-border overflow-hidden mb-3" aria-hidden="true">
		<div class="h-full bg-brand-blue transition-[width] duration-300" style="width:{(step / last) * 100}%"></div>
	</div>
	<ol class="relative" aria-label="Passi dell'intervento">
		{#each steps as s, i}
			<li class="relative pl-8 {i < last ? 'pb-1' : ''}">
				{#if i < last}<span class="absolute left-[11px] top-6 bottom-0 w-px {i < step ? 'bg-brand-blue/60' : 'bg-border'}" aria-hidden="true"></span>{/if}
				<span
					class="absolute left-0 top-1 grid place-items-center size-6 rounded-full text-[11px] tabular-nums border transition-colors {i === step
						? 'bg-brand-blue border-brand-blue text-on-brand font-semibold'
						: i < step
							? 'bg-brand-blue/15 border-brand-blue/60 text-primary'
							: 'bg-bg border-border text-muted'}"
					aria-hidden="true">{i < step ? '✓' : i}</span
				>
				<button
					type="button"
					aria-current={i === step ? 'step' : undefined}
					class="w-full text-left rounded-lg px-2 py-1.5 text-sm transition {i === step ? 'font-semibold text-primary' : 'text-muted hover:text-primary hover:bg-surface'}"
					onclick={() => go(i)}
				>
					<span class="sr-only">Passo {i}: </span>{s.title}
				</button>
				{#if i === step}
					<div class="px-2 pb-3" aria-live="polite">
						<p class="text-sm text-muted-text leading-relaxed">{s.text}</p>
						{@render chips(s)}
					</div>
				{/if}
			</li>
		{/each}
	</ol>
	<div class="mt-3 pt-3 border-t border-border">{@render controls()}</div>
</div>

<style>
	.ctrl {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		min-width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		border: 1px solid var(--color-border);
		color: var(--color-primary);
		font-size: 0.875rem;
	}
	.ctrl:disabled {
		opacity: 0.35;
	}
	.ctrl:not(:disabled):hover {
		border-color: var(--color-brand-blue);
	}
	.ctrl[aria-pressed='true'] {
		background: var(--color-brand-blue);
		border-color: var(--color-brand-blue);
		color: var(--color-on-brand);
	}
</style>
