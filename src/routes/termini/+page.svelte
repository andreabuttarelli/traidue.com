<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `https://www.traidue.com${localizeHref('/termini', { locale: l })}`])
	);
</script>

<SEO
	title={m.legal_terms_title()}
	description={m.legal_terms_seo_desc()}
	url="https://www.traidue.com/termini"
	{alternateUrls}
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.legal_terms_title() }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">{m.legal_terms_title()}</h1>
		<p class="text-sm text-muted">{m.legal_last_updated()}</p>
	</header>

	<div class="max-w-prose space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_terms_acceptance_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.legal_terms_acceptance_p1()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_terms_nature_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.legal_terms_nature_p1()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>{m.legal_terms_nature_li1()}</li>
					<li>{m.legal_terms_nature_li2()}</li>
					<li>{m.legal_terms_nature_li3()}</li>
				</ul>
				<p>{m.legal_terms_nature_p2()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_terms_ai_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_terms_ai_intro()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>{@html m.legal_terms_ai_li1()}</li>
					<li>{@html m.legal_terms_ai_li2()}</li>
					<li>{@html m.legal_terms_ai_li3()}</li>
					<li>{m.legal_terms_ai_li4()}</li>
					<li>{@html m.legal_terms_ai_li5()}</li>
				</ul>
				<p>{m.legal_terms_ai_p1()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_terms_license_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					{@html m.legal_terms_license_p1()}
				</p>
				<p>{m.legal_terms_license_can()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>{@html m.legal_terms_license_li1()}</li>
					<li>{@html m.legal_terms_license_li2()}</li>
					<li>{@html m.legal_terms_license_li3()}</li>
				</ul>
				<p>{m.legal_terms_license_condition()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>{m.legal_terms_license_li4()}</li>
					<li>{m.legal_terms_license_li5()}</li>
					<li>{m.legal_terms_license_li6()}</li>
				</ul>
				<p>
					Il repository del progetto è disponibile su
					<a href="https://github.com/andreabuttarelli/traidue.com" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">GitHub</a>.
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_terms_accuracy_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_terms_accuracy_p1()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>{m.legal_terms_accuracy_li1()}</li>
					<li>{m.legal_terms_accuracy_li2()}</li>
					<li>{m.legal_terms_accuracy_li3()}</li>
				</ul>
				<p>
					{m.legal_terms_accuracy_p2()}
					<a href="mailto:info@traidue.com" class="text-primary underline hover:no-underline">info@traidue.com</a>
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_terms_contributions_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_terms_contributions_p1()}</p>
				<p>{m.legal_terms_contributions_p2()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_terms_liability_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.legal_terms_liability_p1()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_terms_law_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_terms_law_p1()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_terms_changes_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					{m.legal_terms_changes_p1()}
				</p>
			</div>
		</section>
	</div>
</div>
