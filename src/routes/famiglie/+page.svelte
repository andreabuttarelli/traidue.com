<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import ArticleCard from '$lib/components/wiki/ArticleCard.svelte';

	let { data } = $props();

	const pageSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Risorse per famiglie di persone trans',
		description:
			'Guida per genitori e famiglie di persone trans: come supportare tuo figlio, cosa dice la scienza, risposte alle domande più comuni.',
		url: 'https://www.traidue.com/famiglie',
		inLanguage: 'it',
		isPartOf: {
			'@type': 'WebSite',
			name: 'Tra i Due',
			url: 'https://www.traidue.com'
		}
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'Come faccio a sapere se mio figlio è trans?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Non esiste un test definitivo. L'identità di genere è un'esperienza personale. Il modo migliore è ascoltare, creare uno spazio sicuro e, se necessario, rivolgersi a un professionista specializzato."
				}
			},
			{
				'@type': 'Question',
				name: 'È solo una fase?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "La ricerca mostra che l'identità di genere si consolida tra i 3 e i 5 anni. Gli adolescenti che esprimono un'identità trans in modo persistente e coerente raramente cambiano idea. Il supporto familiare è il fattore più importante per il loro benessere."
				}
			},
			{
				'@type': 'Question',
				name: 'Cosa posso fare come genitore?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Ascoltare senza giudicare, usare il nome e i pronomi richiesti, informarsi da fonti scientifiche e cercare il supporto di professionisti esperti. Il sostegno familiare riduce drasticamente il rischio di depressione e ansia."
				}
			},
			{
				'@type': 'Question',
				name: 'Mio figlio dovrà per forza fare interventi medici?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "No. La transizione è un percorso personale e non prevede necessariamente interventi medici o chirurgici. Ogni persona sceglie il proprio percorso. Per i minori, nessun protocollo prevede interventi irreversibili."
				}
			},
			{
				'@type': 'Question',
				name: 'Come devo comportarmi con il nome e i pronomi?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Usare il nome e i pronomi scelti da tuo figlio è uno dei gesti più importanti che puoi fare. La ricerca dimostra che il rispetto dell'identità riduce significativamente ansia e depressione. Se sbagli, correggiti senza drammatizzare e vai avanti."
				}
			},
			{
				'@type': 'Question',
				name: 'Devo dirlo alla scuola?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "La decisione spetta a tuo figlio. Molte scuole italiane hanno protocolli per l'uso del nome alias. Parlane insieme e, se decidete di procedere, chiedete un incontro con il dirigente scolastico. La legge italiana tutela la privacy dell'identità di genere."
				}
			},
			{
				'@type': 'Question',
				name: 'È colpa mia se mio figlio è trans?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "No. L'identità di genere non è causata dall'educazione, dall'ambiente familiare o da esperienze traumatiche. La ricerca scientifica indica una forte componente biologica, con fattori genetici e ormonali prenatali. Non è colpa di nessuno: è semplicemente parte di chi è tuo figlio."
				}
			},
			{
				'@type': 'Question',
				name: 'A chi posso rivolgermi per un supporto professionale?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Cerca psicologi o psicoterapeuti con esperienza in identità di genere. In Italia esistono centri specializzati in diverse regioni (ONIG, consultori pubblici, centri universitari). Anche le associazioni di genitori di persone trans possono offrire supporto tra pari e orientamento."
				}
			},
			{
				'@type': 'Question',
				name: 'E se poi cambia idea?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Il tasso di detransizione è inferiore al 2-3% secondo le meta-analisi più recenti, e nella maggior parte dei casi è dovuto a pressioni sociali, non a un cambiamento dell'identità. I percorsi per minori sono graduali e reversibili: si parte dall'ascolto e dal supporto psicologico, senza fretta."
				}
			}
		]
	};
</script>

<SEO
	title="Risorse per famiglie di persone trans | Tra i Due"
	description="Tuo figlio ti ha detto di essere trans? Guida basata sulla scienza per genitori e famiglie: come supportare, cosa aspettarsi, risposte alle domande più comuni."
	url="https://www.traidue.com/famiglie"
/>

<StructuredData schema={pageSchema} />
<StructuredData schema={faqSchema} />

<!-- Hero -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32 text-center flex flex-col items-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-primary mb-4 sm:mb-6 max-w-3xl">
			Tuo figlio ti ha detto di essere trans? Sei nel posto giusto.
		</h1>
		<p class="text-base sm:text-lg text-primary/80 mb-3 max-w-2xl leading-relaxed">
			È normale avere domande, dubbi, paura. Quello che conta è informarsi.
		</p>
		<p class="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
			Abbiamo raccolto le risorse scientifiche più importanti per aiutarti a capire, supportare e accompagnare tuo figlio nel suo percorso.
		</p>
	</div>
</section>

<!-- Primi passi -->
{#if data.primiPassi.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">Da dove partire</h2>
			<p class="text-muted text-sm mb-6 sm:mb-8">Le risorse essenziali per chi si trova ad affrontare questa situazione per la prima volta.</p>
			<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
				{#each data.primiPassi as article}
					<ArticleCard {article} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- FAQ -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">Domande frequenti</h2>
		<p class="text-muted text-sm mb-6 sm:mb-8">Le domande che si fanno tutti i genitori. Risposte basate sulla ricerca scientifica.</p>
		<div class="grid sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-8">
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">Come faccio a sapere se mio figlio è trans?</h3>
				<p class="text-muted text-sm leading-relaxed">
					Non esiste un test definitivo. L'identità di genere è un'esperienza personale. Il modo migliore è ascoltare, creare uno spazio sicuro e, se necessario, rivolgersi a un professionista specializzato.
				</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">È solo una fase?</h3>
				<p class="text-muted text-sm leading-relaxed">
					La ricerca mostra che l'identità di genere si consolida tra i 3 e i 5 anni. Gli adolescenti che esprimono un'identità trans in modo persistente e coerente raramente cambiano idea. Il supporto familiare è il fattore più importante per il loro benessere.
				</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">Cosa posso fare come genitore?</h3>
				<p class="text-muted text-sm leading-relaxed">
					Ascoltare senza giudicare, usare il nome e i pronomi richiesti, informarsi da fonti scientifiche e cercare il supporto di professionisti esperti. Il sostegno familiare riduce drasticamente il rischio di depressione e ansia.
				</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">Mio figlio dovrà per forza fare interventi medici?</h3>
				<p class="text-muted text-sm leading-relaxed">
					No. La transizione è un percorso personale e non prevede necessariamente interventi medici o chirurgici. Ogni persona sceglie il proprio percorso. Per i minori, nessun protocollo prevede interventi irreversibili.
				</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">Come devo comportarmi con il nome e i pronomi?</h3>
				<p class="text-muted text-sm leading-relaxed">
					Usare il nome e i pronomi scelti da tuo figlio è uno dei gesti più importanti che puoi fare. La ricerca dimostra che il rispetto dell'identità riduce significativamente ansia e depressione. Se sbagli, correggiti senza drammatizzare e vai avanti.
				</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">Devo dirlo alla scuola?</h3>
				<p class="text-muted text-sm leading-relaxed">
					La decisione spetta a tuo figlio. Molte scuole italiane hanno protocolli per l'uso del nome alias. Parlane insieme e, se decidete di procedere, chiedete un incontro con il dirigente scolastico. La legge italiana tutela la privacy dell'identità di genere.
				</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">È colpa mia se mio figlio è trans?</h3>
				<p class="text-muted text-sm leading-relaxed">
					No. L'identità di genere non è causata dall'educazione, dall'ambiente familiare o da esperienze traumatiche. La ricerca scientifica indica una forte componente biologica, con fattori genetici e ormonali prenatali. Non è colpa di nessuno: è semplicemente parte di chi è tuo figlio.
				</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">A chi posso rivolgermi per un supporto professionale?</h3>
				<p class="text-muted text-sm leading-relaxed">
					Cerca psicologi o psicoterapeuti con esperienza in identità di genere. In Italia esistono centri specializzati in diverse regioni (ONIG, consultori pubblici, centri universitari). Anche le associazioni di genitori di persone trans possono offrire supporto tra pari e orientamento.
				</p>
			</div>
			<div>
				<h3 class="text-primary font-medium text-sm sm:text-base mb-1.5">E se poi cambia idea?</h3>
				<p class="text-muted text-sm leading-relaxed">
					Il tasso di detransizione è inferiore al 2-3% secondo le meta-analisi più recenti, e nella maggior parte dei casi è dovuto a pressioni sociali, non a un cambiamento dell'identità. I percorsi per minori sono graduali e reversibili: si parte dall'ascolto e dal supporto psicologico, senza fretta.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Approfondimenti -->
{#if data.approfondimenti.length > 0}
	<section>
		<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16">
			<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-2">Per approfondire</h2>
			<p class="text-muted text-sm mb-6 sm:mb-8">Cosa dice la scienza: articoli con fonti peer-reviewed su identità, transizione e benessere.</p>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-16">
				{#each data.approfondimenti as article}
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
				<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Quanto ne sai davvero?</h2>
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

<!-- CTA -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-14 sm:py-20 text-center flex flex-col items-center">
		<h2 class="text-xl sm:text-2xl font-heading font-semibold tracking-tight text-primary mb-3">Non sei solo/a</h2>
		<p class="text-muted mb-6 max-w-lg">
			Migliaia di famiglie stanno affrontando lo stesso percorso. Resta aggiornato con le ultime risorse scientifiche.
		</p>
		<a href="/newsletter" class="inline-block px-6 py-2.5 rounded-full bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition">
			Iscriviti alla newsletter &rarr;
		</a>
	</div>
</section>

<!-- Esplora tutto -->
<section>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-16 text-center">
		<p class="text-muted mb-4">Vuoi esplorare tutti gli argomenti?</p>
		<a href="/wiki" class="text-sm text-primary font-medium hover:underline transition">Vai alla Wiki &rarr;</a>
	</div>
</section>
