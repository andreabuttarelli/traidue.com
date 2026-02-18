<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';

	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Tra i Due',
		url: 'https://traidue.com',
		description:
			'Informazione evidence-based sulle tematiche trans: identità di genere, scienza, percorsi e cultura.',
		email: 'info@traidue.com',
		sameAs: []
	};
</script>

<SEO
	title="Chi Siamo"
	description="Scopri la missione di Tra i Due: informare sulle tematiche trans con rigore scientifico, combattere la disinformazione e offrire una risorsa accessibile a tutti."
	url="https://traidue.com/chi-siamo"
/>

<StructuredData schema={organizationSchema} />

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Chi Siamo' }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">Chi Siamo</h1>
		<p class="text-lg text-muted leading-relaxed max-w-xl">
			<strong class="text-primary">Tra i Due</strong> nasce con l'obiettivo di offrire informazione chiara, accessibile e
			scientificamente rigorosa sulle tematiche trans.
		</p>
	</header>

	<div class="max-w-prose space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Missione</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Il nostro progetto si propone di <strong>informare</strong> su tematiche legate
					all'identità di genere con rigore scientifico, rendendo accessibili contenuti spesso
					confinati alla letteratura accademica o frammentati in fonti poco affidabili.
				</p>
				<p>
					Crediamo che la <strong>disinformazione</strong> sia uno degli ostacoli principali al
					riconoscimento e alla tutela delle persone trans. Per questo, ogni contenuto pubblicato su
					Tra i Due viene elaborato a partire da evidenze scientifiche e fonti verificabili.
				</p>
				<p>
					Vogliamo essere una <strong>risorsa accessibile</strong> tanto per le persone trans quanto
					per le persone cisgender che desiderano comprendere meglio queste tematiche, in un
					linguaggio chiaro e rispettoso.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Metodologia</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					La qualità dell'informazione dipende dalle sue fonti. Per questo adottiamo un approccio
					rigoroso nella selezione e nella citazione dei riferimenti bibliografici.
				</p>
				<ul class="list-disc list-inside space-y-2 pl-2 text-text">
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
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Contatti</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Per domande, suggerimenti o collaborazioni, puoi scriverci all'indirizzo:
				</p>
				<p>
					<a href="mailto:info@traidue.com" class="text-primary underline hover:no-underline">
						info@traidue.com
					</a>
				</p>
			</div>
		</section>
	</div>
</div>
