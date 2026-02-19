<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';

	const terms = [
		{
			term: 'Identità di genere',
			definition: 'Il senso intimo e profondo che ogni persona ha del proprio genere. Può corrispondere o meno al sesso assegnato alla nascita. Si consolida tipicamente tra i 3 e i 5 anni di età.',
			link: '/wiki/identita-di-genere'
		},
		{
			term: 'Cisgender',
			definition: 'Persona la cui identità di genere corrisponde al sesso assegnato alla nascita. Il prefisso "cis-" deriva dal latino e significa "dalla stessa parte".',
			link: '/wiki/identita-di-genere'
		},
		{
			term: 'Coming out',
			definition: 'Il processo attraverso cui una persona comunica ad altri la propria identità di genere o il proprio orientamento sessuale. Per le persone trans, è spesso un processo continuo e selettivo.',
			link: '/wiki/coming-out-trans'
		},
		{
			term: 'Disforia di genere',
			definition: 'Disagio clinicamente significativo causato dall\'incongruenza tra il genere esperito e il sesso assegnato alla nascita. Definita nel DSM-5 come diagnosi; l\'ICD-11 usa invece il termine "incongruenza di genere" e l\'ha rimossa dai disturbi mentali.',
			link: '/wiki/identita-di-genere'
		},
		{
			term: 'Espressione di genere',
			definition: 'Il modo in cui una persona comunica il proprio genere attraverso abbigliamento, comportamento, voce e aspetto. Può non corrispondere alle aspettative sociali associate al genere della persona.',
			link: '/wiki/identita-di-genere'
		},
		{
			term: 'GnRH agonisti (bloccanti della pubertà)',
			definition: 'Farmaci che sospendono temporaneamente lo sviluppo puberale. Utilizzati da oltre 40 anni in endocrinologia pediatrica, sono considerati reversibili: alla sospensione, la pubertà riprende normalmente.',
			link: '/wiki/transizione-medica-cosa-cambia'
		},
		{
			term: 'Incongruenza di genere',
			definition: 'Termine adottato dall\'ICD-11 (OMS, 2019) per descrivere l\'incongruenza marcata e persistente tra il genere esperito e il sesso assegnato. Non è classificata come disturbo mentale.',
			link: '/wiki/identita-di-genere'
		},
		{
			term: 'Intersex',
			definition: 'Persona che presenta variazioni naturali nelle caratteristiche sessuali biologiche (cromosomi, ormoni, anatomia) che non rientrano nelle categorie tipiche di maschio o femmina. Riguarda circa l\'1,7% della popolazione.',
			link: '/wiki/sesso-biologico-oltre-il-binarismo'
		},
		{
			term: 'Legge 164/1982',
			definition: 'Legge italiana che consente la rettificazione anagrafica del sesso. L\'Italia è stato uno dei primi paesi europei ad adottarla. La Corte Costituzionale ha poi stabilito che l\'intervento chirurgico non è obbligatorio.',
			link: '/wiki/legge-164-italia'
		},
		{
			term: 'Misgendering',
			definition: 'L\'uso intenzionale o meno di pronomi, nomi o termini di genere che non corrispondono all\'identità di genere di una persona. La ricerca associa il misgendering sistematico a effetti negativi sulla salute mentale.',
			link: '/wiki/miti-comuni-persone-trans'
		},
		{
			term: 'Non binario',
			definition: 'Termine ombrello per identità di genere che non si collocano esclusivamente nella categoria di uomo o donna. Include identità come genderfluid, agender, bigender e altre.',
			link: '/wiki/identita-di-genere'
		},
		{
			term: 'Orientamento sessuale',
			definition: 'L\'attrazione emotiva, romantica o sessuale verso altre persone. È una dimensione completamente distinta dall\'identità di genere: riguarda verso chi si è attratti, non chi si è.',
			link: '/wiki/identita-di-genere'
		},
		{
			term: 'Passing',
			definition: 'La capacità di una persona trans di essere percepita come appartenente al genere con cui si identifica. Non tutte le persone trans desiderano o cercano il passing, e non è un indicatore di validità dell\'identità.',
			link: null
		},
		{
			term: 'Sesso biologico',
			definition: 'Insieme di caratteristiche fisiche (cromosomi, ormoni, anatomia riproduttiva) valutate alla nascita. Non è sempre riducibile a una classificazione binaria, come dimostrano le variazioni intersex.',
			link: '/wiki/sesso-biologico-oltre-il-binarismo'
		},
		{
			term: 'Terapia ormonale sostitutiva (TOS)',
			definition: 'Trattamento medico che prevede la somministrazione di estrogeni o testosterone per sviluppare le caratteristiche sessuali secondarie coerenti con l\'identità di genere della persona.',
			link: '/wiki/transizione-medica-cosa-cambia'
		},
		{
			term: 'Transgender (trans)',
			definition: 'Persona la cui identità di genere non corrisponde al sesso assegnato alla nascita. È un aggettivo, non un sostantivo: si dice "persona trans", non "un trans".',
			link: '/wiki/identita-di-genere'
		},
		{
			term: 'Transizione',
			definition: 'Il processo attraverso cui una persona allinea la propria vita alla propria identità di genere. Può essere sociale (nome, pronomi, espressione), medica (ormoni, chirurgia) o legale (documenti). Non tutte le persone trans intraprendono tutti questi percorsi.',
			link: '/wiki/transizione-medica-cosa-cambia'
		},
		{
			term: 'Transizione sociale',
			definition: 'Il processo di vivere secondo la propria identità di genere nella vita quotidiana: adottare un nuovo nome, pronomi e espressione di genere. Non comporta alcun intervento medico.',
			link: '/wiki/esplorare-identita-di-genere'
		}
	];

	const definedTermsSchema = {
		'@context': 'https://schema.org',
		'@type': 'DefinedTermSet',
		name: 'Glossario sulle tematiche trans',
		description: 'Definizioni dei termini principali relativi a identità di genere, transizione e diritti delle persone trans.',
		inLanguage: 'it',
		hasDefinedTerm: terms.map((t) => ({
			'@type': 'DefinedTerm',
			name: t.term,
			description: t.definition
		}))
	};
</script>

<SEO
	title="Glossario"
	description="Significato dei termini principali sulle tematiche trans: identità di genere, disforia, transizione, non binario e altri. Definizioni chiare basate sulle fonti scientifiche."
	url="https://www.traidue.com/glossario"
/>

<StructuredData schema={definedTermsSchema} />

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Glossario' }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">Glossario</h1>
		<p class="text-muted leading-relaxed max-w-xl">
			Le parole contano. Ecco i termini principali, definiti a partire dalle fonti scientifiche.
		</p>
	</header>

	<div class="max-w-prose">
		<dl class="space-y-8">
			{#each terms as { term, definition, link }}
				<div id={term.toLowerCase().replace(/[^a-zà-ú0-9]+/g, '-').replace(/-+$/, '')}>
					<dt class="text-lg font-heading font-semibold text-primary mb-1.5">
						{term}
					</dt>
					<dd class="text-text leading-relaxed">
						{definition}
						{#if link}
							<a href={link} class="text-primary text-sm ml-1 hover:underline transition">Approfondisci &rarr;</a>
						{/if}
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</div>
