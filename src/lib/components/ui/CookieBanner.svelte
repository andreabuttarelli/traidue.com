<script lang="ts">
	import { browser } from '$app/environment';

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

		const { initializeApp } = await import('firebase/app');
		const { getAnalytics } = await import('firebase/analytics');

		const firebaseConfig = {
			apiKey: 'AIzaSyAnwU2kB8h8p5atyKdPJImbtUKl6_QaDws',
			authDomain: 'tra-i-due.firebaseapp.com',
			projectId: 'tra-i-due',
			storageBucket: 'tra-i-due.firebasestorage.app',
			messagingSenderId: '778361873999',
			appId: '1:778361873999:web:db7515251b258f438f6c3a',
			measurementId: 'G-FEF4G3MRHT'
		};

		const app = initializeApp(firebaseConfig);
		getAnalytics(app);

		// Datafast
		if (!document.querySelector('script[src*="datafa.st"]')) {
			const ds = document.createElement('script');
			ds.defer = true;
			ds.src = 'https://datafa.st/js/script.js';
			ds.dataset.websiteId = 'dfid_O26clodV7LSwNcqdKgKQL';
			ds.dataset.domain = 'www.traidue.com';
			document.head.appendChild(ds);
		}
	}

	if (browser && localStorage.getItem(CONSENT_KEY) === 'accepted') {
		loadAnalytics();
	}
</script>

{#if visible}
	<div class="fixed bottom-0 left-0 right-0 sm:right-auto z-50 p-4 sm:p-6">
		<div class="max-w-lg bg-card border border-border rounded-xl shadow-lg p-5 sm:p-6">
			<p class="text-sm text-text leading-relaxed mb-4">
				Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.
				<a href="/cookie" class="text-primary underline hover:no-underline">Scopri di più</a>
			</p>
			<div class="flex gap-3">
				<button
					onclick={accept}
					class="flex-1 px-4 py-2.5 rounded-lg bg-primary text-bg text-sm font-medium hover:bg-primary/80 transition"
				>
					Accetta
				</button>
				<button
					onclick={reject}
					class="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text hover:border-primary/30 transition"
				>
					Rifiuta
				</button>
			</div>
		</div>
	</div>
{/if}
