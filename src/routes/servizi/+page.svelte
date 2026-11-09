<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
	import ServicesMap from '$lib/components/services/ServicesMap.svelte';
	import { SITE } from '$lib/site';
	import * as m from '$lib/paraglide/messages';

	let { data } = $props();
</script>

<SEO
	title={m.services_page_seo_title({ brand: SITE.brand })}
	description={m.services_page_seo_desc({ count: data.services.services.length })}
	url={`${SITE.url}/servizi`}
/>

<div class="w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
	<Breadcrumb items={[{ label: m.common_home(), href: '/' }, { label: m.nav_services() }]} />
	<ServicesMap data={data.services} />
</div>
