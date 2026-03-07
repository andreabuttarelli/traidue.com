<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';

	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Tra i Due',
		url: 'https://www.traidue.com',
		description:
			'Informazione evidence-based sulle tematiche trans: identità di genere, scienza, percorsi e cultura.',
		email: 'info@traidue.com',
		logo: {
			'@type': 'ImageObject',
			url: 'https://www.traidue.com/favicon.png'
		},
		founder: {
			'@type': 'Person',
			name: 'Andrea Buttarelli',
			url: 'https://www.traidue.com/chi-siamo',
			jobTitle: 'Founder',
			sameAs: [
				'https://www.instagram.com/andrea_buttarelli',
				'https://www.linkedin.com/in/andreabuttarelli/',
				'https://github.com/andreabuttarelli'
			]
		},
		sameAs: [
			'https://github.com/andreabuttarelli/traidue.com',
			'https://www.instagram.com/tra.i.due'
		]
	};

	const founderSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Andrea Buttarelli',
		url: 'https://www.traidue.com/chi-siamo',
		jobTitle: 'Founder',
		description: 'Docente IED, imprenditrice tech e AI. Founder di Tra i Due.',
		worksFor: {
			'@type': 'Organization',
			name: 'Tra i Due',
			url: 'https://www.traidue.com'
		},
		sameAs: [
			'https://www.instagram.com/andrea_buttarelli',
			'https://www.linkedin.com/in/andreabuttarelli/',
			'https://github.com/andreabuttarelli'
		]
	};
</script>

<SEO
	title="Chi Siamo"
	description="Scopri la missione di Tra i Due: raccontare le tematiche trans con rigore scientifico, storie di successo e una wiki tematica tra le più complete in italiano."
	url="https://www.traidue.com/chi-siamo"
/>

<StructuredData schema={organizationSchema} />
<StructuredData schema={founderSchema} />

<div class="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Chi Siamo' }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">Chi Siamo</h1>
		<p class="text-lg text-muted leading-relaxed max-w-xl">
			<strong class="text-primary">Tra i Due</strong> nasce con l'obiettivo di offrire informazione chiara e scientificamente
			rigorosa sulle tematiche trans, raccontare storie di successo e costruire la risorsa tematica più completa in italiano.
		</p>
	</header>

	<div class="rounded-xl overflow-hidden mb-10 sm:mb-16">
		<img
			src="/images/wiki/successi-persone-trans.webp"
			alt="Chi Siamo — Tra i Due"
			width="1344"
			height="768"
			decoding="async"
			class="w-full aspect-[16/9] object-cover"
		/>
	</div>

	<article>
		<div class="prose prose-lg max-w-none space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Missione</h2>
			<div>
				<p>
					Il nostro progetto si propone di <strong>informare</strong> su tematiche legate
					all'identità di genere con rigore scientifico, rendendo accessibili contenuti spesso
					confinati alla letteratura accademica o frammentati in fonti poco affidabili.
				</p>
				<p>
					Crediamo che la <strong>narrazione dominante</strong> sulle persone trans sia incompleta. Si parla
					di difficoltà, raramente di successi. Imprenditori, artisti, avvocati, scienziati: le persone
					trans stanno ricoprendo ruoli chiave nella società. Noi siamo qui per raccontare anche queste
					storie, sempre con le fonti alla mano.
				</p>
				<p>
					Vogliamo essere una <strong>risorsa accessibile</strong> tanto per le persone trans quanto
					per le persone cisgender che desiderano comprendere meglio queste tematiche, in un
					linguaggio chiaro e rispettoso.
				</p>
				<p>
					Il progetto è fondato e curato da <strong>Andrea Buttarelli</strong>, docente presso
					<strong>IED</strong> (Istituto Europeo di Design) e imprenditrice nel settore tech e AI.
					Ogni articolo è scritto, verificato e curato a partire da fonti peer-reviewed, con
					l'obiettivo di mettere competenze tecniche a disposizione della comunità trans. Stiamo
					organizzando con associazioni trans e LGBT dei workshop tecnici su AI, programmazione
					e marketing.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Metodologia</h2>
			<div>
				<p>
					La qualità dell'informazione dipende dalle sue fonti. Per questo adottiamo un approccio
					rigoroso nella selezione e nella citazione dei riferimenti bibliografici.
				</p>
				<ul>
					<li>
						Ogni articolo cita <strong>fonti peer-reviewed</strong>, ovvero pubblicazioni
						sottoposte a revisione da parte della comunità scientifica.
					</li>
					<li>
						I contenuti vengono <strong>aggiornati regolarmente</strong> per riflettere le evidenze
						più recenti e le evoluzioni nel campo della ricerca.
					</li>
					<li>
						Manteniamo piena <strong>trasparenza sui metodi</strong>: ogni affermazione rilevante
						include il riferimento alla fonte originale, consultabile direttamente.
					</li>
				</ul>
				<p>
					Questo approccio ci consente di offrire contenuti affidabili e di contribuire a una
					discussione pubblica informata e basata sui fatti.
				</p>
				<p>
					Per saperne di più sul nostro utilizzo dell'intelligenza artificiale, leggi
					<a href="/perche-ai" class="text-primary underline hover:no-underline">perché usiamo l'AI</a>.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Open Source</h2>
			<div>
				<p>
					Tra i Due è un progetto <strong>open source</strong>. Il codice sorgente, gli articoli e
					tutti i contenuti sono pubblici e consultabili su GitHub.
				</p>
				<p>
					Chiunque può contribuire: segnalare errori, proporre miglioramenti, aggiungere fonti o
					scrivere nuovi articoli. La trasparenza non riguarda solo le fonti che citiamo, ma il
					progetto stesso.
				</p>
				<p>
					<a
						href="https://github.com/andreabuttarelli/traidue.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary underline hover:no-underline"
					>
						github.com/andreabuttarelli/traidue.com
					</a>
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Contatti</h2>
			<div>
				<p>
					Per domande, suggerimenti o collaborazioni:
				</p>
				<p class="flex flex-wrap gap-x-4 gap-y-1">
					<a href="mailto:andrea@teta.so" class="text-primary underline hover:no-underline">andrea@teta.so</a>
					<a href="https://www.instagram.com/tra.i.due" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Instagram</a>
					<a href="https://www.linkedin.com/in/andreabuttarelli/" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">LinkedIn</a>
					<a href="https://github.com/andreabuttarelli/traidue.com" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">GitHub</a>
				</p>
			</div>
		</section>

		<section class="border-t border-border pt-10 sm:pt-16">
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Per associazioni e professionisti</h2>
			<div>
				<p>
					Sei un'<strong>associazione</strong>, un'<strong>organizzazione</strong> o un <strong>professionista</strong> che lavora con persone trans?
					Ci piacerebbe collaborare: segnalaci risorse, proponi contenuti o aiutaci a raggiungere chi ha bisogno di informazione accessibile.
				</p>
				<p>
					Scrivici a
					<a href="mailto:andrea@teta.so" class="text-primary underline hover:no-underline">andrea@teta.so</a>
				</p>
			</div>
		</section>
		</div>
	</article>
</div>
