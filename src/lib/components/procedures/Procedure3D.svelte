<script lang="ts">
	import { onMount } from 'svelte';
	import type { Procedure3DConfig, State } from './procedure-3d';

	// Generic animated 3D procedure: real anatomy from GLB files, one state per part and step (see procedure-3d.ts).
	// Same rendering as Vaginoplasty3D (which has its own geometry for the canal): the render loop eases colour,
	// opacity and the camera towards each step; new structures are drawn on top ("x-ray").
	let { config }: { config: Procedure3DConfig } = $props();
	const steps = config.steps;

	let step = $state(0);
	let playing = $state(false);
	let loaded = $state(false);
	let failed = $state(false);
	let section = $state(true);
	let canvasEl: HTMLCanvasElement;
	let wrapEl: HTMLDivElement;
	let labelEls: HTMLSpanElement[] = $state([]);
	let applyStep: ((n: number) => void) | undefined;
	let resetView: (() => void) | undefined;

	$effect(() => {
		const n = step;
		const on = section;
		void on;
		applyStep?.(n);
	});

	onMount(() => {
		let disposed = false;
		let cleanup = () => {};
		const timer = setInterval(() => {
			if (playing) step = step === steps.length - 1 ? 0 : step + 1;
		}, 5500);

		(async () => {
			const THREE = await import('three');
			const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
			const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
			if (disposed) return;

			const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
			renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
			renderer.localClippingEnabled = true;
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(30, 1, 1, 8000);
			camera.up.set(0, 0, 1);
			scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 2.1));
			const sun = new THREE.DirectionalLight(0xffffff, 1.5);
			sun.position.set(1, -1, 2);
			scene.add(sun);
			const cut = [new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.5)];

			const css = (v: string) => getComputedStyle(wrapEl).getPropertyValue(v).trim();
			const palette = () => {
				const bg = css('--color-bg') || '#fff';
				const pink = css('--color-brand-pink') || '#f5a9b8';
				return {
					active: new THREE.Color(css('--color-brand-blue') || '#5bcefa'),
					pink: new THREE.Color(pink).offsetHSL(0, 0.1, -0.08),
					pinkLight: new THREE.Color(pink).lerp(new THREE.Color(bg), 0.3)
				};
			};
			let pal = palette();

			type Item = {
				mesh: import('three').Mesh;
				mat: import('three').MeshStandardMaterial | import('three').MeshBasicMaterial;
				color: import('three').Color;
				opacity: number;
			};
			const items = new Map<string, Item>();
			let models;
			try {
				models = await Promise.all(config.models.map((u) => new GLTFLoader().loadAsync(u)));
			} catch {
				failed = true;
				return;
			}
			if (disposed) return;
			const meshes: import('three').Mesh[] = [];
			for (const g of models) g.scene.traverse((o) => (o as import('three').Mesh).isMesh && meshes.push(o as import('three').Mesh));
			for (const mesh of meshes) {
				const part = config.parts[mesh.name];
				if (!part) continue;
				const base = new THREE.Color(part.color);
				const mat = part.ghost
					? new THREE.MeshBasicMaterial({ color: base, side: THREE.DoubleSide, transparent: true, depthWrite: false })
					: new THREE.MeshStandardMaterial({ color: base, roughness: 0.8, metalness: 0, side: THREE.DoubleSide, transparent: true });
				mesh.material = mat;
				mesh.renderOrder = part.ghost ? -1 : 0;
				if (!mesh.geometry.attributes.normal) mesh.geometry.computeVertexNormals();
				items.set(mesh.name, { mesh, mat, color: base.clone(), opacity: 1 });
				scene.add(mesh);
			}

			const box = (names: string[]) => {
				const b = new THREE.Box3();
				for (const n of names) {
					const it = items.get(n);
					if (it) b.expandByObject(it.mesh);
				}
				return b;
			};
			const all = box([...items.keys()].filter((n) => !config.parts[n].ghost));
			const radius = all.getSize(new THREE.Vector3()).length() / 2;
			const dir = new THREE.Vector3(...config.view).normalize();

			// rotate by dragging; zoom only with a pinch (trackpad/touch) or ctrl+wheel, so the page keeps scrolling
			canvasEl.addEventListener('wheel', (e) => e.ctrlKey || e.stopImmediatePropagation(), { capture: true });
			const controls = new OrbitControls(camera, canvasEl);
			controls.enablePan = false;
			controls.enableDamping = true;
			controls.minDistance = radius * 0.4;
			controls.maxDistance = radius * 12;
			controls.zoomSpeed = 0.6;
			const goal = { target: new THREE.Vector3(), position: new THREE.Vector3() };
			let follow = true;
			controls.addEventListener('start', () => (follow = false));
			const aim = (n: number) => {
				const b = box(config.focus(n));
				const target = (b.isEmpty() ? all : b).getCenter(new THREE.Vector3());
				const r = Math.max((b.isEmpty() ? all : b).getSize(new THREE.Vector3()).length() / 2, radius * 0.35);
				goal.target.copy(target);
				goal.position.copy(target).addScaledVector(dir, r * (config.distance ?? 3.4));
				follow = true;
			};
			resetView = () => aim(step);
			aim(0);
			controls.target.copy(goal.target);
			camera.position.copy(goal.position);

			const resize = () => {
				const w = wrapEl.clientWidth, h = wrapEl.clientHeight;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
			};
			resize();
			const ro = new ResizeObserver(resize);
			ro.observe(wrapEl);
			const themeObs = new MutationObserver(() => {
				pal = palette();
				applyStep?.(step);
			});
			themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

			const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
			applyStep = (n: number) => {
				aim(n);
				const st = config.stateFor(n);
				for (const [name, it] of items) {
					const part = config.parts[name];
					const s: State = st[name] ?? 'n';
					it.color = s === 'a' ? pal.active : s === 'p' ? pal.pink : s === 'pl' ? pal.pinkLight : new THREE.Color(part.color);
					it.opacity = s === 'h' ? 0 : s === 'g' ? 0.1 : part.ghost ? 0.06 : (part.opacity ?? 1);
					const xray = s === 'p' || s === 'pl';
					it.mat.depthTest = !xray;
					it.mesh.renderOrder = part.ghost ? -1 : xray ? 10 : 0;
					it.mat.clippingPlanes = part.clip && section ? cut : [];
					if (reduced) {
						it.mat.color.copy(it.color);
						it.mat.opacity = it.opacity;
					}
				}
			};
			applyStep(step);
			for (const it of items.values()) {
				it.mat.color.copy(it.color);
				it.mat.opacity = it.opacity;
			}

			const v = new THREE.Vector3();
			const placeLabels = () => {
				const w = wrapEl.clientWidth, h = wrapEl.clientHeight;
				config.labels.forEach((l, i) => {
					const el = labelEls[i];
					const it = items.get(l.anchor);
					if (!el || !it) return;
					const on = step >= l.from && step <= l.to && it.mat.opacity > 0.3;
					new THREE.Box3().setFromObject(it.mesh).getCenter(v).project(camera);
					el.style.opacity = on && v.z < 1 ? '1' : '0';
					el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, -140%)`;
				});
			};

			let raf = 0;
			const tick = () => {
				for (const it of items.values()) {
					it.mat.color.lerp(it.color, 0.08);
					it.mat.opacity += (it.opacity - it.mat.opacity) * 0.08;
					it.mesh.visible = it.mat.opacity > 0.01;
					it.mat.depthWrite = it.mat.opacity > 0.9 && it.mat.depthTest;
				}
				if (follow) {
					controls.target.lerp(goal.target, reduced ? 1 : 0.06);
					camera.position.lerp(goal.position, reduced ? 1 : 0.06);
				}
				controls.update();
				renderer.render(scene, camera);
				placeLabels();
				raf = requestAnimationFrame(tick);
			};
			tick();
			loaded = true;

			cleanup = () => {
				cancelAnimationFrame(raf);
				ro.disconnect();
				themeObs.disconnect();
				controls.dispose();
				renderer.dispose();
			};
		})();

		return () => {
			disposed = true;
			clearInterval(timer);
			cleanup();
		};
	});
</script>

<figure class="procedure-3d rounded-2xl border border-border p-4 sm:p-6">
	<div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_15rem] gap-6">
		<div>
			<div bind:this={wrapEl} class="relative w-full rounded-xl overflow-hidden bg-surface cursor-grab active:cursor-grabbing touch-none" style="aspect-ratio: 1 / 0.66">
				<canvas bind:this={canvasEl} class="block w-full h-full" aria-label="{config.label}, passo {step}: {steps[step].title}"></canvas>
				{#each config.labels as l, i}
					<span
						bind:this={labelEls[i]}
						class="absolute left-0 top-0 pointer-events-none whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] transition-opacity duration-300 {l.accent ? 'bg-brand-pink text-on-brand font-semibold' : 'bg-bg/85 text-primary border border-border'}"
						style="opacity:0"
					>{l.text}</span>
				{/each}
				{#if !loaded}
					<p class="absolute inset-0 grid place-items-center text-sm text-muted">{failed ? 'Modello 3D non disponibile.' : 'Caricamento del modello 3D…'}</p>
				{/if}
				<div class="absolute left-3 bottom-3 flex gap-2">
					<button type="button" class="pill" aria-pressed={section} onclick={() => (section = !section)}>{section ? 'Sezione: sì' : 'Sezione: no'}</button>
					<button type="button" class="pill" onclick={() => resetView?.()}>Ripristina vista</button>
				</div>
				<p class="absolute right-3 bottom-3 text-[11px] text-muted pointer-events-none">trascina per ruotare · pizzica per zoomare</p>
			</div>

			<div class="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[11px] text-muted">
				{#each config.legend as [name, color]}<span class="inline-flex items-center gap-1.5"><span class="size-2.5 rounded-full" style="background:{color}"></span>{name}</span>{/each}
			</div>
			<div class="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[11px] text-muted">
				<span class="inline-flex items-center gap-1.5"><span class="size-2.5 rounded-sm bg-brand-blue"></span>in lavorazione in questo passo</span>
				<span class="inline-flex items-center gap-1.5"><span class="size-2.5 rounded-sm bg-brand-pink"></span>nuove strutture (sempre in primo piano)</span>
				<span class="inline-flex items-center gap-1.5"><span class="size-2.5 rounded-sm border border-border opacity-50"></span>rimosso (trasparente)</span>
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
	<p class="text-[11px] text-muted mt-4 leading-relaxed">{config.credits}</p>
</figure>

<style>
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
	.ctrl:not(:disabled):hover,
	.pill:hover {
		border-color: var(--color-brand-blue);
	}
	.pill {
		border-radius: 9999px;
		border: 1px solid var(--color-border);
		background: var(--color-bg);
		color: var(--color-primary);
		font-size: 11px;
		padding: 0.25rem 0.65rem;
	}
	.pill[aria-pressed='true'] {
		background: var(--color-brand-blue);
		border-color: var(--color-brand-blue);
		color: var(--color-on-brand);
	}
</style>
