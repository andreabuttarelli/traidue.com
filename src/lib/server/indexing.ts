import { env } from '$env/dynamic/private';

const TIMEOUT_MS = 10_000;

async function submitIndexNow(url: string): Promise<void> {
	const key = env.INDEXNOW_KEY;
	if (!key) {
		console.warn('[IndexNow] INDEXNOW_KEY not set, skipping');
		return;
	}

	const res = await fetch('https://api.indexnow.org/IndexNow', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			host: 'www.traidue.com',
			key,
			urlList: [url]
		}),
		signal: AbortSignal.timeout(TIMEOUT_MS)
	});

	if (!res.ok) {
		console.error(`[IndexNow] ${res.status} ${res.statusText}`);
	} else {
		console.log(`[IndexNow] Submitted ${url}`);
	}
}

function base64UrlEncode(data: Uint8Array): string {
	let binary = '';
	for (const byte of data) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function signJwt(serviceAccount: { client_email: string; private_key: string }): Promise<string> {
	const header = { alg: 'RS256', typ: 'JWT' };
	const now = Math.floor(Date.now() / 1000);
	const payload = {
		iss: serviceAccount.client_email,
		scope: 'https://www.googleapis.com/auth/indexing',
		aud: 'https://oauth2.googleapis.com/token',
		iat: now,
		exp: now + 3600
	};

	const encoder = new TextEncoder();
	const headerB64 = base64UrlEncode(encoder.encode(JSON.stringify(header)));
	const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
	const signingInput = `${headerB64}.${payloadB64}`;

	// Import PEM private key
	const pemBody = serviceAccount.private_key
		.replace(/-----BEGIN PRIVATE KEY-----/, '')
		.replace(/-----END PRIVATE KEY-----/, '')
		.replace(/\s/g, '');
	const keyBuffer = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

	const cryptoKey = await crypto.subtle.importKey(
		'pkcs8',
		keyBuffer,
		{ name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
		false,
		['sign']
	);

	const signature = await crypto.subtle.sign(
		'RSASSA-PKCS1-v1_5',
		cryptoKey,
		encoder.encode(signingInput)
	);

	const signatureB64 = base64UrlEncode(new Uint8Array(signature));
	return `${signingInput}.${signatureB64}`;
}

async function getGoogleAccessToken(serviceAccount: { client_email: string; private_key: string }): Promise<string> {
	const jwt = await signJwt(serviceAccount);

	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
			assertion: jwt
		}),
		signal: AbortSignal.timeout(TIMEOUT_MS)
	});

	if (!res.ok) {
		throw new Error(`Google token exchange failed: ${res.status} ${res.statusText}`);
	}

	const data = await res.json();
	return data.access_token;
}

async function submitGoogleIndexing(url: string): Promise<void> {
	const saJson = env.GOOGLE_SERVICE_ACCOUNT_JSON;
	if (!saJson) {
		console.warn('[Google Indexing] GOOGLE_SERVICE_ACCOUNT_JSON not set, skipping');
		return;
	}

	const serviceAccount = JSON.parse(atob(saJson));
	const accessToken = await getGoogleAccessToken(serviceAccount);

	const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({ url, type: 'URL_UPDATED' }),
		signal: AbortSignal.timeout(TIMEOUT_MS)
	});

	if (!res.ok) {
		console.error(`[Google Indexing] ${res.status} ${res.statusText}`);
	} else {
		console.log(`[Google Indexing] Submitted ${url}`);
	}
}

export async function submitUrlForIndexing(url: string): Promise<void> {
	const results = await Promise.allSettled([
		submitIndexNow(url),
		submitGoogleIndexing(url)
	]);

	for (const result of results) {
		if (result.status === 'rejected') {
			console.error('[Indexing] Error:', result.reason);
		}
	}
}
