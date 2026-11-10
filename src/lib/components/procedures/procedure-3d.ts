// Configuration of an animated 3D procedure (Procedure3D.svelte): real anatomy (GLB files built by scripts/),
// one state per part and step, labels and the parts the camera frames.

/** normal, active (being worked on), ghost (just removed), hidden, pink (new), pink light */
export type State = 'n' | 'a' | 'g' | 'h' | 'p' | 'pl';

export interface Part3D {
	color: string;
	/** translucent silhouette (skin): unlit, double-sided, very transparent */
	ghost?: boolean;
	/** cut by the sagittal section (x > 0.5 mm removed) */
	clip?: boolean;
	/** resting opacity, e.g. bones behind the organs */
	opacity?: number;
}

export interface Step3D {
	title: string;
	text: string;
	keep: string[];
	remove: string[];
}

export interface Procedure3DConfig {
	/** GLB files under /static; mesh names are the part names */
	models: string[];
	parts: Record<string, Part3D>;
	steps: Step3D[];
	/** state of each part at a step; parts left out are 'n' */
	stateFor: (step: number) => Record<string, State>;
	labels: { text: string; anchor: string; from: number; to: number; accent?: boolean }[];
	legend: [string, string][];
	/** parts the camera frames at a step */
	focus: (step: number) => string[];
	/** camera direction from the framed parts (+x = the cut side, -y = front, +z = up) and distance in radii */
	view: [number, number, number];
	distance?: number;
	label: string;
	credits: string;
}

/** Helper for removals: the part is active at `at`, a ghost right after, then hidden. */
export function removedAt(s: Record<string, State>, step: number, part: string, at: number) {
	if (step === at) s[part] = 'a';
	else if (step === at + 1) s[part] = 'g';
	else if (step > at + 1) s[part] = 'h';
}
