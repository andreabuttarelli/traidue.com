<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { SITE } from '$lib/site';

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `${SITE.url}${localizeHref('/privacy', { locale: l })}`])
	);
</script>

<SEO
	title={m.legal_privacy_title()}
	description={m.legal_privacy_seo_desc({ brand: SITE.brand })}
	url={`${SITE.url}/privacy`}
	{alternateUrls}
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.legal_privacy_title() }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">{m.legal_privacy_title()}</h1>
		<p class="text-sm text-muted">{m.legal_last_updated()}</p>
	</header>

	<div class="max-w-prose space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_privacy_controller_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.legal_privacy_controller_p1({ brand: SITE.brand, domain: SITE.domain, url: SITE.url })}</p>
				<p>
					{m.legal_privacy_controller_p2()}
					<a href={`mailto:${SITE.email}`} class="text-primary underline hover:no-underline">{SITE.email}</a>
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_privacy_data_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.legal_privacy_data_p1({ brand: SITE.brand })}</p>
				<p>{m.legal_privacy_data_p2()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>{@html m.legal_privacy_data_li1()}</li>
					<li>{@html m.legal_privacy_data_li2()}</li>
					<li>{@html m.legal_privacy_data_li3()}</li>
				</ul>
				<p>{@html m.legal_privacy_data_p3()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_privacy_hosting_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					{@html m.legal_privacy_hosting_p1()}
					<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Privacy Policy</a>.
				</p>
				<p>{m.legal_privacy_hosting_p2({ brand: SITE.brand })}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_privacy_ai_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_privacy_ai_intro()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>{@html m.legal_privacy_ai_li1()}</li>
					<li>{@html m.legal_privacy_ai_li2()}</li>
					<li>{@html m.legal_privacy_ai_li3()}</li>
					<li>
						{@html m.legal_privacy_ai_li4()}
						<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Privacy Policy</a>
						e ai
						<a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Termini del servizio Gemini API</a>.
					</li>
				</ul>
				<p>{@html m.legal_privacy_ai_warning()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_privacy_links_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_privacy_links_p1({ brand: SITE.brand })}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_privacy_rights_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_privacy_rights_intro()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>{m.legal_privacy_rights_li1()}</li>
					<li>{m.legal_privacy_rights_li2()}</li>
					<li>{m.legal_privacy_rights_li3()}</li>
					<li>{m.legal_privacy_rights_li4()}</li>
					<li>{m.legal_privacy_rights_li5()}</li>
				</ul>
				<p>
					{m.legal_privacy_rights_p1({ brand: SITE.brand })}
					<a href={`mailto:${SITE.email}`} class="text-primary underline hover:no-underline">{SITE.email}</a>
				</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_privacy_changes_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>
					{m.legal_privacy_changes_p1()}
				</p>
			</div>
		</section>
	</div>
</div>
