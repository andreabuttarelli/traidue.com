<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
</script>

<SEO
	title="Termini di Utilizzo"
	description="Termini e condizioni di utilizzo del sito Tra i Due: licenza dei contenuti, limitazioni di responsabilità e contributi."
	url="https://www.traidue.com/termini"
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Termini di Utilizzo' }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">Termini di Utilizzo</h1>
		<p class="text-sm text-muted">Ultimo aggiornamento: 21 febbraio 2026</p>
	</header>

	<div class="max-w-prose space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Accettazione dei termini</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Accedendo e utilizzando il sito <strong>traidue.com</strong> accetti i presenti termini di
					utilizzo. Se non sei d'accordo con uno qualsiasi di questi termini, ti invitiamo a non
					utilizzare il sito.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Natura del servizio</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Tra i Due è un progetto informativo e divulgativo sulle tematiche trans. I contenuti
					pubblicati hanno <strong>finalità esclusivamente informativa</strong> e non costituiscono
					in alcun modo:
				</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>Consulenza medica, psicologica o psichiatrica</li>
					<li>Consulenza legale</li>
					<li>Diagnosi o indicazioni terapeutiche</li>
				</ul>
				<p>
					Per qualsiasi decisione relativa alla salute o a percorsi legali, rivolgiti sempre a
					professionisti qualificati. I contenuti di Tra i Due possono aiutarti a informarti,
					ma non sostituiscono il parere di un esperto.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Assistente AI ("Chiedi al Wiki")</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Il sito mette a disposizione un assistente basato su intelligenza artificiale (Google Gemini)
					che risponde a domande relative ai contenuti del wiki. Utilizzando questo servizio, accetti
					quanto segue:
				</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>L'assistente genera risposte basandosi <strong>esclusivamente sui contenuti pubblicati nel wiki</strong>
						di Tra i Due. Le risposte sono generate automaticamente e potrebbero contenere imprecisioni.</li>
					<li>Le risposte dell'assistente <strong>non costituiscono consulenza</strong> medica, psicologica
						o legale. Verifica sempre le informazioni con le fonti citate e rivolgiti a professionisti qualificati.</li>
					<li>Le conversazioni <strong>non vengono salvate</strong> né memorizzate. Ogni sessione è indipendente
						e i messaggi vengono eliminati alla chiusura della pagina.</li>
					<li>I messaggi inviati all'assistente vengono trasmessi ai server di Google (Gemini API) per
						la generazione delle risposte. Non includere dati personali sensibili nei messaggi.</li>
					<li>Il servizio è soggetto a <strong>limiti di utilizzo</strong> per garantire la disponibilità
						a tutti gli utenti. L'uso automatizzato, lo spam o qualsiasi tentativo di abuso del servizio
						è vietato e comporterà il blocco temporaneo dell'accesso.</li>
				</ul>
				<p>
					Ci riserviamo il diritto di sospendere, modificare o rimuovere l'assistente AI in qualsiasi
					momento senza preavviso.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Licenza dei contenuti</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Tra i Due è un progetto <strong>open source</strong>. Il codice sorgente e i contenuti
					sono rilasciati sotto
					<a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Licenza Apache 2.0</a>,
					salvo diversa indicazione.
				</p>
				<p>Questo significa che puoi:</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li><strong>Utilizzare</strong> i contenuti per qualsiasi scopo</li>
					<li><strong>Copiare e distribuire</strong> i contenuti</li>
					<li><strong>Modificare</strong> i contenuti e crearne opere derivate</li>
				</ul>
				<p>A condizione di:</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>Includere l'attribuzione originale a Tra i Due</li>
					<li>Indicare le eventuali modifiche apportate</li>
					<li>Includere una copia della licenza</li>
				</ul>
				<p>
					Il repository del progetto è disponibile su
					<a href="https://github.com/andreabuttarelli/traidue.com" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">GitHub</a>.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Accuratezza dei contenuti</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Ci impegniamo a fornire informazioni accurate e aggiornate, basate su fonti scientifiche
					peer-reviewed e documenti istituzionali. Tuttavia:
				</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>La ricerca scientifica è in continua evoluzione e alcune informazioni potrebbero non
						riflettere gli sviluppi più recenti.</li>
					<li>Nonostante il nostro impegno nel verificare le fonti, non possiamo garantire l'assenza
						di errori.</li>
					<li>Le fonti citate sono sempre indicate per consentire una verifica indipendente.</li>
				</ul>
				<p>
					Se riscontri un errore o un'informazione non aggiornata, segnalacelo a
					<a href="mailto:info@traidue.com" class="text-primary underline hover:no-underline">info@traidue.com</a>
					o apri una issue su
					<a href="https://github.com/andreabuttarelli/traidue.com/issues" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">GitHub</a>.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Contributi</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Essendo un progetto open source, accogliamo contributi dalla comunità. Contribuendo al
					progetto (tramite pull request, issue o altri canali), accetti che il tuo contributo sia
					rilasciato sotto la stessa licenza Apache 2.0 del progetto.
				</p>
				<p>
					Ci riserviamo il diritto di accettare, rifiutare o modificare qualsiasi contributo per
					garantire la coerenza con la missione e gli standard qualitativi del progetto.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Limitazione di responsabilità</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Tra i Due è fornito <strong>"così com'è"</strong>, senza garanzie di alcun tipo, esplicite
					o implicite. In nessun caso i responsabili del progetto potranno essere ritenuti
					responsabili per danni diretti, indiretti, incidentali o consequenziali derivanti
					dall'utilizzo o dall'impossibilità di utilizzo del sito o dei suoi contenuti.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Legge applicabile</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà
					competente il foro del luogo di residenza del consumatore, ai sensi dell'art. 66-bis del
					Codice del Consumo.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Modifiche</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Ci riserviamo il diritto di aggiornare i presenti termini. La data dell'ultimo
					aggiornamento è indicata in cima alla pagina. Le modifiche sono tracciabili nel
					<a href="https://github.com/andreabuttarelli/traidue.com" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">repository GitHub</a>
					del progetto.
				</p>
			</div>
		</section>
	</div>
</div>
