<script lang="ts">
	import { onMount } from 'svelte';
	import { vaginoplastySteps as steps } from './vaginoplasty-steps';

	// 3D anatomy from BodyParts3D (CC BY 4.0) inside a translucent whole body, optionally cut along
	// the midline (sagittal section). Each step assigns a state to every part; the render loop eases
	// colour, opacity, position and scale towards it. New structures (canal, packing,
	// catheter) are built in the real space between prostate and rectum and drawn on top ("x-ray").

	type State = 'n' | 'a' | 'g' | 'h' | 'p' | 'pl'; // normal, active, ghost (removed), hidden, pink (new), pink light
	const PARTS = [
		'body', 'body_genital', 'body_vulva', 'bladder', 'prostate', 'urethra', 'rectum', 'seminal_vesicles', 'anal_sphincter', 'sacrum', 'hip_left', 'hip_right',
		'corpora_cavernosa', 'corpus_spongiosum', 'glans', 'testes', 'epididymides', 'dorsal_artery', 'dorsal_vein',
		'skin', 'skin_penile', 'skin_scrotal', 'canal', 'packing', 'catheter', 'f_vulva', 'f_vagina'
	] as const;
	type Part = (typeof PARTS)[number];
	const NEW: Part[] = ['canal', 'f_vulva', 'f_vagina', 'packing', 'catheter'];

	function stateFor(step: number): Partial<Record<Part, State>> {
		// The cropped perineal skin is a ragged sheet in section: only penile and scrotal skin are shown.
		// Removed parts stay as a transparent ghost only in the step right after their removal, then disappear.
		const s: Partial<Record<Part, State>> = { skin: 'h', canal: 'h', packing: 'h', catheter: 'h', f_vulva: 'h', f_vagina: 'h', body_vulva: 'h' };
		const removed = (part: Part, at: number) => {
			if (step === at) s[part] = 'a';
			else if (step === at + 1) s[part] = 'g';
			else if (step > at + 1) s[part] = 'h';
		};
		removed('testes', 1);
		removed('epididymides', 1);
		if (step === 2) s.skin_penile = 'a';
		if (step === 3) Object.assign(s, { corpus_spongiosum: 'a', urethra: 'a' });
		if (step === 4) Object.assign(s, { dorsal_artery: 'a', dorsal_vein: 'a', glans: 'a' });
		removed('corpora_cavernosa', 5);
		if (step === 6 || step === 7) s.canal = step === 6 ? 'pl' : 'p';
		if (step === 6) s.rectum = 'a';
		// it became the lining of the canal; the silhouette switches to the female profile at the same time
		if (step >= 7) Object.assign(s, { skin_penile: 'h', body_genital: 'h', body_vulva: 'n' });
		if (step === 7) Object.assign(s, { dorsal_artery: 'g', dorsal_vein: 'g' });
		// from step 8: a real vulva and vagina (MRI), fitted to this body at build time (scripts/build-female-anatomy.py)
		if (step >= 8) Object.assign(s, { dorsal_artery: 'h', dorsal_vein: 'h', glans: 'h', f_vulva: 'pl', f_vagina: 'p' });
		removed('corpus_spongiosum', 8);
		if (step === 8) s.corpus_spongiosum = 'g';
		if (step >= 8) s.skin_scrotal = 'h'; // the scrotal skin becomes the labia of the vulva
		if (step === 9) Object.assign(s, { packing: 'n', catheter: 'n' });
		return s;
	}

	// Muted anatomical colours; the brand blue (being worked on) and pink (new) stay reserved for the steps.
	const ANATOMY: Partial<Record<Part, string>> = {
		body: '#d9b99a', body_genital: '#d9b99a', body_vulva: '#d9b99a',
		sacrum: '#e8e1cf', hip_left: '#e8e1cf', hip_right: '#e8e1cf',
		bladder: '#e3c16f', urethra: '#d9b84a', prostate: '#cf9a62', seminal_vesicles: '#c7b07a',
		rectum: '#a07a5f', anal_sphincter: '#8f6650',
		corpora_cavernosa: '#b9534f', corpus_spongiosum: '#8f6aa3', glans: '#c4876e',
		testes: '#b3a2c8', epididymides: '#9a88b3',
		dorsal_artery: '#c43d3d', dorsal_vein: '#3e5c8a',
		skin: '#e4c4a3', skin_penile: '#e4c4a3', skin_scrotal: '#dcb796',
		packing: '#ffffff', catheter: '#9aa4ad'
	};
	const LEGEND: [string, string][] = [
		['Ossa', '#e8e1cf'], ['Vescica', '#e3c16f'], ['Uretra', '#d9b84a'], ['Prostata', '#cf9a62'], ['Retto', '#a07a5f'],
		['Corpi cavernosi', '#b9534f'], ['Corpo spongioso', '#8f6aa3'], ['Glande', '#c4876e'], ['Testicoli', '#b3a2c8'],
		['Arterie', '#c43d3d'], ['Vene', '#3e5c8a'], ['Pelle', '#e4c4a3']
	];

	// Labels anchored to structures, shown in the steps where they matter.
	type Label = { text: string; anchor: Part; from: number; to: number; accent?: boolean };
	const LABELS: Label[] = [
		{ text: 'vescica', anchor: 'bladder', from: 0, to: 10 },
		{ text: 'prostata', anchor: 'prostate', from: 0, to: 10 },
		{ text: 'retto', anchor: 'rectum', from: 0, to: 10 },
		{ text: 'testicoli', anchor: 'testes', from: 0, to: 1 },
		{ text: 'pene', anchor: 'corpora_cavernosa', from: 0, to: 0 },
		{ text: 'pelle del pene', anchor: 'skin_penile', from: 2, to: 2, accent: true },
		{ text: 'uretra e corpo spongioso', anchor: 'corpus_spongiosum', from: 3, to: 3, accent: true },
		{ text: 'vasi e nervi dorsali', anchor: 'dorsal_artery', from: 4, to: 4, accent: true },
		{ text: 'corpi cavernosi', anchor: 'corpora_cavernosa', from: 5, to: 5, accent: true },
		{ text: 'nuovo spazio', anchor: 'canal', from: 6, to: 6, accent: true },
		{ text: 'canale vaginale', anchor: 'canal', from: 7, to: 7, accent: true },
		{ text: 'neovagina', anchor: 'f_vagina', from: 8, to: 10, accent: true },
		{ text: 'vulva: clitoride, meato, labbra', anchor: 'f_vulva', from: 8, to: 10, accent: true },
		{ text: 'zaffo e catetere', anchor: 'packing', from: 9, to: 9 }
	];

	let step = $state(0);
	let playing = $state(false);
	let loaded = $state(false);
	let failed = $state(false);
	let section = $state(true);
	let canvasEl: HTMLCanvasElement;
	let wrapEl: HTMLDivElement;
	let labelEls: HTMLSpanElement[] = $state([]);
	let applyStep: ((n: number) => void) | undefined;
	let setSection: ((on: boolean) => void) | undefined;
	let resetView: (() => void) | undefined;

	$effect(() => {
		const n = step; // read first: an optional call on an undefined function would skip reading step
		applyStep?.(n);
	});
	$effect(() => {
		const on = section;
		setSection?.(on);
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
			scene.add(sun);

			// keep x <= 0.5 mm: the right half is cut away and the camera looks at the cut face
			const cut = [new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.5)];
			const CLIPPED: Part[] = ['skin_penile', 'skin_scrotal', 'bladder', 'prostate', 'urethra', 'rectum', 'anal_sphincter', 'sacrum', 'corpora_cavernosa', 'corpus_spongiosum', 'glans', 'hip_left'];

			const css = (v: string) => getComputedStyle(wrapEl).getPropertyValue(v).trim();
			const palette = () => {
				const bg = css('--color-bg') || '#fff';
				const pink = css('--color-brand-pink') || '#f5a9b8';
				return {
					active: new THREE.Color(css('--color-brand-blue') || '#5bcefa'),
					pink: new THREE.Color(pink).offsetHSL(0, 0.1, -0.08), // a touch deeper so new structures pop
					pinkLight: new THREE.Color(pink).lerp(new THREE.Color(bg), 0.3)
				};
			};
			let pal = palette();
			const baseOf = (p: Part) => new THREE.Color(ANATOMY[p] ?? '#c9c4bc');

			type Item = {
				mesh: import('three').Mesh;
				mat: import('three').MeshStandardMaterial | import('three').MeshBasicMaterial;
				home: import('three').Vector3;
				color: import('three').Color;
				opacity: number;
				offset: import('three').Vector3;
				scale: number;
			};
			const items = new Map<Part, Item>();
			const addItem = (part: Part, mesh: import('three').Mesh) => {
				const isNew = NEW.includes(part);
				// the decimated body has mixed face winding and noisy normals: unlit + double-sided keeps it uniform
				const isBody = part.startsWith('body');
				const mat = isBody
					? new THREE.MeshBasicMaterial({ color: baseOf(part), side: THREE.DoubleSide, transparent: true, depthWrite: false })
					: new THREE.MeshStandardMaterial({
					color: baseOf(part),
					roughness: 0.8,
					metalness: 0,
					side: part === 'body' ? THREE.FrontSide : THREE.DoubleSide,
					transparent: true,
					clippingPlanes: CLIPPED.includes(part) ? cut : [],
					depthTest: !isNew // new structures are drawn on top, so they are never hidden by organs
				});
				mesh.material = mat;
				mesh.renderOrder = isBody ? -1 : isNew ? 10 : 0;
				if (!mesh.geometry.attributes.normal) mesh.geometry.computeVertexNormals();
				// pivot each part on its own centre, so scaling shrinks it in place (vertices are in body mm)
				mesh.geometry.computeBoundingBox();
				const pivot = mesh.geometry.boundingBox!.getCenter(new THREE.Vector3());
				mesh.geometry.translate(-pivot.x, -pivot.y, -pivot.z);
				mesh.position.add(pivot);
				items.set(part, { mesh, mat, home: mesh.position.clone(), color: baseOf(part).clone(), opacity: 1, offset: new THREE.Vector3(), scale: 1 });
				scene.add(mesh);
			};

			let gltf;
			try {
				gltf = await new GLTFLoader().loadAsync('/anatomy/pelvis-male.glb');
			} catch {
				failed = true;
				return;
			}
			if (disposed) return;
			const meshes: Record<string, import('three').Mesh> = {};
			gltf.scene.traverse((o) => {
				if ((o as import('three').Mesh).isMesh) meshes[o.name] = o as import('three').Mesh;
			});
			for (const p of PARTS) if (meshes[p]) addItem(p, meshes[p]);

			// boxes of real structures, used to place the new ones
			const bb = (p: Part) => new THREE.Box3().setFromObject(items.get(p)!.mesh);
			const centre = (b: import('three').Box3) => b.getCenter(new THREE.Vector3());
			const pro = bb('prostate'), sph = bb('anal_sphincter'), bla = bb('bladder'), sv = bb('seminal_vesicles');
			// Real vulva + vagina (MRI), already in this model's coordinates; the file also carries the canal, traced
			// between rectum and prostate / vesicles up to the rectovesical pouch, and the new meatus.
			let female: Awaited<ReturnType<InstanceType<typeof GLTFLoader>['loadAsync']>> | undefined;
			try {
				female = await new GLTFLoader().loadAsync('/anatomy/vulva-female.glb');
			} catch {
				// without it: canal behind the prostate, no vulva
			}
			const vec = (p: number[]) => new THREE.Vector3(p[0], p[1], p[2]);
			const extras = female?.scene.userData as { canal?: number[][]; meatus?: number[] } | undefined;
			const canalCurve = new THREE.CatmullRomCurve3(
				extras?.canal?.map(vec) ?? [
					new THREE.Vector3(0, centre(sph).y - 30, sph.min.z - 15),
					new THREE.Vector3(0, pro.max.y - 2, pro.min.z + 2),
					new THREE.Vector3(0, centre(sv).y, sv.max.z + 25)
				]
			);
			const meatusPos = extras?.meatus ? vec(extras.meatus) : canalCurve.getPoint(0).add(new THREE.Vector3(0, -12, 6));
			const tube = (curve: import('three').Curve<import('three').Vector3>, r: number) =>
				new THREE.Mesh(new THREE.TubeGeometry(curve, 64, r, 24, false));
			const CANAL_R = 16; // ~3 cm wide, as the neovagina
			addItem('canal', tube(canalCurve, CANAL_R));
			addItem('packing', tube(canalCurve, 6));
			addItem('catheter', tube(new THREE.CatmullRomCurve3([centre(bla), new THREE.Vector3(0, centre(pro).y, centre(pro).z), meatusPos]), 1.6));
			const femaleParts: import('three').Mesh[] = []; // collected first: addItem moves them out of the group
			female?.scene.traverse((o) => {
				if ((o as import('three').Mesh).isMesh) femaleParts.push(o as import('three').Mesh);
			});
			for (const m of femaleParts) addItem(('f_' + m.name) as Part, m);

			// the penile skin travels into the canal at step 7; the camera centres on the vulva in the last steps
			const skinTravel = new THREE.Vector3().subVectors(canalCurve.getPoint(0.5), centre(bb('skin_penile')));
			// The new canal takes room: measure how far the rectum (behind) and the prostate (in front) reach into
			// it, plus 2 mm of tissue, and push them just that far (capped), along the antero-posterior axis.
			const samples = canalCurve.getSpacedPoints(80);
			const canalYAt = (z: number) => samples.reduce((a, b) => (Math.abs(b.z - z) < Math.abs(a.z - z) ? b : a)).y;
			const [zLo, zHi] = [Math.min(...samples.map((p) => p.z)), Math.max(...samples.map((p) => p.z))];
			const overlap = (part: Part, behind: boolean) => {
				const m = items.get(part)!.mesh;
				m.updateMatrixWorld(true);
				const pos = m.geometry.attributes.position;
				const v = new THREE.Vector3();
				let need = 0;
				for (let i = 0; i < pos.count; i++) {
					v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
					if (Math.abs(v.x) > CANAL_R || v.z < zLo || v.z > zHi) continue;
					const y = canalYAt(v.z);
					need = Math.max(need, behind ? y + CANAL_R + 2 - v.y : v.y - (y - CANAL_R - 2));
				}
				return Math.min(need, 25);
			};
			const pushForward = new THREE.Vector3(0, -Math.max(overlap('prostate', false), overlap('bladder', false)), 0);
			const pushBack = new THREE.Vector3(0, overlap('rectum', true), 0);
			// after step 8 the penile urethra is gone: keep only what lies behind the new meatus
			const urethraEnd = new THREE.Plane(new THREE.Vector3(0, 1, 0), -meatusPos.y);

			// framing: lateral view of the pelvis, slightly from the front and above
			const view = new THREE.Box3();
			for (const p of ['bladder', 'prostate', 'rectum', 'anal_sphincter', 'glans', 'skin_scrotal'] as Part[]) view.union(bb(p));
			const target = centre(view);
			const radius = view.getSize(new THREE.Vector3()).length() / 2;
			const home = target.clone().add(new THREE.Vector3(radius * 3.4, -radius * 0.5, radius * 0.5));

			// rotate by dragging; zoom only with a pinch (trackpad/touch) or ctrl+wheel, so the page keeps scrolling
			canvasEl.addEventListener(
				'wheel',
				(e) => {
					if (!e.ctrlKey) e.stopImmediatePropagation();
				},
				{ capture: true }
			);
			const controls = new OrbitControls(camera, canvasEl);
			controls.enablePan = false;
			controls.enableDamping = true;
			controls.minDistance = radius * 1.2;
			controls.maxDistance = radius * 14;
			controls.zoomSpeed = 0.6;
			// result: vulva and neovagina from the side and slightly from the front, so the vulva shows on the outline
			const fBox = new THREE.Box3().setFromPoints(canalCurve.getPoints(8));
			if (items.has('f_vulva')) fBox.union(bb('f_vulva'));
			const perinealTarget = centre(fBox);
			const perinealView = perinealTarget.clone().add(new THREE.Vector3(radius * 3.4, -radius * 1.0, -radius * 0.05));
			const goal = { target: target.clone(), position: home.clone() };
			let follow = true; // eased camera moves until the user takes over; reset on each step
			controls.addEventListener('start', () => (follow = false));
			const aim = (n: number) => {
				const close = n >= 8;
				goal.target.copy(close ? perinealTarget : target);
				goal.position.copy(close ? perinealView : home);
				follow = true;
			};
			resetView = () => aim(step);
			controls.target.copy(target);
			camera.position.copy(home);

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

			setSection = () => applyStep?.(step); // planes are (re)assigned per material in applyStep

			const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
			const snap = (it: Item) => {
				it.mat.color.copy(it.color);
				it.mat.opacity = it.opacity;
				it.mesh.position.copy(it.home).add(it.offset);
				it.mesh.scale.setScalar(it.scale);
			};
			applyStep = (n: number) => {
				aim(n);
				const st = stateFor(n);
				for (const [part, it] of items) {
					const s = st[part] ?? 'n';
					it.color = s === 'a' ? pal.active : s === 'p' ? pal.pink : s === 'pl' ? pal.pinkLight : baseOf(part);
					it.opacity =
						s === 'h' ? 0
						: s === 'g' ? 0.1
						: part.startsWith('body') ? 0.045
						: part === 'canal' ? (s === 'pl' ? 0.7 : 0.92)
						: part === 'hip_right' || part === 'sacrum' ? 0.4
						: part === 'hip_left' ? (section ? 0.4 : 0)
						: 1;
					it.offset.set(0, 0, 0);
					it.scale = 1;
					const xray = NEW.includes(part) || s === 'p';
					it.mat.depthTest = !xray;
					it.mesh.renderOrder = part.startsWith('body') ? -1 : xray ? 10 : 0;
				}
				if (n >= 2 && n <= 6) items.get('skin_penile')!.offset.set(0, -6, 4); // lifted off the shaft
				if (n >= 7) items.get('skin_penile')!.offset.copy(skinTravel);
				if (n >= 4 && n <= 7) items.get('glans')!.scale = 0.7;
				if (n >= 6) {
					for (const p of ['prostate', 'bladder', 'seminal_vesicles', 'urethra'] as Part[]) items.get(p)!.offset.copy(pushForward);
					items.get('rectum')!.offset.copy(pushBack);
				}
				const ure = items.get('urethra')!.mat;
				ure.clippingPlanes = [...(section ? cut : []), ...(n >= 8 ? [urethraEnd] : [])];
				for (const p of CLIPPED) if (p !== 'urethra') items.get(p)!.mat.clippingPlanes = section ? cut : [];
				if (reduced) for (const it of items.values()) snap(it);
			};
			applyStep(step);
			for (const it of items.values()) snap(it);

			// labels follow their structure on screen
			const anchorOf = (p: Part) => {
				const it = items.get(p)!;
				if (p === 'canal') return canalCurve.getPoint(0.55);
				return centre(new THREE.Box3().setFromObject(it.mesh));
			};
			const v = new THREE.Vector3();
			const placeLabels = () => {
				const w = wrapEl.clientWidth, h = wrapEl.clientHeight;
				LABELS.forEach((l, i) => {
					const el = labelEls[i];
					if (!el) return;
					const on = step >= l.from && step <= l.to && (items.get(l.anchor)?.mat.opacity ?? 0) > 0.3;
					v.copy(anchorOf(l.anchor)).project(camera);
					el.style.opacity = on && v.z < 1 ? '1' : '0';
					el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px) translate(-50%, -140%)`;
				});
			};

			let raf = 0;
			const tmp = new THREE.Vector3();
			const tick = () => {
				for (const it of items.values()) {
					it.mat.color.lerp(it.color, 0.08);
					it.mat.opacity += (it.opacity - it.mat.opacity) * 0.08;
					it.mesh.visible = it.mat.opacity > 0.01;
					it.mat.depthWrite = it.mat.opacity > 0.9 && it.mat.depthTest;
					it.mesh.position.lerp(tmp.copy(it.home).add(it.offset), 0.06);
					it.mesh.scale.setScalar(it.mesh.scale.x + (it.scale - it.mesh.scale.x) * 0.08);
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
				<canvas bind:this={canvasEl} class="block w-full h-full" aria-label="Modello 3D animato della vaginoplastica, passo {step}: {steps[step].title}"></canvas>
				{#each LABELS as l, i}
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
				{#if step >= 8}
					<p class="absolute left-3 top-3 right-3 sm:right-auto sm:max-w-sm rounded-lg bg-bg/90 border border-border px-3 py-2 text-[11px] leading-snug text-muted-text pointer-events-none">
						Vulva e vagina hanno la forma reale (risonanza magnetica di una donna), adattata a questo corpo. Nella neovagina non ci sono utero né cervice; prostata e vescica restano davanti al canale.
					</p>
				{/if}
				<p class="absolute right-3 bottom-3 text-[11px] text-muted pointer-events-none">trascina per ruotare · pizzica per zoomare</p>
			</div>

			<div class="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[11px] text-muted">
				{#each LEGEND as [name, color]}<span class="inline-flex items-center gap-1.5"><span class="size-2.5 rounded-full" style="background:{color}"></span>{name}</span>{/each}
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
	<p class="text-[11px] text-muted mt-4 leading-relaxed">
		Modello anatomico 3D (BodyParts3D, © The Database Center for Life Science, CC BY 4.0). Vulva e vagina del risultato: «Pelvic Organs from MRI» di audreybyrd (Sketchfab, CC BY 4.0), adattate a questo corpo. Canale nelle fasi intermedie, zaffo e catetere sono ricostruzioni schematiche. Le tecniche variano tra chirurghi e centri: non sostituisce la spiegazione del chirurgo.
	</p>
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
