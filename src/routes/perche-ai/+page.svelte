<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';

	const pageSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Perché usiamo l\'AI',
		url: 'https://www.traidue.com/perche-ai',
		description: 'Come e perché Tra i Due utilizza l\'intelligenza artificiale per creare contenuti verificati e accessibili sulle tematiche trans.',
		isPartOf: {
			'@type': 'WebSite',
			name: 'Tra i Due',
			url: 'https://www.traidue.com'
		}
	};
</script>

<SEO
	title="Perché usiamo l'AI"
	description="Come e perché Tra i Due utilizza l'intelligenza artificiale per creare contenuti verificati e accessibili sulle tematiche trans."
	url="https://www.traidue.com/perche-ai"
/>

<StructuredData schema={pageSchema} />

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Perché usiamo l\'AI' }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">Perché usiamo l'AI</h1>
		<p class="text-lg text-muted leading-relaxed max-w-xl">
			L'intelligenza artificiale è uno strumento. Come ogni strumento, il suo valore dipende da come viene utilizzato.
			Qui spieghiamo come lo usiamo noi, e perché.
		</p>
	</header>

	<div class="max-w-prose space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Come usiamo l'AI</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Utilizziamo modelli di linguaggio per generare <strong>bozze iniziali</strong> degli articoli wiki.
					Ogni bozza viene poi verificata, corretta e integrata con fonti accademiche e istituzionali.
				</p>
				<p>
					Ogni articolo contiene in media <strong>8-15 fonti citate</strong>, con riferimenti inline cliccabili
					che rimandano direttamente alla fonte originale. Il badge "Generato con AI" è sempre visibile
					nell'intestazione di ogni articolo, perché la trasparenza viene prima di tutto.
				</p>
				<p>
					L'AI non sostituisce la verifica: la <strong>accelera</strong>. Ci permette di coprire più argomenti,
					in meno tempo, mantenendo lo stesso rigore che avrebbe un articolo scritto interamente a mano.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">"L'AI non è affidabile"</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					I modelli di linguaggio possono generare informazioni errate. Questo è un fatto documentato,
					e lo prendiamo sul serio. Per questo motivo, <strong>nessun contenuto viene pubblicato senza verifica umana</strong>.
				</p>
				<p>
					Ogni affermazione rilevante nei nostri articoli è supportata da una fonte esterna: studi peer-reviewed,
					linee guida di organizzazioni come l'OMS, il WPATH o l'APA, e dati istituzionali.
					Le citazioni sono numerate nel testo e cliccabili, così chiunque può verificare in autonomia.
				</p>
				<p>
					Il problema non è lo strumento, ma <strong>come viene usato</strong>. Un articolo generato con AI e verificato
					con 12 fonti accademiche è più affidabile di un articolo scritto a mano senza alcuna citazione.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">"L'AI inquina"</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					L'addestramento dei grandi modelli di linguaggio richiede energia significativa. Tuttavia, è importante
					contestualizzare questi dati.
				</p>
				<p>
					Secondo l'Agenzia Internazionale dell'Energia (IEA), i data center rappresentano circa
					l'<strong>1-1,5% del consumo elettrico globale</strong>, una quota che include tutti i servizi cloud,
					lo streaming video, i social media e l'AI. Una singola query a un modello di linguaggio consuma
					circa <strong>10 volte l'energia di una ricerca Google</strong>, ma resta nell'ordine di pochi wattora,
					paragonabile a tenere accesa una lampadina per qualche minuto.
				</p>
				<p>
					Il nostro utilizzo dell'AI è limitato alla <strong>generazione di bozze testuali</strong>, un'operazione
					a basso consumo rispetto all'addestramento di nuovi modelli. Non addestriamo modelli: usiamo modelli esistenti.
				</p>
				<p>
					Riteniamo che il costo ambientale di queste operazioni sia ampiamente giustificato dal valore
					del risultato: informazione accessibile, verificata e gratuita su tematiche spesso trascurate
					o trattate con superficialità.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">"L'AI ruba il lavoro ai giornalisti"</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Tra i Due è un progetto <strong>open source e non-profit</strong>. Non esistiamo al posto di una
					redazione giornalistica: esistiamo perché nessuna redazione copre sistematicamente questi argomenti
					in italiano con il livello di approfondimento che offriamo.
				</p>
				<p>
					L'AI ci permette di creare una <strong>risorsa che altrimenti non esisterebbe</strong>. Senza di essa,
					il costo in termini di tempo per produrre oltre 20 articoli approfonditi, un glossario, quiz interattivi
					e un sistema di citazioni inline sarebbe proibitivo per un progetto volontario.
				</p>
				<p>
					Non abbiamo sostituito nessuno. Abbiamo creato qualcosa di nuovo.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">"L'AI ha bias e pregiudizi"</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					I modelli di linguaggio riflettono i dati su cui sono stati addestrati, che possono contenere
					pregiudizi culturali, di genere o di altro tipo. Questo è un rischio reale, e lo affrontiamo
					con misure concrete.
				</p>
				<ul class="list-disc list-inside space-y-2 pl-2 text-text">
					<li>
						Ogni contenuto viene <strong>revisionato da persone</strong> prima della pubblicazione.
					</li>
					<li>
						Le affermazioni sono verificate con <strong>fonti esterne</strong> indipendenti dal modello.
					</li>
					<li>
						Il codice e i contenuti sono <strong>open source</strong>: chiunque può segnalare errori,
						bias o imprecisioni tramite GitHub.
					</li>
					<li>
						Aggiorniamo regolarmente gli articoli per riflettere le <strong>evidenze scientifiche più recenti</strong>.
					</li>
				</ul>
				<p>
					Il bias non è un problema esclusivo dell'AI. Anche gli autori umani hanno bias.
					La differenza sta nella trasparenza del processo e nella volontà di correggersi.
				</p>
			</div>
		</section>

		<section class="border-t border-border pt-10 sm:pt-16">
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Il nostro impegno</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Ci impegniamo a utilizzare l'AI in modo responsabile, trasparente e al servizio
					dell'informazione. In concreto:
				</p>
				<ul class="list-disc list-inside space-y-2 pl-2 text-text">
					<li>
						<strong>Trasparenza</strong>: ogni articolo mostra il badge "Generato con AI" e include
						citazioni inline verificabili.
					</li>
					<li>
						<strong>Open source</strong>: il codice, gli articoli e i dati sono pubblici su
						<a href="https://github.com/andreabuttarelli/traidue.com" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">GitHub</a>.
					</li>
					<li>
						<strong>Verifica continua</strong>: aggiorniamo i contenuti quando emergono nuove evidenze
						o ci vengono segnalati errori.
					</li>
					<li>
						<strong>Accessibilità</strong>: tutto è gratuito, senza paywall, senza pubblicità.
					</li>
				</ul>
				<p>
					Se hai domande, suggerimenti o vuoi segnalare un'imprecisione, scrivici a
					<a href="mailto:info@traidue.com" class="text-primary underline hover:no-underline">info@traidue.com</a>.
				</p>
			</div>
		</section>
	</div>
</div>
