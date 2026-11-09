<script lang="ts">
	import { onMount } from 'svelte';

	// Schematic sagittal section of the pelvis (front of the body on the left), not to scale.
	// Every structure is a fixed shape; each step only switches classes (active / ghost / show / moved)
	// and CSS animates opacity, colour and transform between steps.
	const steps = [
		{
			title: 'Anatomia di partenza',
			text: "Sezione laterale semplificata del bacino. Davanti l'osso pubico, al centro vescica e prostata con l'uretra, dietro il retto. Il pene è formato da due corpi cavernosi (sopra) e dal corpo spongioso che contiene l'uretra (sotto); lungo il dorso scorre il fascio neurovascolare che porta sensibilità al glande.",
			keep: [] as string[],
			remove: [] as string[]
		},
		{
			title: 'Orchiectomia',
			text: "Attraverso un'incisione dello scroto o del perineo vengono rimossi entrambi i testicoli; i funicoli spermatici sono legati e sezionati all'altezza del canale inguinale. La pelle dello scroto viene conservata.",
			keep: ['pelle dello scroto'],
			remove: ['testicoli', 'epididimi', 'funicoli spermatici']
		},
		{
			title: 'Distacco della pelle del pene',
			text: 'La pelle del pene viene separata dall\'asta come un manicotto ("degloving"), restando attaccata alla base per mantenere l\'afflusso di sangue. Diventerà il rivestimento del canale.',
			keep: ['pelle del pene, con la sua irrorazione'],
			remove: []
		},
		{
			title: "Separazione dell'uretra",
			text: "L'uretra, con il corpo spongioso che la circonda, viene staccata dai corpi cavernosi per tutta la lunghezza dell'asta.",
			keep: ['uretra'],
			remove: []
		},
		{
			title: 'Fascio neurovascolare e glande',
			text: 'Dal dorso del pene si isola il fascio neurovascolare insieme a una piccola porzione del glande: è la parte che diventerà il clitoride e ne garantisce la sensibilità.',
			keep: ['fascio neurovascolare dorsale', 'porzione del glande'],
			remove: []
		},
		{
			title: 'Rimozione dei corpi cavernosi',
			text: "I corpi cavernosi, il tessuto erettile, vengono rimossi fino alla loro base vicino all'osso pubico. Se ne lascia il meno possibile, perché i residui potrebbero gonfiarsi con l'eccitazione.",
			keep: [],
			remove: ['corpi cavernosi']
		},
		{
			title: 'Creazione dello spazio neovaginale',
			text: 'Tra prostata e vescica (davanti) e retto (dietro) si apre uno spazio attraverso la fascia di Denonvilliers, fino in profondità nel bacino. È la fase più delicata: la complicanza più temuta è la lesione del retto.',
			keep: ['prostata, che non viene rimossa'],
			remove: []
		},
		{
			title: 'Inversione e inserimento',
			text: 'La pelle del pene, rovesciata come un guanto e chiusa in fondo, viene inserita nello spazio e fissata. Se la pelle non basta per la profondità si aggiunge un innesto di pelle dello scroto (in altre tecniche si usano peritoneo o intestino).',
			keep: ['pelle del pene, che diventa la parete del canale', 'innesto scrotale, se serve'],
			remove: []
		},
		{
			title: 'Uretra e clitoride',
			text: "L'uretra viene accorciata, aperta e cucita come nuovo sbocco (meato) sotto il clitoride. La porzione di glande, con il suo fascio, viene posizionata come clitoride. In molte tecniche la mucosa uretrale riveste anche il vestibolo.",
			keep: ['nuovo meato uretrale', 'clitoride'],
			remove: ['tratto di uretra in eccesso']
		},
		{
			title: 'Labbra, zaffo e catetere',
			text: 'Con la pelle dello scroto si modellano le grandi labbra, con la pelle del pene o del prepuzio le piccole labbra. Nel canale si lascia uno zaffo (o un tutore) e in vescica un catetere.',
			keep: ['grandi e piccole labbra'],
			remove: []
		},
		{
			title: "Dopo l'intervento",
			text: 'Dopo alcuni giorni a letto si rimuovono zaffo e catetere, di solito entro 5–8 giorni. Iniziano le dilatazioni con i tutori: due volte al giorno nei primi mesi, poi per tutta la vita secondo le indicazioni del chirurgo, per mantenere profondità e ampiezza del canale.',
			keep: [],
			remove: ['zaffo', 'catetere']
		}
	];

	let step = $state(0);
	let playing = $state(false);
	let ready = $state(false); // transitions only after mount: no fade-in from unstyled black
	const at = (from: number, to = 99) => step >= from && step <= to;

	onMount(() => {
		requestAnimationFrame(() => (ready = true));
		const id = setInterval(() => {
			if (playing) step = step === steps.length - 1 ? 0 : step + 1;
		}, 5200);
		return () => clearInterval(id);
	});

	const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
</script>

<figure class="procedure-diagram rounded-2xl border border-border p-4 sm:p-6" class:reduced class:ready>
	<div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_15rem] gap-6">
		<div>
			<svg viewBox="0 0 720 470" role="img" aria-label="Schema animato della vaginoplastica, passo {step}: {steps[step].title}" class="w-full h-auto">
				<!-- torso silhouette: abdominal wall (left), perineum (bottom), buttock and sacrum (right) -->
				<path class="body" d="M150 18 C 138 90, 140 150, 168 196 C 190 232, 232 262, 288 286 C 330 304, 352 336, 374 372 C 392 400, 430 414, 470 404 C 520 392, 560 350, 584 290 C 606 230, 612 130, 600 18 Z" />

				<!-- sacrum / coccyx, pubic symphysis -->
				<g class="layer"><path class="bone" d="M574 40 C 590 120, 586 200, 560 262 C 552 280, 540 292, 528 300 L 520 290 C 546 250, 562 180, 556 40 Z" /></g>
				<g class="layer"><ellipse class="bone" cx="220" cy="206" rx="15" ry="32" transform="rotate(-28 220 206)" /></g>

				<!-- rectum + anal canal, sphincter -->
				<g class="layer"><path class="tube rectum" class:active={at(6, 6)} d="M520 30 C 540 120, 530 210, 500 270 C 478 312, 458 340, 448 372 C 444 384, 442 392, 442 398" /></g>
				<ellipse class="sphincter" cx="442" cy="392" rx="16" ry="8" />

				<!-- bladder, seminal vesicles, prostate -->
				<g class="layer"><path class="organ" d="M252 132 C 252 84, 300 66, 336 74 C 380 84, 392 126, 380 160 C 370 188, 344 204, 318 206 C 290 206, 254 184, 252 132 Z" /></g>
				<g class="layer"><ellipse class="organ small" cx="392" cy="196" rx="22" ry="9" transform="rotate(-28 392 196)" /></g>
				<g class="layer"><path class="organ" d="M296 214 C 300 202, 344 200, 350 216 C 356 236, 340 252, 322 252 C 304 252, 290 234, 296 214 Z" /></g>

				<!-- neovaginal space, then lined canal; packing -->
				<path class="canal" class:show={at(6)} class:lined={at(7)} d="M404 384 C 398 340, 392 300, 384 262 C 380 246, 377 236, 374 228" />
				<path class="packing" class:show={at(9, 9)} d="M402 372 C 397 336, 391 300, 384 266" />

				<!-- spermatic cord (to the inguinal canal), scrotum, testis, epididymis -->
				<path class="cord" class:active={at(1, 1)} class:ghost={at(1)} d="M320 336 C 300 300, 276 262, 250 232 C 240 220, 236 206, 238 186" />
				<g class="layer"><ellipse class="scrotum" class:gone={at(9)} cx="336" cy="348" rx="52" ry="40" /></g>
				<ellipse class="testis" class:active={at(1, 1)} class:ghost={at(1)} cx="330" cy="354" rx="21" ry="16" />
				<ellipse class="epididymis" class:active={at(1, 1)} class:ghost={at(1)} cx="352" cy="344" rx="7" ry="13" />

				<!-- penis: skin sleeve, corpora cavernosa (dorsal), corpus spongiosum (ventral), nerve bundle, glans -->
				<g class="skin-sleeve" class:lifted={at(2, 6)} class:inverted={at(7)}>
					<g class="layer"><path class="skin" class:active={at(2, 2)} d="M286 262 C 262 290, 220 330, 184 366 C 170 380, 168 398, 186 400 C 198 400, 206 392, 214 384 C 248 352, 288 318, 314 292 Z" /></g>
				</g>
				<path class="cavernosa" class:active={at(5, 5)} class:ghost={at(5)} d="M282 268 C 260 292, 224 326, 192 358 C 186 366, 192 372, 200 366 C 232 336, 266 304, 292 280 Z" />
				<path class="spongiosum" class:active={at(3, 3)} class:separated={at(3, 7)} class:ghost={at(8)} d="M300 284 C 276 308, 236 344, 204 376 C 198 382, 204 388, 210 384 C 244 352, 284 316, 308 292 Z" />
				<path class="nv-bundle" class:active={at(4, 4)} class:moved={at(8)} d="M274 262 C 250 286, 214 318, 186 348" />
				<path class="glans" class:active={at(4, 7)} class:trimmed={at(4, 7)} class:moved={at(8)} class:gone={at(8)} d="M184 362 C 166 368, 160 392, 176 402 C 192 410, 210 398, 212 384 C 214 372, 200 358, 184 362 Z" />

				<!-- urethra: long, then short with the new meatus; clitoris; catheter -->
				<path class="urethra" class:ghost={at(8)} d="M318 204 C 322 220, 324 240, 318 262 C 312 280, 296 296, 270 318 C 246 340, 222 362, 196 388" />
				<path class="urethra short" class:show={at(8)} d="M318 204 C 322 220, 324 240, 320 262 C 318 280, 340 300, 352 318" />
				<circle class="meatus" class:show={at(8)} cx="354" cy="322" r="4.5" />
				<circle class="clitoris" class:show={at(8)} cx="334" cy="306" r="6.5" />
				<path class="catheter" class:show={at(9, 9)} d="M300 140 C 312 170, 322 210, 320 262 C 318 282, 340 302, 356 326 C 364 340, 370 356, 372 372" />

				<!-- labia majora (scrotal skin) and minora -->
				<g class="labia-maj" class:show={at(9)}>
					<g class="layer"><path d="M330 300 C 314 326, 324 368, 356 388 C 380 402, 412 398, 420 380 C 400 384, 372 374, 360 352 C 348 332, 342 314, 330 300 Z" /></g>
				</g>
				<path class="labia-min" class:show={at(9)} d="M340 312 C 334 332, 342 356, 362 370 C 376 380, 392 384, 404 382" />

				<!-- labels -->
				<g class="labels">
					<text x="316" y="140" text-anchor="middle">vescica</text>
					<text x="322" y="236" text-anchor="middle">prostata</text>
					<text x="430" y="182">vescicole seminali</text>
					<text x="536" y="200">retto</text>
					<text x="572" y="260" text-anchor="end" class="faint">sacro</text>
					<text x="196" y="174" text-anchor="end">osso pubico</text>
					<text x="458" y="420">ano</text>
					<text class="when" class:show={at(0, 0)} x="176" y="320" text-anchor="end">corpi cavernosi</text>
					<text class="when" class:show={at(0, 0)} x="236" y="410" text-anchor="end">corpo spongioso e uretra</text>
					<text class="when" class:show={at(0, 1)} x="398" y="372">scroto, testicolo</text>
					<text class="when accent" class:show={at(1, 1)} x="226" y="230" text-anchor="end">funicolo legato</text>
					<text class="when accent" class:show={at(2, 2)} x="150" y="400" text-anchor="end">pelle del pene</text>
					<text class="when accent" class:show={at(3, 3)} x="236" y="410" text-anchor="end">uretra separata</text>
					<text class="when accent" class:show={at(4, 4)} x="176" y="320" text-anchor="end">fascio neurovascolare</text>
					<text class="when accent" class:show={at(4, 4)} x="150" y="420" text-anchor="end">porzione di glande</text>
					<text class="when accent" class:show={at(5, 5)} x="176" y="320" text-anchor="end">corpi cavernosi rimossi</text>
					<text class="when accent" class:show={at(6, 6)} x="420" y="290">spazio neovaginale</text>
					<text class="when faint" class:show={at(6, 6)} x="420" y="306">fascia di Denonvilliers</text>
					<text class="when accent" class:show={at(7)} x="420" y="290">canale vaginale</text>
					<text class="when" class:show={at(7, 7)} x="420" y="306">pelle peniena + innesto</text>
					<text class="when accent" class:show={at(8)} x="326" y="296" text-anchor="end">clitoride</text>
					<text class="when accent" class:show={at(8)} x="296" y="334" text-anchor="end">meato uretrale</text>
					<text class="when accent" class:show={at(9)} x="300" y="384" text-anchor="end">labbra</text>
					<text class="when" class:show={at(9, 9)} x="300" y="150" text-anchor="end">catetere</text>
					<text class="when" class:show={at(9, 9)} x="430" y="356">zaffo</text>
				</g>
			</svg>

			<div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-muted">
				<span class="inline-flex items-center gap-1.5"><span class="size-2.5 rounded-sm bg-brand-blue"></span>in lavorazione in questo passo</span>
				<span class="inline-flex items-center gap-1.5"><span class="size-2.5 rounded-sm bg-brand-pink"></span>nuove strutture</span>
				<span class="inline-flex items-center gap-1.5"><span class="size-2.5 rounded-sm border border-dashed border-muted"></span>rimosso</span>
			</div>

			<figcaption class="mt-4">
				<p class="text-xs text-muted">Passo {step} di {steps.length - 1}</p>
				<p class="text-base font-semibold text-primary">{steps[step].title}</p>
				<p class="text-sm text-muted-text leading-relaxed mt-1 min-h-[4.5rem]" aria-live="polite">{steps[step].text}</p>
				{#if steps[step].keep.length || steps[step].remove.length}
					<div class="flex flex-wrap gap-1.5 mt-2">
						{#each steps[step].keep as k}<span class="text-[11px] rounded-full px-2 py-0.5 bg-brand-pink/40 text-on-brand">conservato: {k}</span>{/each}
						{#each steps[step].remove as r}<span class="text-[11px] rounded-full px-2 py-0.5 border border-dashed border-border text-muted">rimosso: {r}</span>{/each}
					</div>
				{/if}
				<div class="flex items-center gap-2 mt-4">
					<button type="button" class="ctrl" onclick={() => (step = Math.max(0, step - 1))} disabled={step === 0} aria-label="Passo precedente">&larr;</button>
					<button type="button" class="ctrl" onclick={() => (step = Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1} aria-label="Passo successivo">&rarr;</button>
					<button type="button" class="ctrl ml-auto text-xs px-3" onclick={() => (playing = !playing)}>{playing ? 'Pausa' : 'Riproduci'}</button>
				</div>
			</figcaption>
		</div>

		<ol class="text-sm self-start space-y-0.5" aria-label="Passi dell'intervento">
			{#each steps as s, i}
				<li>
					<button
						type="button"
						aria-current={i === step ? 'step' : undefined}
						class="w-full text-left rounded-lg px-2.5 py-1.5 transition flex gap-2 {i === step ? 'bg-brand-blue text-on-brand' : 'text-muted hover:text-primary hover:bg-surface'}"
						onclick={() => (step = i)}
					>
						<span class="tabular-nums w-4 shrink-0 text-right">{i}</span><span>{s.title}</span>
					</button>
				</li>
			{/each}
		</ol>
	</div>
	<p class="text-[11px] text-muted mt-4 leading-relaxed">
		Schema semplificato, non in scala, della tecnica con inversione della pelle del pene. Le tecniche variano tra chirurghi e centri: serve a capire le fasi principali, non sostituisce la spiegazione del chirurgo.
	</p>
</figure>

<style>
	.procedure-diagram {
		--tissue: color-mix(in srgb, var(--color-primary) 6%, var(--color-bg));
		--tissue-2: color-mix(in srgb, var(--color-primary) 11%, var(--color-bg));
		--tissue-3: color-mix(in srgb, var(--color-primary) 18%, var(--color-bg));
		--line: color-mix(in srgb, var(--color-primary) 32%, var(--color-bg));
		--shade: color-mix(in srgb, var(--color-primary) 20%, var(--color-bg));
		--t: 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}
	/* 2.5D: crisp offset shadow = extruded paper layer */
	.layer {
		filter: drop-shadow(3px 5px 0 var(--shade));
	}
	/* Only on elements moved by CSS: on the others it would distort their own rotate() attribute. */
	.skin-sleeve,
	.spongiosum,
	.glans {
		transform-box: fill-box;
		transform-origin: center;
	}
	.ready svg * {
		transition:
			opacity var(--t),
			fill var(--t),
			stroke var(--t),
			stroke-width var(--t),
			transform var(--t);
	}
	.reduced svg * {
		transition: none !important;
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
	.labia-maj path {
		fill: var(--tissue-2);
		stroke: var(--line);
		stroke-width: 1.5;
	}
	.organ.small {
		fill: var(--tissue-3);
	}
	.tube {
		fill: none;
		stroke: var(--tissue-3);
		stroke-width: 28;
		stroke-linecap: round;
	}
	/* the rectum is a stroked line: highlight its stroke, never fill the curve */
	.rectum.active {
		fill: none !important;
		stroke: color-mix(in srgb, var(--color-brand-blue) 55%, var(--color-bg));
	}
	.sphincter {
		fill: none;
		stroke: var(--line);
		stroke-width: 2;
	}
	.cavernosa,
	.spongiosum,
	.testis,
	.epididymis,
	.glans {
		fill: var(--tissue-3);
		stroke: var(--line);
		stroke-width: 1.2;
	}
	.cord {
		fill: none;
		stroke: var(--line);
		stroke-width: 4;
		stroke-linecap: round;
	}
	.nv-bundle {
		fill: none;
		stroke: var(--color-primary);
		stroke-opacity: 0.45;
		stroke-width: 2;
		stroke-dasharray: 1 4;
		stroke-linecap: round;
	}
	.urethra {
		fill: none;
		stroke: var(--color-primary);
		stroke-opacity: 0.6;
		stroke-width: 3;
		stroke-linecap: round;
	}
	.catheter {
		fill: none;
		stroke: var(--color-primary);
		stroke-opacity: 0.35;
		stroke-width: 1.5;
		stroke-dasharray: 6 4;
		opacity: 0;
	}
	.canal {
		fill: none;
		stroke: var(--color-brand-pink);
		stroke-width: 16;
		stroke-linecap: round;
		stroke-dasharray: 4 7;
		opacity: 0;
	}
	.canal.lined {
		stroke-width: 20;
		stroke-dasharray: none;
	}
	.packing {
		fill: none;
		stroke: var(--color-bg);
		stroke-width: 7;
		stroke-linecap: round;
		opacity: 0;
	}
	.clitoris {
		fill: var(--color-brand-pink);
		stroke: var(--color-primary);
		stroke-width: 1;
		opacity: 0;
	}
	.meatus {
		fill: var(--color-bg);
		stroke: var(--color-primary);
		stroke-width: 1.2;
		opacity: 0;
	}
	.labia-maj path {
		fill: color-mix(in srgb, var(--color-brand-pink) 45%, var(--color-bg));
	}
	.labia-min {
		fill: none;
		stroke: var(--color-brand-pink);
		stroke-width: 4;
		stroke-linecap: round;
		opacity: 0;
	}
	.labia-maj,
	.short {
		opacity: 0;
	}

	/* states */
	.active {
		fill: var(--color-brand-blue) !important;
	}
	.cord.active,
	.nv-bundle.active,
	.skin.active {
		stroke: var(--color-brand-blue) !important;
		stroke-opacity: 1;
	}
	.nv-bundle.active {
		stroke-width: 3;
		stroke-dasharray: none;
	}
	.ghost {
		fill: none !important;
		stroke: var(--line) !important;
		stroke-dasharray: 3 4;
		opacity: 0.45;
	}
	.urethra.ghost {
		stroke-opacity: 0.25;
	}
	.gone {
		opacity: 0;
	}
	.show {
		opacity: 1 !important;
	}
	.skin-sleeve.lifted {
		transform: translate(-14px, -10px);
	}
	/* the skin sleeve travels into the new canal and becomes its lining */
	.skin-sleeve.inverted {
		transform: translate(170px, -40px) rotate(-60deg) scale(0.5);
		opacity: 0;
	}
	.spongiosum.separated {
		transform: translate(10px, 10px);
	}
	.glans.trimmed {
		transform: scale(0.6);
	}
	.glans.moved {
		transform: translate(150px, -80px) scale(0.35);
	}
	.nv-bundle.moved {
		opacity: 0;
	}
	.labels text {
		font-size: 12px;
		fill: var(--color-muted);
		paint-order: stroke;
		stroke: var(--color-bg);
		stroke-width: 3px;
	}
	.labels .faint {
		opacity: 0.7;
	}
	.labels .when {
		opacity: 0;
	}
	.labels .when.faint.show {
		opacity: 0.7 !important;
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
