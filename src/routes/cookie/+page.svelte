<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
</script>

<SEO
	title="Cookie Policy"
	description="Informativa sull'uso dei cookie su Tra i Due: quali cookie utilizziamo, perché e come gestire le tue preferenze."
	url="https://www.traidue.com/cookie"
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">Cookie Policy</h1>
		<p class="text-sm text-muted">Ultimo aggiornamento: 21 febbraio 2026</p>
	</header>

	<div class="max-w-prose space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Cosa sono i cookie</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo durante
					la navigazione. Vengono utilizzati per far funzionare il sito, migliorare l'esperienza
					di navigazione e raccogliere informazioni aggregate sull'utilizzo.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Cookie tecnici</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Questi cookie sono strettamente necessari al funzionamento del sito e non richiedono
					il tuo consenso ai sensi dell'art. 122 del Codice Privacy.
				</p>
				<div class="overflow-x-auto">
					<table class="w-full text-sm border border-border">
						<thead>
							<tr class="bg-card">
								<th class="text-left p-3 border-b border-border font-semibold">Nome</th>
								<th class="text-left p-3 border-b border-border font-semibold">Finalità</th>
								<th class="text-left p-3 border-b border-border font-semibold">Durata</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="p-3 border-b border-border font-mono text-xs">theme</td>
								<td class="p-3 border-b border-border">Memorizza la preferenza tema chiaro/scuro</td>
								<td class="p-3 border-b border-border">Permanente</td>
							</tr>
							<tr>
								<td class="p-3 border-b border-border font-mono text-xs">traidue-cookie-consent</td>
								<td class="p-3 border-b border-border">Memorizza la tua scelta sui cookie</td>
								<td class="p-3 border-b border-border">Permanente</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Cookie analitici</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Questi cookie vengono attivati <strong>solo dopo il tuo consenso esplicito</strong> tramite
					il banner mostrato alla prima visita. Servono a raccogliere dati anonimi e aggregati su come
					viene utilizzato il sito (pagine visitate, durata delle sessioni, dispositivo utilizzato),
					per aiutarci a migliorare i contenuti e l'esperienza di navigazione.
				</p>
				<p>Utilizziamo i seguenti servizi di analisi:</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>
						<strong>Google Analytics / Firebase</strong> (Google LLC) &mdash; raccoglie statistiche
						di utilizzo in forma aggregata e anonimizzata.
						<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Privacy Policy di Google</a>.
					</li>
					<li>
						<strong>Datafast</strong> &mdash; analytics leggero e rispettoso della privacy.
						<a href="https://datafa.st/privacy" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Privacy Policy di Datafast</a>.
					</li>
				</ul>
				<p>
					Nessun dato viene utilizzato per profilazione pubblicitaria o condiviso con terze parti
					per finalità di marketing.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Gestire le tue preferenze</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Puoi modificare la tua scelta sui cookie in qualsiasi momento:
				</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>Cancellando i dati del sito dal browser (il banner verrà mostrato nuovamente)</li>
					<li>Utilizzando le impostazioni del tuo browser per bloccare o eliminare i cookie</li>
				</ul>
				<p>
					La disattivazione dei cookie analitici non influisce sulla navigazione del sito.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">Maggiori informazioni</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					Per informazioni complete sul trattamento dei dati personali, consulta la nostra
					<a href="/privacy" class="text-primary underline hover:no-underline">Privacy Policy</a>.
				</p>
				<p>
					Per qualsiasi domanda:
					<a href="mailto:info@traidue.com" class="text-primary underline hover:no-underline">info@traidue.com</a>
				</p>
			</div>
		</section>
	</div>
</div>
