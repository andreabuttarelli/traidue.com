<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import * as m from '$lib/paraglide/messages';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { SITE } from '$lib/site';

	const alternateUrls = Object.fromEntries(
		locales.map(l => [l, `${SITE.url}${localizeHref('/cookie', { locale: l })}`])
	);
</script>

<SEO
	title={m.legal_cookie_title()}
	description={m.legal_cookie_seo_desc({ brand: SITE.brand })}
	url={`${SITE.url}/cookie`}
	{alternateUrls}
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.legal_cookie_title() }]} />

	<header class="mb-10 sm:mb-16">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold tracking-tight text-primary mb-4">{m.legal_cookie_title()}</h1>
		<p class="text-sm text-muted">{m.legal_last_updated()}</p>
	</header>

	<div class="max-w-prose space-y-10 sm:space-y-16">
		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_cookie_what_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_cookie_what_p1()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_cookie_technical_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_cookie_technical_p1()}</p>
				<div class="overflow-x-auto">
					<table class="w-full text-sm border border-border">
						<thead>
							<tr class="bg-card">
								<th class="text-left p-3 border-b border-border font-semibold">{m.legal_cookie_table_name()}</th>
								<th class="text-left p-3 border-b border-border font-semibold">{m.legal_cookie_table_purpose()}</th>
								<th class="text-left p-3 border-b border-border font-semibold">{m.legal_cookie_table_duration()}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="p-3 border-b border-border font-mono text-xs">theme</td>
								<td class="p-3 border-b border-border">{m.legal_cookie_theme_purpose()}</td>
								<td class="p-3 border-b border-border">{m.legal_cookie_theme_duration()}</td>
							</tr>
							<tr>
								<td class="p-3 border-b border-border font-mono text-xs">traidue-cookie-consent</td>
								<td class="p-3 border-b border-border">{m.legal_cookie_consent_purpose()}</td>
								<td class="p-3 border-b border-border">{m.legal_cookie_consent_duration()}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_cookie_analytics_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.legal_cookie_analytics_p1()}</p>
				<p>{m.legal_cookie_analytics_services()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>
						{@html m.legal_cookie_analytics_google()}
						<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Privacy Policy di Google</a>.
					</li>
					<li>
						{@html m.legal_cookie_analytics_datafast()}
						<a href="https://datafa.st/privacy" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Privacy Policy di Datafast</a>.
					</li>
				</ul>
				<p>{m.legal_cookie_analytics_no_profiling()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_cookie_manage_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{m.legal_cookie_manage_p1()}</p>
				<ul class="list-disc list-inside space-y-2 pl-2">
					<li>{m.legal_cookie_manage_li1()}</li>
					<li>{m.legal_cookie_manage_li2()}</li>
				</ul>
				<p>{m.legal_cookie_manage_p2()}</p>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-heading font-semibold text-primary mb-4">{m.legal_cookie_more_title()}</h2>
			<div class="space-y-4 text-text leading-relaxed">
				<p>{@html m.legal_cookie_more_p1()}</p>
				<p>
					{m.legal_cookie_more_contact()}
					<a href={`mailto:${SITE.email}`} class="text-primary underline hover:no-underline">{SITE.email}</a>
				</p>
			</div>
		</section>
	</div>
</div>
