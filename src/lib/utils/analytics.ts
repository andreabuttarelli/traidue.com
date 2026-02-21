import { browser } from '$app/environment';

let analyticsInstance: ReturnType<typeof import('firebase/analytics').getAnalytics> | null = null;

async function getAnalyticsInstance() {
	if (!browser) return null;
	if (localStorage.getItem('traidue-cookie-consent') !== 'accepted') return null;
	if (analyticsInstance) return analyticsInstance;

	try {
		const { getApp } = await import('firebase/app');
		const { getAnalytics } = await import('firebase/analytics');
		const app = getApp();
		analyticsInstance = getAnalytics(app);
		return analyticsInstance;
	} catch {
		return null;
	}
}

export async function trackEvent(eventName: string, params?: Record<string, string | number>) {
	const analytics = await getAnalyticsInstance();
	if (!analytics) return;

	const { logEvent } = await import('firebase/analytics');
	logEvent(analytics, eventName, params);
}
