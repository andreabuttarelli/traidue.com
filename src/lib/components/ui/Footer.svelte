<script lang="ts">
	import Logo from './Logo.svelte';
</script>

<footer>
	<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
			<div>
				<p class="text-lg text-primary mb-2"><Logo /></p>
				<p class="text-sm text-muted leading-relaxed">
					Informazione accessibile e verificata sulle tematiche trans.
				</p>
			</div>

			<div>
				<p class="text-sm font-medium text-primary mb-3">Navigazione</p>
				<nav class="flex flex-col gap-2">
					<a href="/wiki" class="text-sm text-muted hover:text-primary transition-colors">Wiki</a>
					<a href="/quiz" class="text-sm text-muted hover:text-primary transition-colors">Quiz</a>
					<a href="/chi-siamo" class="text-sm text-muted hover:text-primary transition-colors">Chi Siamo</a>
				</nav>
			</div>

			<div>
				<p class="text-sm font-medium text-primary mb-3">Legale</p>
				<div class="flex flex-col gap-2">
					<p class="text-sm text-muted">&copy; 2026 Tra i Due</p>
					<a
						href="https://www.apache.org/licenses/LICENSE-2.0"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-muted hover:text-primary transition-colors"
					>
						Licenza Apache 2.0
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
