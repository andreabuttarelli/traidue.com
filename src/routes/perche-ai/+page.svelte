<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `https://www.traidue.com${localizeHref('/perche-ai', { locale: l })}`])
	);

	const pageSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: m.ai_page_title(),
		url: 'https://www.traidue.com/perche-ai',
		description: m.ai_seo_desc(),
		isPartOf: {
			'@type': 'WebSite',
			name: 'Tra i Due',
			url: 'https://www.traidue.com'
		}
	};
</script>

<SEO
	title={m.ai_page_title()}
	description={m.ai_seo_desc()}
	url="https://www.traidue.com/perche-ai"
	{alternateUrls}
/>

<StructuredData schema={pageSchema} />

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.ai_page_title() }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">{m.ai_page_title()}</h1>
		<p class="text-lg text-muted leading-relaxed max-w-xl">
			{m.ai_intro()}
		</p>
	</header>

	<div class="max-w-prose space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.ai_how_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.ai_how_p1()}</p>
				<p>{@html m.ai_how_p2()}</p>
				<p>{@html m.ai_how_p3()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.ai_unreliable_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.ai_unreliable_p1()}</p>
				<p>{@html m.ai_unreliable_p2()}</p>
				<p>{@html m.ai_unreliable_p3()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.ai_pollution_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.ai_pollution_p1()}</p>
				<p>{@html m.ai_pollution_p2()}</p>
				<p>{@html m.ai_pollution_p3()}</p>
				<p>{@html m.ai_pollution_p4()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.ai_jobs_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.ai_jobs_p1()}</p>
				<p>{@html m.ai_jobs_p2()}</p>
				<p>{@html m.ai_jobs_p3()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.ai_bias_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.ai_bias_p1()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2 text-text">
					<li>{@html m.ai_bias_li1()}</li>
					<li>{@html m.ai_bias_li2()}</li>
					<li>{@html m.ai_bias_li3()}</li>
					<li>{@html m.ai_bias_li4()}</li>
				</ul>
				<p>{@html m.ai_bias_p2()}</p>
			</div>
		</section>

		<section class="border-t border-border pt-10 sm:pt-16">
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.ai_commitment_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.ai_commitment_intro()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2 text-text">
					<li>{@html m.ai_commitment_li1()}</li>
					<li>{@html m.ai_commitment_li2()}</li>
					<li>{@html m.ai_commitment_li3()}</li>
					<li>{@html m.ai_commitment_li4()}</li>
				</ul>
				<p>
					{m.ai_commitment_contact()}
					<a href="mailto:info@traidue.com" class="text-primary underline hover:no-underline">info@traidue.com</a>.
				</p>
			</div>
		</section>
	</div>
</div>
