<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import StructuredData from '$lib/components/seo/StructuredData.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { SITE } from '$lib/site';

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `${SITE.url}${localizeHref('/chi-siamo', { locale: l })}`])
	);

	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: SITE.brand,
		url: SITE.url,
		description:
			'Informazione evidence-based sulle tematiche trans: identità di genere, scienza, percorsi e cultura.',
		email: SITE.email,
		logo: {
			'@type': 'ImageObject',
			url: `${SITE.url}/favicon.png`
		},
		founder: {
			'@type': 'Person',
			name: 'Andrea Buttarelli',
			url: `${SITE.url}/chi-siamo`,
			jobTitle: 'Founder',
			sameAs: [
				'https://www.instagram.com/andrea_buttarelli',
				'https://www.linkedin.com/in/andreabuttarelli/',
				'https://github.com/andreabuttarelli'
			]
		},
		sameAs: [
			SITE.repo,
			SITE.instagram
		]
	};

	const founderSchema = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		mainEntity: {
			'@type': 'Person',
			name: 'Andrea Buttarelli',
			url: `${SITE.url}/chi-siamo`,
			jobTitle: 'Founder',
			description: `Docente IED, imprenditrice tech e AI. Founder di ${SITE.brand}.`,
			worksFor: {
				'@type': 'Organization',
				name: SITE.brand,
				url: SITE.url
			},
			sameAs: [
				'https://www.instagram.com/andrea_buttarelli',
				'https://www.linkedin.com/in/andreabuttarelli/',
				'https://github.com/andreabuttarelli'
			]
		}
	};
</script>

<SEO
	title={m.about_page_title()}
	description={m.about_seo_desc({ brand: SITE.brand })}
	url={`${SITE.url}/chi-siamo`}
	{alternateUrls}
/>

<StructuredData schema={organizationSchema} />
<StructuredData schema={founderSchema} />

<div class="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.about_page_title() }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">{m.about_page_title()}</h1>
		<p class="text-lg text-muted leading-relaxed max-w-xl">
			{@html m.about_intro({ brand: SITE.brand })}
		</p>
	</header>

	<div class="rounded-xl overflow-hidden mb-10 sm:mb-16">
		<img
			src="/images/wiki/successi-persone-trans.webp"
			alt="{m.about_page_title()} — {SITE.brand}"
			width="1344"
			height="768"
			decoding="async"
			class="w-full aspect-[16/9] object-cover"
		/>
	</div>

	<article>
		<div class="prose prose-lg max-w-none space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.about_mission_title()}</h2>
			<div>
				<p>{@html m.about_mission_p1()}</p>
				<p>{@html m.about_mission_p2()}</p>
				<p>{@html m.about_mission_p3()}</p>
				<p>{@html m.about_mission_p4()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.about_methodology_title()}</h2>
			<div>
				<p>{@html m.about_methodology_p1()}</p>
				<ul>
					<li>{@html m.about_methodology_li1()}</li>
					<li>{@html m.about_methodology_li2()}</li>
					<li>{@html m.about_methodology_li3()}</li>
				</ul>
				<p>{@html m.about_methodology_p2()}</p>
				<p>{@html m.about_methodology_p3()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.about_opensource_title()}</h2>
			<div>
				<p>{@html m.about_opensource_p1({ brand: SITE.brand })}</p>
				<p>{@html m.about_opensource_p2()}</p>
				<p>
					<a
						href={SITE.repo}
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary underline hover:no-underline"
					>
						{SITE.repo.replace(/^https?:\/\//, '')}
					</a>
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.about_contacts_title()}</h2>
			<div>
				<p>{m.about_contacts_intro()}</p>
				<p class="flex flex-wrap gap-x-4 gap-y-1">
					<a href="mailto:andrea@teta.so" class="text-primary underline hover:no-underline">andrea@teta.so</a>
					<a href={SITE.instagram} target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Instagram</a>
					<a href="https://www.linkedin.com/in/andreabuttarelli/" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">LinkedIn</a>
					<a href={SITE.repo} target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">GitHub</a>
				</p>
			</div>
		</section>

		<section class="border-t border-border pt-10 sm:pt-16">
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.about_associations_title()}</h2>
			<div>
				<p>{@html m.about_associations_p1()}</p>
				<p>
					{m.about_associations_p2()}
					<a href="mailto:andrea@teta.so" class="text-primary underline hover:no-underline">andrea@teta.so</a>
				</p>
			</div>
		</section>
		</div>
	</article>
</div>
