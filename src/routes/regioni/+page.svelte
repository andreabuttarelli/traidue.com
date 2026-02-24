<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';

	let { data } = $props();

	const rich = $derived(data.regioni.filter((r) => r.isRich));
	const other = $derived(data.regioni.filter((r) => !r.isRich));
</script>

<SEO
	title="Risorse trans per regione"
	description="Centri gender, associazioni, iter sanitario e storia queer in ogni regione italiana. Guide dettagliate per le persone trans e le loro famiglie."
	url="https://www.traidue.com/regioni"
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[
		{ label: 'Home', href: '/' },
		{ label: 'Regioni' }
	]} />

	<header class="mb-10 sm:mb-14 max-w-2xl">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">
			Risorse trans per regione
		</h1>
		<p class="text-base sm:text-lg text-primary/80 leading-relaxed">
			Centri di identita di genere, associazioni, iter sanitario e storia queer regione per regione.
		</p>
	</header>

	<!-- Regioni con guida dettagliata -->
	{#if rich.length > 0}
		<section class="mb-12">
			<h2 class="text-lg sm:text-xl font-heading font-semibold tracking-tight text-primary mb-4">Guide dettagliate</h2>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each rich as regione}
					<a
						href="/regione/{regione.slug}"
						class="group p-5 rounded-xl border border-border hover:border-primary transition"
					>
						<span class="text-base font-semibold text-primary group-hover:underline">{regione.nome}</span>
						<p class="text-sm text-muted mt-1">Centri gender, associazioni, iter sanitario</p>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Tutte le altre regioni -->
	{#if other.length > 0}
		<section>
			<h2 class="text-lg sm:text-xl font-heading font-semibold tracking-tight text-primary mb-4">Altre regioni</h2>
			<p class="text-sm text-muted mb-4">Guide dettagliate in arrivo.</p>
			<div class="flex flex-wrap gap-2">
				{#each other as regione}
					<a
						href="/regione/{regione.slug}"
						class="text-sm px-4 py-2 rounded-full border border-border text-muted hover:text-primary hover:border-primary transition"
					>
						{regione.nome}
					</a>
				{/each}
			</div>
		</section>
	{/if}
</div>
