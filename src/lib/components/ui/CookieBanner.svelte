<script lang="ts">
	import { browser } from '$app/environment';
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	// dynamic, not static: a missing var must skip analytics, not break hydration of every page.
	import { env } from '$env/dynamic/public';

	const CONSENT_KEY = 'traidue-cookie-consent';

	let visible = $state(false);

	$effect(() => {
		if (browser) {
			visible = !localStorage.getItem(CONSENT_KEY);
		}
	});

	function accept() {
		localStorage.setItem(CONSENT_KEY, 'accepted');
		visible = false;
		loadAnalytics();
	}

	function reject() {
		localStorage.setItem(CONSENT_KEY, 'rejected');
		visible = false;
	}

	async function loadAnalytics() {
		if (!browser) return;
		if (localStorage.getItem(CONSENT_KEY) !== 'accepted') return;

		if (env.PUBLIC_FIREBASE_API_KEY) {
			const { initializeApp } = await import('firebase/app');
			const { getAnalytics } = await import('firebase/analytics');
			const app = initializeApp({
				apiKey: env.PUBLIC_FIREBASE_API_KEY,
				authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
				projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
				storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
				messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
				appId: env.PUBLIC_FIREBASE_APP_ID,
				measurementId: env.PUBLIC_FIREBASE_MEASUREMENT_ID
			});
			getAnalytics(app);
		}

		// Datafast
		if (!document.querySelector('script[src*="datafa.st"]')) {
			const ds = document.createElement('script');
			ds.defer = true;
			ds.src = 'https://datafa.st/js/script.js';
			ds.dataset.websiteId = 'dfid_O26clodV7LSwNcqdKgKQL';
			ds.dataset.domain = new URL(SITE.url).host;
			document.head.appendChild(ds);
		}
	}

	if (browser && localStorage.getItem(CONSENT_KEY) === 'accepted') {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(() => loadAnalytics());
		} else {
			setTimeout(() => loadAnalytics(), 3000);
		}
	}
</script>

{#if visible}
	<div class="fixed bottom-0 left-0 right-0 sm:right-auto z-50 p-4 sm:p-6">
		<div class="max-w-lg bg-card border border-border rounded-xl shadow-lg p-5 sm:p-6">
			<p class="text-sm text-text leading-relaxed mb-4">
				{m.cookie_message()}
				<a href={localizeHref('/cookie')} class="text-primary underline hover:no-underline">{m.cookie_learn_more()}</a>
			</p>
			<div class="flex gap-3">
				<button
					onclick={accept}
					class="flex-1 px-4 py-2.5 rounded-lg bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition"
				>
					{m.cookie_accept()}
				</button>
				<button
					onclick={reject}
					class="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text hover:border-primary/30 transition"
				>
					{m.cookie_reject()}
				</button>
			</div>
		</div>
	</div>
{/if}
