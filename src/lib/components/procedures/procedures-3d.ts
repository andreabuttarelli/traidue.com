// Animated 3D procedures shown by Procedure3D.svelte, by procedure slug. Only procedures that real anatomical
// models can show honestly are here (the vaginoplasty has its own viewer, Vaginoplasty3D.svelte):
// - male pelvis (BodyParts3D): orchiectomy, vulvoplasty (with the real vulva fitted at build time)
// - larynx (BodyParts3D): tracheal shave, glottoplasty
// - female pelvis (MRI of one person): hysterectomy, vaginectomy
// ponytail: chest, phalloplasty, metoidioplasty and face are left out until real models of those regions exist.
import { removedAt, type Procedure3DConfig, type State } from './procedure-3d';

const BP3D = 'Modello anatomico 3D: BodyParts3D, © The Database Center for Life Science, CC BY 4.0.';
const MRI = 'Organi pelvici femminili: «Pelvic Organs from MRI» di audreybyrd (Sketchfab, CC BY 4.0), risonanza magnetica di una donna.';
const VARY = 'Le tecniche variano tra chirurghi e centri: non sostituisce la spiegazione del chirurgo.';

// male pelvis, same colours as the vaginoplasty
const MALE = {
	body: { color: '#d9b99a', ghost: true },
	body_genital: { color: '#d9b99a', ghost: true },
	sacrum: { color: '#e8e1cf', clip: true, opacity: 0.4 },
	hip_left: { color: '#e8e1cf', clip: true, opacity: 0.4 },
	hip_right: { color: '#e8e1cf', opacity: 0.4 },
	bladder: { color: '#e3c16f', clip: true },
	urethra: { color: '#d9b84a', clip: true },
	prostate: { color: '#cf9a62', clip: true },
	seminal_vesicles: { color: '#c7b07a' },
	rectum: { color: '#a07a5f', clip: true },
	anal_sphincter: { color: '#8f6650', clip: true },
	corpora_cavernosa: { color: '#b9534f', clip: true },
	corpus_spongiosum: { color: '#8f6aa3', clip: true },
	glans: { color: '#c4876e', clip: true },
	testes: { color: '#b3a2c8', clip: true },
	epididymides: { color: '#9a88b3', clip: true },
	testicular_artery: { color: '#c43d3d' },
	dorsal_artery: { color: '#c43d3d' },
	dorsal_vein: { color: '#3e5c8a' },
	skin_penile: { color: '#e4c4a3', clip: true },
	skin_scrotal: { color: '#dcb796', clip: true }
};
const MALE_LEGEND: [string, string][] = [
	['Ossa', '#e8e1cf'], ['Vescica', '#e3c16f'], ['Prostata', '#cf9a62'], ['Retto', '#a07a5f'], ['Corpi cavernosi', '#b9534f'],
	['Corpo spongioso e uretra', '#8f6aa3'], ['Testicoli', '#b3a2c8'], ['Arterie', '#c43d3d'], ['Pelle', '#e4c4a3']
];
const GENITALS = ['testes', 'skin_scrotal', 'glans', 'corpora_cavernosa'];

const orchiectomia: Procedure3DConfig = {
	models: ['/anatomy/pelvis-male.glb'],
	parts: MALE,
	label: "Modello 3D animato dell'orchiectomia",
	view: [1, -0.7, 0.2],
	distance: 4.2,
	focus: () => ['testes', 'epididymides', 'skin_scrotal'],
	steps: [
		{ title: 'Anatomia di partenza', text: "I testicoli, con gli epididimi, stanno nello scroto. Sono appesi al funicolo spermatico, che contiene i vasi testicolari e il dotto deferente e risale verso l'addome attraverso il canale inguinale.", keep: [], remove: [] },
		{ title: 'Incisione', text: "In anestesia generale o spinale si pratica di solito una piccola incisione sulla linea mediana dello scroto (in alcune tecniche all'inguine). Spesso si opera in day surgery o con una notte di ricovero.", keep: [], remove: [] },
		{ title: 'Legatura del funicolo', text: 'I vasi testicolari e il dotto deferente vengono legati e sezionati, così da poter staccare i testicoli senza sanguinamento.', keep: [], remove: [] },
		{ title: 'Asportazione', text: 'Testicoli ed epididimi vengono rimossi. Da questo momento il corpo produce pochissimo testosterone: non servono più antiandrogeni, e la terapia con estrogeni prosegue secondo le indicazioni.', keep: [], remove: ['testicoli', 'epididimi'] },
		{ title: 'Chiusura e dopo', text: "Lo scroto viene suturato. Se in futuro si pensa a una vaginoplastica, molti chirurghi conservano tutta la pelle scrotale, che servirà per costruire la vulva. Il recupero richiede in genere una o due settimane.", keep: ['pelle dello scroto'], remove: [] }
	],
	stateFor: (n) => {
		const s: Record<string, State> = {};
		if (n === 1) s.skin_scrotal = 'a';
		if (n === 2) s.testicular_artery = 'a';
		removedAt(s, n, 'testes', 3);
		removedAt(s, n, 'epididymides', 3);
		if (n >= 4) s.testicular_artery = 'g';
		return s;
	},
	labels: [
		{ text: 'testicoli', anchor: 'testes', from: 0, to: 3 },
		{ text: 'scroto', anchor: 'skin_scrotal', from: 1, to: 1, accent: true },
		{ text: 'funicolo: vasi legati (in blu)', anchor: 'epididymides', from: 2, to: 2, accent: true },
		{ text: 'pelle scrotale conservata', anchor: 'skin_scrotal', from: 4, to: 4 }
	],
	legend: MALE_LEGEND,
	credits: `${BP3D} ${VARY}`
};

const vulvoplastica: Procedure3DConfig = {
	models: ['/anatomy/pelvis-male.glb', '/anatomy/vulva-female.glb'],
	parts: { ...MALE, vulva: { color: '#f5a9b8', clip: true } },
	label: 'Modello 3D animato della vulvoplastica',
	view: [1, -0.75, 0.05],
	distance: 3,
	focus: (n) => (n >= 6 ? ['vulva', 'prostate'] : GENITALS),
	steps: [
		{ title: 'Anatomia di partenza', text: "La vulvoplastica (o vaginoplastica a profondità zero) costruisce una vulva completa senza il canale vaginale: si usano gli stessi tessuti della vaginoplastica, ma non si crea lo spazio tra retto e prostata.", keep: [], remove: [] },
		{ title: 'Orchiectomia', text: 'Si asportano i testicoli, con gli epididimi e il tratto di funicolo.', keep: [], remove: ['testicoli'] },
		{ title: 'Pelle del pene', text: "La pelle del pene viene staccata dai corpi sottostanti: servirà per le piccole labbra e il vestibolo, non per rivestire un canale.", keep: ['pelle del pene'], remove: [] },
		{ title: 'Uretra', text: "L'uretra viene separata dai corpi cavernosi e accorciata: il suo sbocco (meato) sarà sotto il clitoride.", keep: ['uretra'], remove: [] },
		{ title: 'Glande e fascio neurovascolare', text: 'Una parte del glande, con i suoi nervi e vasi dorsali, viene preparata per diventare il clitoride, conservandone la sensibilità.', keep: ['glande (parte)', 'nervi e vasi dorsali'], remove: [] },
		{ title: 'Rimozione dei corpi cavernosi', text: 'I corpi cavernosi, il tessuto erettile, vengono rimossi fino alla loro radice.', keep: [], remove: ['corpi cavernosi'] },
		{ title: 'Vulva', text: "Con la pelle dello scroto si modellano le grandi labbra, con quella del pene le piccole labbra e il vestibolo; si posizionano clitoride e meato. Non c'è un canale: niente dilatazioni nel resto della vita.", keep: [], remove: [] },
		{ title: "Dopo l'intervento", text: "Il ricovero e il recupero sono in genere più brevi della vaginoplastica, con meno complicanze possibili. La scelta è definitiva solo in parte: alcune persone fanno in seguito un canale, ma è un intervento più complesso.", keep: [], remove: [] }
	],
	stateFor: (n) => {
		const s: Record<string, State> = { vulva: n >= 6 ? 'pl' : 'h' };
		removedAt(s, n, 'testes', 1);
		removedAt(s, n, 'epididymides', 1);
		removedAt(s, n, 'testicular_artery', 1);
		if (n === 2) s.skin_penile = 'a';
		if (n === 3) Object.assign(s, { corpus_spongiosum: 'a', urethra: 'a' });
		if (n === 4) Object.assign(s, { glans: 'a', dorsal_artery: 'a', dorsal_vein: 'a' });
		removedAt(s, n, 'corpora_cavernosa', 5);
		if (n >= 6) Object.assign(s, { skin_penile: 'h', skin_scrotal: 'h', glans: 'h', corpus_spongiosum: 'h', urethra: 'h', dorsal_artery: 'h', dorsal_vein: 'h', body_genital: 'h', corpora_cavernosa: 'h' }); // the penile urethra is gone (the short one left opens at the meatus)
		return s;
	},
	labels: [
		{ text: 'testicoli', anchor: 'testes', from: 0, to: 1 },
		{ text: 'pelle del pene', anchor: 'skin_penile', from: 2, to: 2, accent: true },
		{ text: 'uretra', anchor: 'corpus_spongiosum', from: 3, to: 3, accent: true },
		{ text: 'glande → clitoride', anchor: 'glans', from: 4, to: 4, accent: true },
		{ text: 'corpi cavernosi', anchor: 'corpora_cavernosa', from: 5, to: 5, accent: true },
		{ text: 'vulva: clitoride, meato, labbra', anchor: 'vulva', from: 6, to: 7, accent: true },
		{ text: 'prostata (resta)', anchor: 'prostate', from: 6, to: 7 }
	],
	legend: MALE_LEGEND,
	credits: `${BP3D} Vulva del risultato: «Pelvic Organs from MRI» di audreybyrd (Sketchfab, CC BY 4.0), adattata a questo corpo. ${VARY}`
};

// larynx: tracheal shave and glottoplasty
const LARYNX = {
	neck: { color: '#d9b99a', ghost: true },
	mandible: { color: '#e8e1cf', clip: true, opacity: 0.45 },
	vertebrae: { color: '#e8e1cf', clip: true, opacity: 0.45 },
	hyoid: { color: '#e8e1cf', clip: true },
	thyroid: { color: '#b8d4d0', clip: true },
	thyroid_prominence: { color: '#b8d4d0', clip: true },
	cricoid: { color: '#9fc2bd', clip: true },
	arytenoids: { color: '#8fb3ae', clip: true },
	epiglottis: { color: '#d9c7a3', clip: true },
	trachea: { color: '#c9dcd8', clip: true, opacity: 0.85 },
	vocal_folds: { color: '#f0e2c8' },
	vocal_front: { color: '#f0e2c8' },
	glottic_web: { color: '#f5a9b8' }
};
const LARYNX_LEGEND: [string, string][] = [
	['Cartilagine tiroidea', '#b8d4d0'], ['Cricoide e aritenoidi', '#9fc2bd'], ['Epiglottide', '#d9c7a3'], ['Corde vocali', '#f0e2c8'],
	['Trachea', '#c9dcd8'], ['Ossa', '#e8e1cf']
];

const condrolaringoplastica: Procedure3DConfig = {
	models: ['/anatomy/larynx.glb'],
	parts: LARYNX,
	label: 'Modello 3D animato della condrolaringoplastica',
	view: [1.1, -1, 0.25],
	distance: 3.2,
	focus: (n) => (n === 0 || n === 4 ? ['thyroid', 'hyoid', 'cricoid'] : ['thyroid_prominence', 'vocal_folds']),
	steps: [
		{ title: 'Anatomia di partenza', text: "Il «pomo d'Adamo» è l'angolo anteriore della cartilagine tiroidea, che dopo una pubertà con testosterone sporge di più. Subito dietro, all'interno della laringe, si attaccano le corde vocali.", keep: [], remove: [] },
		{ title: 'Incisione', text: "In anestesia generale si incide la pelle per 2–3 cm, di solito in una piega del collo o più in alto, sotto il mento, perché la cicatrice si veda poco.", keep: [], remove: [] },
		{ title: 'Esposizione', text: 'Si separano sulla linea mediana i muscoli sottili davanti alla laringe e si espone la cartilagine tiroidea.', keep: [], remove: [] },
		{ title: 'Riduzione della prominenza', text: "La parte che sporge viene rasata o asportata. Il limite è l'attacco delle corde vocali (commissura anteriore): restare sopra di esso protegge la voce. Alcuni chirurghi lo controllano con un endoscopio durante l'intervento.", keep: ['corde vocali'], remove: ['prominenza tiroidea'] },
		{ title: 'Risultato', text: "Il profilo del collo è più liscio. Gonfiore e fastidio nel deglutire durano in genere pochi giorni o qualche settimana; la voce di solito non cambia. La cicatrice si schiarisce nei mesi successivi.", keep: [], remove: [] }
	],
	stateFor: (n) => {
		const s: Record<string, State> = { glottic_web: 'h' }; // the web belongs to the glottoplasty
		if (n === 1) s.neck = 'a';
		if (n === 2) Object.assign(s, { thyroid: 'a', thyroid_prominence: 'a' });
		removedAt(s, n, 'thyroid_prominence', 3);
		return s;
	},
	labels: [
		{ text: "pomo d'Adamo", anchor: 'thyroid_prominence', from: 0, to: 0 },
		{ text: 'cartilagine tiroidea', anchor: 'thyroid', from: 2, to: 2, accent: true },
		{ text: 'prominenza da rasare', anchor: 'thyroid_prominence', from: 3, to: 3, accent: true },
		{ text: 'corde vocali: limite del taglio', anchor: 'vocal_folds', from: 3, to: 4 },
		{ text: 'osso ioide', anchor: 'hyoid', from: 0, to: 0 },
		{ text: 'trachea', anchor: 'trachea', from: 0, to: 0 }
	],
	legend: LARYNX_LEGEND,
	credits: `${BP3D} ${VARY}`
};

const femminilizzazioneVoce: Procedure3DConfig = {
	models: ['/anatomy/larynx.glb'],
	parts: { ...LARYNX, thyroid: { ...LARYNX.thyroid, opacity: 0.3 }, thyroid_prominence: { ...LARYNX.thyroid, opacity: 0.3 } },
	label: 'Modello 3D animato della glottoplastica',
	view: [0.35, -0.8, 1.1],
	distance: 2.4,
	focus: (n) => (n === 0 ? ['thyroid', 'cricoid', 'arytenoids'] : ['vocal_folds', 'vocal_front', 'arytenoids']),
	steps: [
		{ title: 'Anatomia di partenza', text: "Il tono della voce dipende soprattutto da lunghezza, massa e tensione delle corde vocali. Dopo una pubertà con testosterone sono più lunghe e spesse, e gli estrogeni non le cambiano: per questo si lavora con la logopedia e, per alcune persone, con la chirurgia.", keep: [], remove: [] },
		{ title: 'Accesso dalla bocca', text: "La glottoplastica di Wendler si fa in anestesia generale attraverso la bocca, con un laringoscopio e il microscopio: nessuna incisione sul collo. (Un'altra tecnica, l'avvicinamento cricotiroideo, passa invece dall'esterno e tende le corde.)", keep: [], remove: [] },
		{ title: 'Preparazione del tratto anteriore', text: 'Si rimuove lo strato superficiale (la mucosa) del terzo anteriore di entrambe le corde vocali, il tratto vicino al loro attacco sulla cartilagine tiroidea.', keep: [], remove: ['mucosa del terzo anteriore'] },
		{ title: 'Unione delle corde', text: 'Le due corde vengono suturate tra loro in quel tratto e si saldano formando una piccola membrana: la parte che vibra diventa più corta, e una corda più corta vibra a una frequenza più alta.', keep: [], remove: [] },
		{ title: "Dopo l'intervento", text: "Seguono circa una settimana di riposo vocale assoluto e poi la logopedia. Il tono di base sale in media di alcune note; volume e estensione verso l'acuto possono ridursi e i risultati variano. Va valutata con un foniatra o un otorinolaringoiatra esperto.", keep: [], remove: [] }
	],
	stateFor: (n) => {
		const s: Record<string, State> = { neck: n >= 1 ? 'h' : 'n', mandible: n >= 1 ? 'h' : 'n', hyoid: n >= 1 ? 'h' : 'n', epiglottis: n >= 1 ? 'g' : 'n' };
		if (n === 1) s.vocal_folds = 'a';
		if (n === 2) s.vocal_front = 'a';
		if (n >= 3) s.vocal_front = 'p';
		s.glottic_web = n >= 3 ? 'p' : 'h';
		return s;
	},
	labels: [
		{ text: 'corde vocali', anchor: 'vocal_folds', from: 0, to: 1 },
		{ text: 'terzo anteriore', anchor: 'vocal_front', from: 2, to: 2, accent: true },
		{ text: 'membrana: corde più corte', anchor: 'vocal_front', from: 3, to: 4, accent: true },
		{ text: 'aritenoidi', anchor: 'arytenoids', from: 0, to: 0 },
		{ text: 'parte che vibra', anchor: 'vocal_folds', from: 4, to: 4 }
	],
	legend: LARYNX_LEGEND,
	credits: `${BP3D} ${VARY}`
};

// female pelvis (MRI)
const FEMALE = {
	uterus: { color: '#c98a9a', clip: true },
	tubes: { color: '#d9a3ae', clip: true },
	ovaries: { color: '#b3a2c8', clip: true },
	vagina: { color: '#d48a8a', clip: true },
	bladder: { color: '#e3c16f', clip: true },
	rectum: { color: '#a07a5f', clip: true },
	vulva: { color: '#e4b8a6', clip: true }
};
const FEMALE_LEGEND: [string, string][] = [
	['Utero e cervice', '#c98a9a'], ['Tube', '#d9a3ae'], ['Ovaie', '#b3a2c8'], ['Vagina', '#d48a8a'], ['Vescica', '#e3c16f'], ['Retto', '#a07a5f'], ['Vulva', '#e4b8a6']
];

const isterectomia: Procedure3DConfig = {
	models: ['/anatomy/female-pelvis.glb'],
	parts: FEMALE,
	label: "Modello 3D animato dell'isterectomia",
	view: [1, -0.55, 0.35],
	distance: 2.6,
	focus: (n) => (n >= 5 ? ['vagina', 'bladder', 'rectum'] : ['uterus', 'tubes', 'ovaries']),
	steps: [
		{ title: 'Anatomia di partenza', text: "L'utero sta al centro del bacino, tra la vescica (davanti) e il retto (dietro); la cervice si apre in fondo alla vagina. Ai lati partono le tube, vicino alle ovaie.", keep: [], remove: [] },
		{ title: 'Accesso', text: "Oggi si opera quasi sempre in laparoscopia o con il robot, attraverso 3–5 piccole incisioni sull'addome; in alcuni casi per via vaginale. L'intervento dura in genere 1–3 ore.", keep: [], remove: [] },
		{ title: 'Tube', text: "Si sezionano legamenti e vasi dell'utero. Le tube vengono di solito rimosse insieme all'utero (salpingectomia).", keep: [], remove: ['tube'] },
		{ title: 'Ovaie: una scelta', text: "Le ovaie si possono conservare o rimuovere (ovariectomia). Se si rimuovono, gli ormoni dipendono solo dal testosterone assunto, da continuare per proteggere ossa e salute generale. È una decisione da prendere con chirurgo ed endocrinologo.", keep: [], remove: ['ovaie (se si sceglie)'] },
		{ title: "Asportazione dell'utero", text: "Utero e cervice vengono staccati dalla vagina e rimossi, spesso estraendoli proprio attraverso la vagina.", keep: [], remove: ['utero', 'cervice'] },
		{ title: 'Chiusura della cupola vaginale', text: "Il fondo della vagina viene suturato (cupola vaginale). Se è prevista una vaginectomia, a volte si fa nello stesso intervento.", keep: ['vagina'], remove: [] },
		{ title: "Dopo l'intervento", text: "Di solito una notte di ricovero o poco più. Per circa 6 settimane si evitano sforzi e rapporti con penetrazione vaginale, il tempo perché la cupola guarisca. Senza utero non ci sono più mestruazioni.", keep: [], remove: [] }
	],
	stateFor: (n) => {
		const s: Record<string, State> = {};
		removedAt(s, n, 'tubes', 2);
		removedAt(s, n, 'ovaries', 3);
		removedAt(s, n, 'uterus', 4);
		if (n === 5) s.vagina = 'a';
		return s;
	},
	labels: [
		{ text: 'utero', anchor: 'uterus', from: 0, to: 4 },
		{ text: 'tube', anchor: 'tubes', from: 2, to: 2, accent: true },
		{ text: 'ovaie', anchor: 'ovaries', from: 0, to: 3 },
		{ text: 'vescica', anchor: 'bladder', from: 0, to: 6 },
		{ text: 'retto', anchor: 'rectum', from: 0, to: 6 },
		{ text: 'cupola vaginale', anchor: 'vagina', from: 5, to: 6, accent: true }
	],
	legend: FEMALE_LEGEND,
	credits: `${MRI} ${VARY}`
};

const vaginectomia: Procedure3DConfig = {
	models: ['/anatomy/female-pelvis.glb'],
	parts: FEMALE,
	label: 'Modello 3D animato della vaginectomia',
	view: [1, -0.5, 0.15],
	distance: 2.6,
	focus: () => ['vagina', 'bladder', 'rectum'],
	steps: [
		{ title: 'Anatomia di partenza', text: "La vaginectomia si fa di solito dopo (o insieme a) un'isterectomia, per questo utero e ovaie qui non ci sono. La vagina sta tra la vescica e l'uretra (davanti) e il retto (dietro).", keep: [], remove: ['utero (isterectomia precedente)'] },
		{ title: 'Asportazione della mucosa', text: "Il rivestimento della vagina viene rimosso (colpectomia) oppure distrutto con il bisturi elettrico (ablazione). È un'area molto vascolarizzata: il sanguinamento è il rischio principale.", keep: [], remove: ['mucosa vaginale'] },
		{ title: 'Chiusura dello spazio', text: "Le pareti vengono avvicinate e lo spazio si chiude. Spesso, nello stesso intervento, si allunga l'uretra in vista di una metoidioplastica o di una falloplastica.", keep: [], remove: [] },
		{ title: "Dopo l'intervento", text: "Di solito qualche giorno di ricovero. Le lesioni a vescica, retto o uretra sono rare ma possibili. L'intervento è irreversibile: va deciso insieme al percorso genitale che si vuole fare.", keep: [], remove: [] }
	],
	stateFor: (n) => {
		const s: Record<string, State> = { uterus: 'h', tubes: 'h', ovaries: 'h' };
		removedAt(s, n, 'vagina', 1);
		return s;
	},
	labels: [
		{ text: 'vagina', anchor: 'vagina', from: 0, to: 1 },
		{ text: 'vescica', anchor: 'bladder', from: 0, to: 3 },
		{ text: 'retto', anchor: 'rectum', from: 0, to: 3 }
	],
	legend: FEMALE_LEGEND,
	credits: `${MRI} ${VARY}`
};

export const procedures3d: Record<string, Procedure3DConfig> = {
	orchiectomia,
	vulvoplastica,
	condrolaringoplastica,
	'femminilizzazione-voce': femminilizzazioneVoce,
	isterectomia,
	vaginectomia
};
