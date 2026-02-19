<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
</script>

<SEO
	title="Privacy Policy"
	description="Informativa sulla privacy di Tra i Due: quali dati raccogliamo, come li utilizziamo e i tuoi diritti."
	url="https://www.traidue.com/privacy"
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">Privacy Policy</h1>
		<p class="text-sm text-muted">Ultimo aggiornamento: 19 febbraio 2026</p>
	</header>

	<div class="max-w-prose space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Titolare del trattamento</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Il titolare del trattamento dei dati è <strong>Tra i Due</strong>, progetto open source
					raggiungibile all'indirizzo <a href="https://www.traidue.com" class="text-primary underline hover:no-underline">traidue.com</a>.
				</p>
				<p>
					Per qualsiasi richiesta relativa alla privacy:
					<a href="mailto:info@traidue.com" class="text-primary underline hover:no-underline">info@traidue.com</a>
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Dati raccolti</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Tra i Due è un sito informativo che <strong>non richiede registrazione</strong>, non utilizza
					cookie di profilazione e non raccoglie dati personali identificativi.
				</p>
				<p>In particolare:</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li><strong>Nessun account utente</strong> &mdash; non è richiesta alcuna registrazione per accedere ai contenuti.</li>
					<li><strong>Nessun cookie di profilazione</strong> &mdash; non utilizziamo cookie pubblicitari o di tracciamento di terze parti.</li>
					<li><strong>Nessun tracciamento analytics</strong> &mdash; non utilizziamo Google Analytics né strumenti analoghi di tracciamento individuale.</li>
				</ul>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Cookie tecnici</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Il sito può utilizzare esclusivamente <strong>cookie tecnici</strong> strettamente necessari
					al funzionamento (ad esempio per memorizzare la preferenza del tema chiaro/scuro). Questi
					cookie non raccolgono dati personali e non richiedono consenso ai sensi dell'art. 122 del
					Codice Privacy.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Hosting e log del server</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Il sito è ospitato su <strong>Vercel</strong> (Vercel Inc., San Francisco, CA, USA). I server
					di Vercel possono raccogliere automaticamente dati tecnici di navigazione (indirizzo IP,
					tipo di browser, data e ora di accesso) sotto forma di log. Questi dati sono trattati da
					Vercel in conformità alla propria
					<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Privacy Policy</a>.
				</p>
				<p>
					Tra i Due non ha accesso diretto ai log del server e non li utilizza per finalità di
					profilazione o identificazione degli utenti.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Link esterni</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Gli articoli della wiki contengono link a fonti esterne (pubblicazioni scientifiche, siti
					istituzionali, testate giornalistiche). Cliccando su un link esterno, l'utente esce dal
					sito di Tra i Due e accede a siti soggetti alle rispettive politiche sulla privacy, sulle
					quali non abbiamo alcun controllo.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Diritti dell'utente</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Ai sensi del Regolamento UE 2016/679 (GDPR), l'utente ha diritto di:
				</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>Accedere ai propri dati personali</li>
					<li>Richiederne la rettifica o la cancellazione</li>
					<li>Opporsi al trattamento</li>
					<li>Richiedere la portabilità dei dati</li>
					<li>Proporre reclamo all'autorità di controllo (Garante per la Protezione dei Dati Personali)</li>
				</ul>
				<p>
					Poiché Tra i Due non raccoglie dati personali identificativi, nella pratica questi diritti
					si applicano in misura limitata. Per qualsiasi richiesta:
					<a href="mailto:info@traidue.com" class="text-primary underline hover:no-underline">info@traidue.com</a>
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Modifiche</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Questa informativa può essere aggiornata. La data dell'ultimo aggiornamento è indicata in
					cima alla pagina. Le modifiche sono tracciabili nel
					<a href="https://github.com/andreabuttarelli/traidue.com" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">repository GitHub</a>
					del progetto.
				</p>
			</div>
		</section>
	</div>
</div>
