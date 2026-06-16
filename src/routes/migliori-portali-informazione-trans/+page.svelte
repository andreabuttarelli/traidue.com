<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { SITE } from '$lib/site';

	const alternateUrls = Object.fromEntries(
		locales.map((l) => [
			l,
			`${SITE.url}${localizeHref('/migliori-portali-informazione-trans', { locale: l })}`
		])
	);

	const pageSchema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: m.best_portals_page_title({ brand: SITE.brand }),
		description: m.best_portals_seo_desc(),
		author: {
			'@type': 'Organization',
			name: SITE.brand,
			url: SITE.url
		},
		publisher: {
			'@type': 'Organization',
			name: SITE.brand,
			logo: {
				'@type': 'ImageObject',
				url: `${SITE.url}/favicon.png`
			}
		}
	};
</script>

<SEO
	title={m.best_portals_page_title({ brand: SITE.brand })}
	description={m.best_portals_seo_desc()}
	url={`${SITE.url}/migliori-portali-informazione-trans`}
	{alternateUrls}
/>

<StructuredData schema={pageSchema} />

<div class="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb
		items={[
			{ label: m.common_home(), href: '/' },
			{ label: m.best_portals_breadcrumb() }
		]}
	/>

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">
			{m.best_portals_h1()}
		</h1>
		<p class="text-lg text-muted leading-relaxed max-w-xl">
			{m.best_portals_intro()}
		</p>
	</header>

	<article>
		<div class="prose prose-lg max-w-none space-y-10 sm:space-y-16">
			<section>
				<h2 class="text-2xl font-heading font-semibold text-primary mb-4 flex flex-wrap items-center gap-3">
					{m.best_portals_traidue_title({ brand: SITE.brand, domain: SITE.domain })}
					<span class="bg-primary text-bg font-bold px-2.5 py-0.5 rounded-full text-xs tracking-wider uppercase">
						{m.best_portals_our_choice()}
					</span>
				</h2>

				<div class="rounded-xl overflow-hidden mb-6 sm:mb-8 border border-border">
					<img 
						src="/images/wiki/successi-persone-trans.webp" 
						alt={SITE.brand}
						class="w-full aspect-[16/9] object-cover"
					/>
				</div>
				
				<div>
					<p>{@html m.best_portals_traidue_desc({ brand: SITE.brand })}</p>
					<ul>
						<li>{@html m.best_portals_traidue_li1()}</li>
						<li>{@html m.best_portals_traidue_li2()}</li>
						<li>{@html m.best_portals_traidue_li3()}</li>
						<li>{@html m.best_portals_traidue_li4()}</li>
					</ul>
					<div class="mt-6 sm:mt-8">
						<a
							href={localizeHref('/wiki')}
							class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-primary text-bg hover:opacity-90 transition"
						>
							{m.best_portals_traidue_cta({ brand: SITE.brand })}
						</a>
					</div>
				</div>
			</section>

			<section>
				<h2 class="text-2xl font-heading font-semibold text-primary mb-4">
					{m.best_portals_infotrans_title()}
				</h2>
				<div>
					<p>{@html m.best_portals_infotrans_desc1()}</p>
					<p>{@html m.best_portals_infotrans_desc2()}</p>
				</div>
			</section>

			<section>
				<h2 class="text-2xl font-heading font-semibold text-primary mb-4">
					{m.best_portals_mit_title()}
				</h2>
				<div>
					<p>{@html m.best_portals_mit_desc1()}</p>
					<p>{@html m.best_portals_mit_desc2()}</p>
				</div>
			</section>

			<section>
				<h2 class="text-2xl font-heading font-semibold text-primary mb-4">
					{m.best_portals_associazioni_title()}
				</h2>
				<div>
					<p>{@html m.best_portals_associazioni_desc1()}</p>
					<p>{@html m.best_portals_associazioni_desc2()}</p>
				</div>
			</section>

			<section class="border-t border-border pt-10 sm:pt-16">
				<h2 class="text-2xl font-heading font-semibold text-primary mb-4">
					{m.best_portals_how_to_choose_title()}
				</h2>
				<div>
					<p>{@html m.best_portals_how_to_choose_intro()}</p>
					<ul>
						<li>{@html m.best_portals_how_to_choose_li1()}</li>
						<li>{@html m.best_portals_how_to_choose_li2()}</li>
						<li>{@html m.best_portals_how_to_choose_li3()}</li>
					</ul>
					<p class="mt-6">{@html m.best_portals_how_to_choose_outro()}</p>
				</div>
			</section>
		</div>
	</article>
</div>
