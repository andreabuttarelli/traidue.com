<script lang="ts">
	import { onMount } from 'svelte';

	// Schematic sagittal section (front of the body on the left), not to scale.
	// Each step only toggles opacity/colour/transform of fixed shapes; CSS does the animation.
	const steps = [
		{
			title: 'Anatomia di partenza',
			text: 'Sezione laterale semplificata del bacino: vescica, prostata, retto, uretra, pene e scroto con i testicoli.'
		},
		{
			title: '1. Orchiectomia',
			text: 'Vengono rimossi i testicoli. La pelle dello scroto viene conservata: servirà per le grandi labbra ed eventualmente come innesto per il canale.'
		},
		{
			title: '2. Creazione dello spazio',
			text: 'Tra la prostata (davanti) e il retto (dietro) viene aperto uno spazio che diventerà il canale vaginale. È la fase più delicata, per la vicinanza del retto.'
		},
		{
			title: '3. Corpi cavernosi e uretra',
			text: "I corpi cavernosi vengono rimossi. Una piccola parte del glande, con i suoi nervi e vasi, è conservata per il clitoride; l'uretra viene accorciata."
		},
		{
			title: '4. Inversione della pelle',
			text: 'La pelle del pene, rovesciata come un guanto (spesso integrata con pelle scrotale), viene portata nello spazio creato e ne riveste le pareti.'
		},
		{
			title: '5. Risultato',
			text: "Si modellano grandi e piccole labbra e il clitoride; l'uretra sbocca più in basso. La prostata resta al suo posto. Dopo l'intervento servono dilatazioni regolari."
		}
	];

	let step = $state(0);
	let ready = $state(false); // transitions only after mount: no fade-in from unstyled black
	let playing = $state(false);
	const at = (from: number, to = 99) => step >= from && step <= to;

	onMount(() => {
		requestAnimationFrame(() => (ready = true));
		const id = setInterval(() => {
			if (playing) step = step === steps.length - 1 ? 0 : step + 1;
		}, 4200);
		return () => clearInterval(id);
	});

	const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>

<figure class="procedure-diagram rounded-2xl border border-border p-4 sm:p-6" class:reduced class:ready>
	<svg viewBox="0 0 640 420" role="img" aria-label="Schema animato della vaginoplastica: {steps[step].title}" class="w-full h-auto">
		<!-- body silhouette (lower abdomen, perineum, upper thigh) -->
		<path class="body" d="M150 40 C 140 120, 150 190, 205 238 C 230 262, 250 300, 300 352 C 330 382, 380 392, 430 360 C 470 334, 495 280, 500 210 C 505 140, 498 80, 480 40 Z" />

		<!-- pubic bone -->
		<g class="layer"><rect class="bone" x="196" y="140" width="34" height="62" rx="16" transform="rotate(-18 213 171)" /></g>
		<!-- rectum (behind) -->
		<g class="layer"><path class="tube rectum" d="M432 50 C 440 140, 430 230, 404 300 C 396 320, 392 336, 392 350" /></g>
		<!-- bladder + prostate -->
		<g class="layer"><ellipse class="organ" cx="305" cy="128" rx="58" ry="44" /></g>
		<g class="layer"><ellipse class="organ" cx="312" cy="196" rx="24" ry="17" /></g>

		<!-- new canal: space between prostate and rectum, then skin lining -->
		<path class="canal" class:show={at(2)} class:lined={at(4)} d="M372 330 C 368 290, 362 250, 352 210 C 349 198, 347 190, 346 184" />

		<!-- penis: skin (outer), corpora (inner), glans; moves into the canal at step 4 -->
		<g class="penis" class:inverted={at(4)}>
			<g class="layer"><path class="skin" class:active={at(4, 4)} d="M262 236 C 240 262, 200 300, 168 336 C 156 350, 170 366, 184 356 C 220 326, 262 292, 290 268 Z" /></g>
			<path class="corpora" class:active={at(3, 3)} class:gone={at(3)} d="M262 248 C 240 270, 210 302, 186 330 C 182 336, 188 342, 194 337 C 222 310, 254 284, 276 262 Z" />
		</g>
		<!-- glans: a small part is kept (with its nerves) and becomes the clitoris -->
		<circle class="glans" class:active={at(3, 4)} class:kept={at(3, 3)} class:moved={at(4)} class:gone={at(5)} cx="176" cy="348" r="13" />

		<!-- urethra: long (through the penis), then short to the new opening -->
		<path class="urethra" class:gone={at(3)} d="M305 172 C 309 190, 312 214, 300 236 C 270 276, 220 316, 182 346" />
		<path class="urethra short" class:show={at(3)} d="M305 172 C 309 190, 312 214, 306 232 C 302 246, 300 258, 302 270" />

		<!-- scrotum + testes, then labia -->
		<g class="layer"><ellipse class="scrotum" class:gone={at(5)} cx="300" cy="318" rx="44" ry="32" /></g>
		<ellipse class="testis" class:active={at(1, 1)} class:gone={at(1)} cx="292" cy="320" rx="16" ry="12" />
		<ellipse class="testis" class:active={at(1, 1)} class:gone={at(1)} cx="318" cy="314" rx="12" ry="10" />
		<g class="labia" class:show={at(5)}>
			<g class="layer"><path d="M286 268 C 270 290, 276 330, 300 350 C 318 362, 352 360, 366 338 C 350 344, 322 340, 310 318 C 300 300, 296 282, 286 268 Z" /></g>
		</g>
		<circle class="clitoris" class:show={at(5)} cx="292" cy="262" r="6" />
		<circle class="meatus" class:show={at(3)} cx="302" cy="272" r="4" />

		<!-- labels -->
		<g class="labels">
			<text x="305" y="132" text-anchor="middle">vescica</text>
			<text x="312" y="200" text-anchor="middle">prostata</text>
			<text x="448" y="160">retto</text>
			<text x="190" y="128" text-anchor="end">osso pubico</text>
			<text class="when" class:show={at(0, 2)} x="168" y="300" text-anchor="end">pene</text>
			<text class="when" class:show={at(0, 0)} x="356" y="358">scroto e testicoli</text>
			<text class="when" class:show={at(1, 4)} x="356" y="358">scroto (conservato)</text>
			<text class="when accent" class:show={at(2, 3)} x="384" y="262">nuovo spazio</text>
			<text class="when accent" class:show={at(4)} x="384" y="262">canale vaginale</text>
			<text class="when" class:show={at(3)} x="296" y="290" text-anchor="end">uretra</text>
			<text class="when accent" class:show={at(5)} x="282" y="256" text-anchor="end">clitoride</text>
			<text class="when accent" class:show={at(5)} x="372" y="346">labbra</text>
		</g>
	</svg>

	<figcaption class="mt-4">
		<p class="text-sm font-semibold text-primary">{steps[step].title}</p>
		<p class="text-sm text-muted-text leading-relaxed mt-1 min-h-[3.5rem]" aria-live="polite">{steps[step].text}</p>
		<div class="flex items-center gap-2 mt-3">
			<button type="button" class="ctrl" onclick={() => (step = Math.max(0, step - 1))} disabled={step === 0} aria-label="Passo precedente">&larr;</button>
			<div class="flex gap-1.5" role="tablist" aria-label="Passi">
				{#each steps as s, i}
					<button
						type="button"
						role="tab"
						aria-selected={i === step}
						aria-label={s.title}
						class="h-2 rounded-full transition-all {i === step ? 'w-6 bg-brand-blue' : 'w-2 bg-border hover:bg-muted'}"
						onclick={() => (step = i)}
					></button>
				{/each}
			</div>
			<button type="button" class="ctrl" onclick={() => (step = Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1} aria-label="Passo successivo">&rarr;</button>
			<button type="button" class="ctrl ml-auto text-xs px-3" onclick={() => (playing = !playing)}>{playing ? 'Pausa' : 'Riproduci'}</button>
		</div>
		<p class="text-[11px] text-muted mt-3">Schema semplificato, non in scala: serve a capire le fasi principali, non sostituisce la spiegazione del chirurgo.</p>
	</figcaption>
</figure>

<style>
	.procedure-diagram {
		--tissue: color-mix(in srgb, var(--color-primary) 7%, var(--color-bg));
		--tissue-2: color-mix(in srgb, var(--color-primary) 12%, var(--color-bg));
		--line: color-mix(in srgb, var(--color-primary) 30%, var(--color-bg));
		--shade: color-mix(in srgb, var(--color-primary) 22%, var(--color-bg));
		--t: 0.7s cubic-bezier(0.4, 0, 0.2, 1);
	}
	/* 2.5D: crisp offset shadow = extruded paper layer */
	.layer {
		filter: drop-shadow(3px 5px 0 var(--shade));
	}
	svg * {
		transform-box: fill-box;
		transform-origin: center;
	}
	.ready svg * {
		transition:
			opacity var(--t),
			fill var(--t),
			stroke var(--t),
			transform var(--t);
	}
	.reduced svg * {
		transition: none;
	}
	.body {
		fill: var(--tissue);
		stroke: var(--line);
		stroke-width: 1.5;
	}
	.bone {
		fill: var(--color-bg);
		stroke: var(--line);
		stroke-width: 1.5;
	}
	.organ,
	.scrotum,
	.skin,
	.labia path {
		fill: var(--tissue-2);
		stroke: var(--line);
		stroke-width: 1.5;
	}
	.tube {
		fill: none;
		stroke: var(--tissue-2);
		stroke-width: 26;
		stroke-linecap: round;
	}
	.rectum {
		stroke: var(--shade);
	}
	.corpora,
	.testis,
	.glans {
		fill: var(--shade);
		stroke: var(--line);
		stroke-width: 1;
	}
	.urethra {
		fill: none;
		stroke: var(--color-primary);
		stroke-opacity: 0.55;
		stroke-width: 3;
		stroke-linecap: round;
	}
	.canal {
		fill: none;
		stroke: var(--color-brand-pink);
		stroke-width: 14;
		stroke-linecap: round;
		stroke-dasharray: 4 6;
		opacity: 0;
	}
	.canal.lined {
		stroke-width: 18;
		stroke-dasharray: none;
	}
	.clitoris,
	.meatus {
		fill: var(--color-brand-pink);
		stroke: var(--color-primary);
		stroke-width: 1;
		opacity: 0;
	}
	.meatus {
		fill: var(--color-bg);
	}
	.labia path {
		fill: color-mix(in srgb, var(--color-brand-pink) 45%, var(--color-bg));
	}
	.labia,
	.short {
		opacity: 0;
	}
	/* the structure being worked on in this step */
	.active {
		fill: var(--color-brand-blue) !important;
	}
	.skin.active {
		stroke: var(--color-brand-blue);
	}
	.gone {
		opacity: 0;
	}
	.show {
		opacity: 1 !important;
	}
	/* step 4: the penile skin moves up into the new canal (and fades into its lining) */
	.glans.kept {
		transform: scale(0.55);
	}
	.glans.moved {
		transform: translate(116px, -86px) scale(0.45);
	}
		.penis.inverted {
		transform: translate(150px, -60px) rotate(-62deg) scale(0.55);
		opacity: 0;
	}
	.labels text {
		font-size: 12px;
		fill: var(--color-muted);
		paint-order: stroke;
		stroke: var(--color-bg);
		stroke-width: 3px;
	}
	.labels .when {
		opacity: 0;
	}
	.labels .accent {
		fill: var(--color-primary);
		font-weight: 600;
	}
	.ctrl {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2rem;
		height: 2rem;
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
</style>
