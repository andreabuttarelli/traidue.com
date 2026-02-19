import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getAllArticles } from '$lib/utils/wiki';
import type { RequestHandler } from './$types';

const categoryColors: Record<string, string> = {
	terminologia: '#6366f1',
	scienza: '#059669',
	percorsi: '#d97706',
	cultura: '#e11d48'
};

let fontCache: { regular: ArrayBuffer; bold: ArrayBuffer } | null = null;

async function getFonts() {
	if (fontCache) return fontCache;
	const [regular, bold] = await Promise.all([
		fetch(
			'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf'
		).then((r) => r.arrayBuffer()),
		fetch(
			'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf'
		).then((r) => r.arrayBuffer())
	]);
	fontCache = { regular, bold };
	return fontCache;
}

export const GET: RequestHandler = async ({ params }) => {
	const articles = getAllArticles();
	const article = articles.find((a) => a.slug === params.slug);

	if (!article) {
		return new Response('Not found', { status: 404 });
	}

	const accentColor = categoryColors[article.category] || '#111111';
	const fonts = await getFonts();

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: '1200px',
					height: '630px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '60px 80px',
					backgroundColor: '#ffffff',
					borderTop: `8px solid ${accentColor}`,
					fontFamily: 'Inter'
				},
				children: [
					{
						type: 'div',
						props: {
							style: { display: 'flex', flexDirection: 'column' },
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '20px',
											color: accentColor,
											textTransform: 'uppercase',
											letterSpacing: '0.1em',
											marginBottom: '16px'
										},
										children: article.category
									}
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '52px',
											fontWeight: 700,
											color: '#111111',
											lineHeight: 1.2
										},
										children: article.title
									}
								}
							]
						}
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-end'
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '24px',
											fontWeight: 600,
											color: '#111111'
										},
										children: 'Tra i Due'
									}
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '18px',
											color: '#777777'
										},
										children: `${article.sources.length} fonti citate`
									}
								}
							]
						}
					}
				]
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Inter', data: fonts.regular, weight: 400, style: 'normal' as const },
				{ name: 'Inter', data: fonts.bold, weight: 700, style: 'normal' as const }
			]
		}
	);

	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: 1200 }
	});
	const png = resvg.render().asPng();

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=604800, immutable'
		}
	});
};
