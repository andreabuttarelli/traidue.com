<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import ShareButtons from '$lib/components/ui/ShareButtons.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';
	import TOC from '$lib/components/wiki/TOC.svelte';

	let { data } = $props();

	let openFaq = $state(-1);

	const url = $derived(`https://www.traidue.com/citta/${data.comune.slug}`);

	const tipiAssociazione: Record<string, string> = {
		lgbtq: 'LGBTQ+',
		genitori: 'Famiglie',
		legale: 'Legale',
		salute_mentale: 'Salute mentale',
		altro: 'Altro'
	};

	const tipiSportello: Record<string, string> = {
		legale: 'Legale',
		psicologico: 'Psicologico',
		sociale: 'Sociale',
		antidiscriminazione: 'Antidiscriminazione'
	};

	let pageSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: data.isRich
			? `Risorse trans a ${data.comune.nome}: centri, associazioni, iter`
			: `Risorse trans a ${data.comune.nome}`,
		description: data.dettaglio?.metaDescription ?? `Informazioni sulle tematiche trans per le persone di ${data.comune.nome}, ${data.comune.regione}.`,
		url,
		inLanguage: 'it',
		isPartOf: {
			'@type': 'WebSite',
			name: 'Tra i Due',
			url: 'https://www.traidue.com'
		}
	});

	let breadcrumbSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://www.traidue.com'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Città',
				item: 'https://www.traidue.com/citta'
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: data.comune.nome
			}
		]
	});

	let faqSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: data.dettaglio
			? data.dettaglio.faq.map((f) => ({
					'@type': 'Question',
					name: f.domanda,
					acceptedAnswer: {
						'@type': 'Answer',
						text: f.risposta
					}
				}))
			: [
					{
						'@type': 'Question',
						name: `Dove trovare informazioni sulle tematiche trans a ${data.comune.nome}?`,
						acceptedAnswer: {
							'@type': 'Answer',
							text: `Tra i Due offre articoli scientifici su identità di genere, transizione, diritti e cultura trans, utili per le persone di ${data.comune.nome}. Ogni contenuto cita fonti peer-reviewed.`
						}
					},
					{
						'@type': 'Question',
						name: `Quali sono i diritti delle persone trans a ${data.comune.nome}?`,
						acceptedAnswer: {
							'@type': 'Answer',
							text: `In Italia la legge 164/1982 consente la rettificazione anagrafica del sesso. I diritti sono uniformi a livello nazionale e si applicano anche a ${data.comune.nome}, ${data.comune.regione}.`
						}
					},
					{
						'@type': 'Question',
						name: `Esistono risorse per famiglie di persone trans a ${data.comune.nome}?`,
						acceptedAnswer: {
							'@type': 'Answer',
							text: `Sì, su Tra i Due trovi articoli dedicati alle famiglie: dal coming out al supporto psicologico, con indicazioni basate sulla ricerca scientifica.`
						}
					}
				]
	});

	let clinicSchemas = $derived(
		data.dettaglio
			? data.dettaglio.centri_gender.map((c) => ({
					'@context': 'https://schema.org',
					'@type': 'MedicalClinic',
					name: c.nome,
					address: {
						'@type': 'PostalAddress',
						streetAddress: c.indirizzo,
						addressLocality: c.citta,
						addressRegion: data.dettaglio!.regione,
						addressCountry: 'IT'
					},
					...(c.telefono ? { telephone: c.telefono } : {}),
					...(c.sito ? { url: c.sito } : {}),
					medicalSpecialty: 'Gender identity'
				}))
			: []
	);

	const gruppiAssociazioni = $derived(
		data.dettaglio ? Object.entries(Object.groupBy(data.dettaglio.associazioni, (a) => a.tipo)) : []
	);

	const gruppiSportelli = $derived(
		data.dettaglio ? Object.entries(Object.groupBy(data.dettaglio.sportelli, (s) => s.tipo)) : []
	);

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('it-IT', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<SEO
	title={data.isRich
		? `Risorse trans a ${data.comune.nome}: centri, associazioni, iter`
		: `Risorse trans a ${data.comune.nome}`}
	description={data.dettaglio?.metaDescription ?? `Informazioni sulle tematiche trans per le persone di ${data.comune.nome}, ${data.comune.regione}. Articoli scientifici, risorse e supporto.`}
	url="https://www.traidue.com/citta/{data.comune.slug}"
	noindex={!data.isRich}
/>

<StructuredData schema={pageSchema} />
<StructuredData schema={breadcrumbSchema} />
<StructuredData schema={faqSchema} />
{#each clinicSchemas as schema}
	<StructuredData {schema} />
{/each}

{#if data.isRich && data.dettaglio}
	<!-- ============================================ -->
	<!-- TEMPLATE RICCO — Città con dati dettagliati -->
	<!-- ============================================ -->
	<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
		<!-- Breadcrumb -->
		<Breadcrumb items={[
			{ label: 'Home', href: '/' },
			{ label: 'Città', href: '/citta' },
			{ label: data.comune.nome }
		]} />

		<div class="flex flex-col lg:flex-row lg:gap-16">
			<!-- TOC sidebar -->
			<TOC />

			<!-- Main content -->
			<article class="min-w-0 flex-1">
				<!-- 1. Hero / Intro -->
				<header class="mb-10 sm:mb-14">
					<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">
						Risorse trans a {data.comune.nome}
					</h1>
					<p class="text-base sm:text-lg text-primary/80 leading-relaxed mb-4 max-w-3xl">
						{data.dettaglio.intro}
					</p>
					<div class="flex flex-wrap items-center gap-4 text-sm text-muted">
						<span>Aggiornato il {formatDate(data.dettaglio.ultimoAggiornamento)}</span>
						<ShareButtons {url} text="Risorse trans a {data.comune.nome}" />
					</div>
				</header>

				<!-- 2. Centri di identità di genere -->
				{#if data.dettaglio.centri_gender.length > 0}
					<section class="mb-12 sm:mb-16">
						<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-6">
							Centri di identità di genere
						</h2>
						<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
							{#each data.dettaglio.centri_gender as centro}
								<div class="p-5 rounded-xl border border-border">
									<h3 class="text-base font-semibold text-primary mb-2">{centro.nome}</h3>
									<p class="text-sm text-muted mb-1">{centro.citta} — {centro.indirizzo}</p>
									{#if centro.telefono}
										<p class="text-sm text-muted">Tel: <a href="tel:{centro.telefono.replace(/\s/g, '')}" class="hover:text-primary transition">{centro.telefono}</a></p>
									{/if}
									{#if centro.sito}
										<p class="text-sm text-muted">
											<a href={centro.sito} target="_blank" rel="noopener noreferrer" class="hover:text-primary transition underline">Sito web</a>
										</p>
									{/if}
									{#if centro.note}
										<p class="text-sm text-muted mt-2">{centro.note}</p>
									{/if}
								</div>
							{/each}
						</div>
					</section>
				{/if}

				<!-- 3. Associazioni e supporto -->
				{#if data.dettaglio.associazioni.length > 0}
					<section class="mb-12 sm:mb-16">
						<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-6">
							Associazioni e supporto
						</h2>
						{#each gruppiAssociazioni as [tipo, lista]}
							{#if lista}
								<h3 class="text-base font-semibold text-primary mb-3 mt-6 first:mt-0">{tipiAssociazione[tipo] ?? tipo}</h3>
								<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
									{#each lista as assoc}
										<div class="p-5 rounded-xl border border-border">
											<h4 class="text-base font-semibold text-primary mb-1">{assoc.nome}</h4>
											<p class="text-sm text-muted mb-2">{assoc.citta}{#if assoc.indirizzo} — {assoc.indirizzo}{/if}</p>
											<p class="text-sm text-primary/80 leading-relaxed mb-2">{assoc.descrizione}</p>
											<div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
												{#if assoc.telefono}
													<span>Tel: <a href="tel:{assoc.telefono.replace(/\s/g, '')}" class="hover:text-primary transition">{assoc.telefono}</a></span>
												{/if}
												{#if assoc.email}
													<span><a href="mailto:{assoc.email}" class="hover:text-primary transition">{assoc.email}</a></span>
												{/if}
												{#if assoc.sito}
													<a href={assoc.sito} target="_blank" rel="noopener noreferrer" class="hover:text-primary transition underline">Sito web</a>
												{/if}
											</div>
										</div>
									{/each}
								</div>
							{/if}
						{/each}
					</section>
				{/if}

				<!-- 4. Sportelli e servizi -->
				{#if data.dettaglio.sportelli.length > 0}
					<section class="mb-12 sm:mb-16">
						<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-6">
							Sportelli e servizi
						</h2>
						{#each gruppiSportelli as [tipo, lista]}
							{#if lista}
								<h3 class="text-base font-semibold text-primary mb-3 mt-6 first:mt-0">{tipiSportello[tipo] ?? tipo}</h3>
								<div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
									{#each lista as sportello}
										<div class="p-5 rounded-xl border border-border">
											<h4 class="text-base font-semibold text-primary mb-1">{sportello.nome}</h4>
											<p class="text-sm text-muted mb-1">{sportello.ente} — {sportello.citta}</p>
											{#if sportello.indirizzo}
												<p class="text-sm text-muted">{sportello.indirizzo}</p>
											{/if}
											{#if sportello.orari}
												<p class="text-sm text-muted">Orari: {sportello.orari}</p>
											{/if}
											<div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted mt-1">
												{#if sportello.telefono}
													<span>Tel: <a href="tel:{sportello.telefono.replace(/\s/g, '')}" class="hover:text-primary transition">{sportello.telefono}</a></span>
												{/if}
												{#if sportello.email}
													<span><a href="mailto:{sportello.email}" class="hover:text-primary transition">{sportello.email}</a></span>
												{/if}
												{#if sportello.sito}
													<a href={sportello.sito} target="_blank" rel="noopener noreferrer" class="hover:text-primary transition underline">Sito web</a>
												{/if}
											</div>
											{#if sportello.note}
												<p class="text-sm text-muted mt-2">{sportello.note}</p>
											{/if}
										</div>
									{/each}
								</div>
							{/if}
						{/each}
					</section>
				{/if}

				<!-- 5. Iter sanitario -->
				<section class="mb-12 sm:mb-16">
					<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-4">
						Iter sanitario a {data.comune.nome}
					</h2>
					<p class="text-base text-primary/80 leading-relaxed mb-8 max-w-3xl">
						{data.dettaglio.iter_sanitario.intro}
					</p>

					<!-- Timeline -->
					<div class="space-y-0">
						{#each data.dettaglio.iter_sanitario.passi as passo, i}
							<div class="flex gap-4 sm:gap-5">
								<div class="flex flex-col items-center shrink-0">
									<div class="w-8 h-8 rounded-full bg-primary text-bg flex items-center justify-center text-xs font-semibold shrink-0">
										{passo.ordine}
									</div>
									{#if i < data.dettaglio.iter_sanitario.passi.length - 1}
										<div class="w-px flex-1 bg-border mt-2"></div>
									{/if}
								</div>
								<div class="pb-8 {i === data.dettaglio.iter_sanitario.passi.length - 1 ? 'pb-0' : ''}">
									<h3 class="text-base font-semibold text-primary leading-8 mb-1">{passo.titolo}</h3>
									{#if passo.ente}
										<p class="text-sm text-muted mb-1">{passo.ente}</p>
									{/if}
									<p class="text-sm text-primary/80 leading-relaxed">{passo.descrizione}</p>
									{#if passo.tempiStimati}
										<p class="text-xs text-muted mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border">
											{passo.tempiStimati}
										</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>

					<!-- Note importanti -->
					{#if data.dettaglio.iter_sanitario.note_importanti.length > 0}
						<div class="mt-8 p-5 rounded-xl border border-border bg-surface">
							<p class="text-sm font-semibold text-primary mb-2">Note importanti</p>
							<ul class="space-y-1.5">
								{#each data.dettaglio.iter_sanitario.note_importanti as nota}
									<li class="text-sm text-primary/80 leading-relaxed flex gap-2">
										<span class="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-muted"></span>
										{nota}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</section>

				<!-- 6. Storia queer -->
				<section class="mb-12 sm:mb-16">
					<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-4">
						Storia queer a {data.comune.nome}
					</h2>
					<p class="text-base text-primary/80 leading-relaxed mb-8 max-w-3xl">
						{data.dettaglio.storia_queer.intro}
					</p>

					<!-- Timeline storia -->
					<div class="space-y-0">
						{#each data.dettaglio.storia_queer.eventi as evento, i}
							<div class="flex gap-4 sm:gap-5">
								<div class="flex flex-col items-center shrink-0">
									<div class="w-14 sm:w-16 h-8 rounded-full border border-border flex items-center justify-center shrink-0">
										<span class="text-xs font-semibold text-primary">{evento.anno}</span>
									</div>
									{#if i < data.dettaglio.storia_queer.eventi.length - 1}
										<div class="w-px flex-1 bg-border mt-2"></div>
									{/if}
								</div>
								<div class="pb-8 {i === data.dettaglio.storia_queer.eventi.length - 1 ? 'pb-0' : ''}">
									<h3 class="text-base font-semibold text-primary leading-8 mb-1">{evento.titolo}</h3>
									<p class="text-sm text-primary/80 leading-relaxed">{evento.descrizione}</p>
								</div>
							</div>
						{/each}
					</div>
				</section>

				<!-- 7. FAQ -->
				{#if data.dettaglio.faq.length > 0}
					<section class="mb-12 sm:mb-16">
						<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-6">
							Domande frequenti
						</h2>
						<div class="space-y-2">
							{#each data.dettaglio.faq as faq, i}
								<div class="border border-border rounded-xl">
									<button
										class="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
										onclick={() => (openFaq = openFaq === i ? -1 : i)}
									>
										<span class="text-sm sm:text-base font-medium text-primary">{faq.domanda}</span>
										<span class="shrink-0 text-muted text-sm transition-transform {openFaq === i ? 'rotate-180' : ''}"
											>&#9660;</span
										>
									</button>
									{#if openFaq === i}
										<div class="px-5 pb-4">
											<p class="text-sm text-primary/80 leading-relaxed">{faq.risposta}</p>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</section>
				{/if}

				<!-- 8. Articoli correlati -->
				{#if data.articles.length > 0}
					<section class="mb-12 sm:mb-16">
						<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-6">
							Articoli correlati
						</h2>
						<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
							{#each data.articles as article}
								<ArticleCard {article} />
							{/each}
						</div>
					</section>
				{/if}

				<!-- 9. Altre città -->
				{#if data.altreCitta.length > 0}
					<section class="mb-12 sm:mb-16">
						<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-4">
							Altre città con guide dettagliate
						</h2>
						<div class="flex flex-wrap gap-2">
							{#each data.altreCitta as citta}
								<a
									href="/citta/{citta.slug}"
									class="text-sm px-4 py-2 rounded-full border border-border text-muted hover:text-primary hover:border-primary transition"
								>
									{citta.nome}
								</a>
							{/each}
						</div>
					</section>
				{/if}

				<!-- 10. CTA Newsletter -->
				<section class="pt-8 border-t border-border">
					<div class="text-center flex flex-col items-center py-8">
						<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Resta aggiornato</h2>
						<p class="text-muted mb-6 max-w-lg">
							Nuovi articoli e risorse sulle tematiche trans. Niente spam, solo contenuti utili.
						</p>
						<a href="/newsletter" class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition">
							Iscriviti alla newsletter &rarr;
						</a>
					</div>
				</section>
			</article>
		</div>
	</div>
{:else}
	<!-- ============================================ -->
	<!-- TEMPLATE GENERICO — Città senza dati ricchi -->
	<!-- ============================================ -->

	<!-- Hero -->
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
			<h1 class="text-2xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-4 sm:mb-6 max-w-3xl">
				Informazione sulle tematiche trans per {data.comune.nome}
			</h1>
			<p class="text-base sm:text-lg text-primary/80 mb-3 max-w-2xl leading-relaxed">
				Articoli basati su ricerca scientifica, risorse e supporto per le persone trans e le loro famiglie in {data.comune.regione}.
			</p>
			<p class="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
				Ogni affermazione è accompagnata dalle fonti. Non chiediamo di crederci: chiediamo di leggere.
			</p>
			<p class="text-sm text-muted mt-6 px-4 py-2 rounded-full border border-border">
				Guida dettagliata per {data.comune.nome} in arrivo
			</p>
		</div>
	</section>

	<!-- Articoli in evidenza -->
	{#if data.articles.length > 0}
		<section>
			<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
				<div class="flex items-center justify-between mb-4 sm:mb-6">
					<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary">Articoli in evidenza</h2>
					<a href="/wiki" class="text-sm text-muted hover:text-primary transition">Tutti gli articoli &rarr;</a>
				</div>
				<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
					{#each data.articles as article}
						<ArticleCard {article} />
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Quiz CTA -->
	{#if data.featuredQuiz}
		<section>
			<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
				<div class="p-6 sm:p-8 rounded-xl border border-border">
					<p class="text-sm text-muted uppercase tracking-wide mb-2">Mettiti alla prova</p>
					<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Quanto ne sai di identità di genere?</h2>
					<p class="text-muted text-sm mb-6 max-w-lg">
						{data.featuredQuiz.questions.length} domande basate sulla ricerca scientifica. Scopri cosa sai e cosa credevi di sapere.
					</p>
					<a
						href="/quiz/{data.featuredQuiz.slug}"
						class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition"
					>
						Inizia il quiz &rarr;
					</a>
				</div>
			</div>
		</section>
	{/if}

	<!-- CTA Newsletter -->
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-14 sm:py-20 text-center flex flex-col items-center">
			<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Resta aggiornato</h2>
			<p class="text-muted mb-6 max-w-lg">
				Nuovi articoli e risorse sulle tematiche trans. Niente spam, solo contenuti utili.
			</p>
			<a href="/newsletter" class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition">
				Iscriviti alla newsletter &rarr;
			</a>
		</div>
	</section>
{/if}
