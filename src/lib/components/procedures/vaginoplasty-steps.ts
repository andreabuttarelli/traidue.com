// Steps of penile-inversion vaginoplasty shown by the 3D viewer (captions in Italian).
export interface Step {
	title: string;
	text: string;
	keep: string[];
	remove: string[];
}

export const vaginoplastySteps: Step[] = [
		{
			title: 'Anatomia di partenza',
			text: "Modello 3D del bacino maschile tagliato lungo la linea mediana. Davanti l'osso pubico, al centro vescica e prostata attraversate dall'uretra, dietro il retto. Il pene è formato dai due corpi cavernosi (sopra) e dal corpo spongioso che contiene l'uretra (sotto); lungo il dorso scorrono i vasi e i nervi che danno sensibilità al glande.",
			keep: [],
			remove: []
		},
		{
			title: 'Orchiectomia',
			text: "Attraverso un'incisione dello scroto o del perineo vengono rimossi entrambi i testicoli; i funicoli spermatici sono legati e sezionati all'altezza del canale inguinale. La pelle dello scroto viene conservata.",
			keep: ['pelle dello scroto'],
			remove: ['testicoli', 'epididimi', 'funicoli spermatici']
		},
		{
			title: 'Distacco della pelle del pene',
			text: 'La pelle del pene viene separata dall\'asta come un manicotto ("degloving"), restando attaccata alla base per mantenere l\'afflusso di sangue. Diventerà il rivestimento del canale.',
			keep: ['pelle del pene, con la sua irrorazione'],
			remove: []
		},
		{
			title: "Separazione dell'uretra",
			text: "L'uretra, con il corpo spongioso che la circonda, viene staccata dai corpi cavernosi per tutta la lunghezza dell'asta.",
			keep: ['uretra'],
			remove: []
		},
		{
			title: 'Fascio neurovascolare e glande',
			text: 'Dal dorso del pene si isola il fascio neurovascolare insieme a una piccola porzione del glande: è la parte che diventerà il clitoride e ne garantisce la sensibilità.',
			keep: ['fascio neurovascolare dorsale', 'porzione del glande'],
			remove: []
		},
		{
			title: 'Rimozione dei corpi cavernosi',
			text: "I corpi cavernosi, il tessuto erettile, vengono rimossi fino alla loro base vicino all'osso pubico. Se ne lascia il meno possibile, perché i residui potrebbero gonfiarsi con l'eccitazione.",
			keep: [],
			remove: ['corpi cavernosi']
		},
		{
			title: 'Creazione dello spazio neovaginale',
			text: 'Tra prostata e vescica (davanti) e retto (dietro) si apre uno spazio attraverso la fascia di Denonvilliers, fino in profondità nel bacino. È la fase più delicata: la complicanza più temuta è la lesione del retto.',
			keep: ['prostata, che non viene rimossa'],
			remove: []
		},
		{
			title: 'Inversione e inserimento',
			text: 'La pelle del pene, rovesciata come un guanto e chiusa in fondo, viene inserita nello spazio e fissata. Se la pelle non basta per la profondità si aggiunge un innesto di pelle dello scroto (in altre tecniche si usano peritoneo o intestino).',
			keep: ['pelle del pene, che diventa la parete del canale', 'innesto scrotale, se serve'],
			remove: []
		},
		{
			title: 'Uretra e clitoride',
			text: "L'uretra viene accorciata, aperta e cucita come nuovo sbocco (meato) sotto il clitoride. La porzione di glande, con il suo fascio, viene posizionata come clitoride. In molte tecniche la mucosa uretrale riveste anche il vestibolo.",
			keep: ['nuovo meato uretrale', 'clitoride'],
			remove: ['tratto di uretra in eccesso']
		},
		{
			title: 'Labbra, zaffo e catetere',
			text: 'Con la pelle dello scroto si modellano le grandi labbra, con la pelle del pene o del prepuzio le piccole labbra. Nel canale si lascia uno zaffo (o un tutore) e in vescica un catetere.',
			keep: ['grandi e piccole labbra'],
			remove: []
		},
		{
			title: "Dopo l'intervento",
			text: 'Dopo alcuni giorni a letto si rimuovono zaffo e catetere, di solito entro 5–8 giorni. Iniziano le dilatazioni con i tutori: due volte al giorno nei primi mesi, poi per tutta la vita secondo le indicazioni del chirurgo, per mantenere profondità e ampiezza del canale.',
			keep: [],
			remove: ['zaffo', 'catetere']
		}
	];
