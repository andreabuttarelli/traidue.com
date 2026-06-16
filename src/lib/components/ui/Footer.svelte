<script lang="ts">
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import Logo from './Logo.svelte';
</script>

<footer class="pb-24">
	<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
		<div class="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-8 sm:gap-12">
			<div class="max-w-sm">
				<p class="text-lg text-primary mb-2"><Logo /></p>
				<p class="text-sm text-muted leading-relaxed mb-4">
					{m.footer_tagline()}
				</p>
				<a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="inline-block text-muted hover:text-primary transition-colors mb-8">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
				</a>
				<!-- <p class="text-xs text-muted mb-2">Sponsor</p>
				<div class="flex items-center gap-5">
					<a href="https://dalnulla.com" target="_blank" rel="noopener noreferrer" aria-label="dalnulla.com">
						<img src="/images/logos/dalnulla-com-extended.svg" alt="dalnulla.com" class="h-7 invert dark:invert-0 opacity-60 hover:opacity-90 transition-opacity" />
					</a>
					<a href="https://teta.so" target="_blank" rel="noopener noreferrer" aria-label="teta.so">
						<img src="/images/logos/teta-so.svg" alt="teta.so" class="h-6 invert dark:invert-0 opacity-60 hover:opacity-90 transition-opacity" />
					</a>
				</div> -->
			</div>

			<div>
				<p class="text-sm font-medium text-primary mb-3">{m.footer_navigation()}</p>
				<nav class="flex flex-col gap-2">
					<a href={localizeHref('/wiki')} class="text-sm text-muted hover:text-primary transition-colors">{m.nav_wiki()}</a>
					<a href={localizeHref('/quiz')} class="text-sm text-muted hover:text-primary transition-colors">{m.nav_quiz()}</a>
					<a href={localizeHref('/glossario')} class="text-sm text-muted hover:text-primary transition-colors">{m.nav_glossary()}</a>
					<a href={localizeHref('/chi-siamo')} class="text-sm text-muted hover:text-primary transition-colors">{m.nav_about()}</a>
					<a href={localizeHref('/perche-ai')} class="text-sm text-muted hover:text-primary transition-colors">{m.nav_why_ai()}</a>
					<a href={SITE.repo} target="_blank" rel="noopener noreferrer" class="text-sm text-muted hover:text-primary transition-colors">GitHub</a>
				</nav>
			</div>

			<div>
				<p class="text-sm font-medium text-primary mb-3">{m.footer_legal()}</p>
				<div class="flex flex-col gap-2">
					<p class="text-sm text-muted">{m.footer_copyright({ brand: SITE.brand })}</p>
					<a href={localizeHref('/privacy')} class="text-sm text-muted hover:text-primary transition-colors">{m.footer_privacy()}</a>
					<a href={localizeHref('/cookie')} class="text-sm text-muted hover:text-primary transition-colors">{m.footer_cookie()}</a>
					<a href={localizeHref('/termini')} class="text-sm text-muted hover:text-primary transition-colors">{m.footer_terms()}</a>
					<a
						href="https://www.apache.org/licenses/LICENSE-2.0"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-muted hover:text-primary transition-colors"
					>
						{m.footer_license()}
					</a>
				</div>
			</div>
		</div>
		<!-- Newsletter CTA -->
		<div class="border-t border-border mt-8 sm:mt-12 pt-8 sm:pt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			<div>
				<p class="text-sm font-medium text-primary mb-1">{m.footer_newsletter_title()}</p>
				<p class="text-sm text-muted">{m.footer_newsletter_desc()}</p>
			</div>
			<a
				href={localizeHref('/newsletter')}
				class="inline-block px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-bg hover:bg-primary/80 transition self-start sm:self-center"
			>
				{m.footer_newsletter_cta()} &rarr;
			</a>
		</div>
	</div>
</footer>
