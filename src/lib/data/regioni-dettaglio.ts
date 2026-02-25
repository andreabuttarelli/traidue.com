export interface CentroGender {
	nome: string;
	citta: string;
	indirizzo: string;
	telefono?: string;
	email?: string;
	sito?: string;
	note?: string;
}

export interface Associazione {
	nome: string;
	tipo: 'lgbtq' | 'genitori' | 'legale' | 'salute_mentale' | 'altro';
	citta: string;
	indirizzo?: string;
	telefono?: string;
	email?: string;
	sito?: string;
	descrizione: string;
}

export interface Sportello {
	nome: string;
	tipo: 'legale' | 'psicologico' | 'sociale' | 'antidiscriminazione';
	ente: string;
	citta: string;
	indirizzo?: string;
	telefono?: string;
	email?: string;
	sito?: string;
	orari?: string;
	note?: string;
}

export interface PassoIterSanitario {
	ordine: number;
	titolo: string;
	descrizione: string;
	ente?: string;
	tempiStimati?: string;
}

export interface EventoStoria {
	anno: number;
	titolo: string;
	descrizione: string;
}

export interface RegioneDettaglio {
	slug: string;
	nome: string;
	capoluogo: string;
	intro: string;
	metaDescription: string;
	centri_gender: CentroGender[];
	associazioni: Associazione[];
	sportelli: Sportello[];
	iter_sanitario: {
		intro: string;
		passi: PassoIterSanitario[];
		note_importanti: string[];
	};
	storia_queer: {
		intro: string;
		eventi: EventoStoria[];
	};
	faq: { domanda: string; risposta: string }[];
	articoli_correlati: string[];
	ultimoAggiornamento: string;
}

const dati: RegioneDettaglio[] = [
	{
		slug: 'lombardia',
		nome: 'Lombardia',
		capoluogo: 'Milano',
		intro: `La Lombardia, e Milano in particolare, rappresenta uno dei poli principali in Italia per i servizi dedicati alle persone transgender e non binarie. L'offerta sanitaria si concentra attorno a strutture ospedaliere di rilievo nazionale come l'Ospedale Niguarda e il Policlinico Ca' Granda, che offrono percorsi multidisciplinari di affermazione di genere. Il tessuto associativo milanese e lombardo è tra i più attivi del Paese, con organizzazioni storiche come ALA Milano e Arcigay Milano che forniscono supporto legale, psicologico e di socializzazione. La regione si distingue anche per il sistema sanitario gestito dalle ATS (Agenzie di Tutela della Salute), che sostituiscono le tradizionali ASL e rappresentano il primo punto di contatto per chi intraprende un percorso di transizione. Milano ha inoltre una storia significativa nel movimento per i diritti trans, dalla protesta della piscina Cozzi al primo Trans Pride italiano.`,
		metaDescription: 'Guida completa alle risorse trans in Lombardia: centri gender a Milano, associazioni, iter sanitario ATS e storia del movimento.',
		centri_gender: [
			{
				nome: 'CIG — Centro Identità di Genere, Ospedale Niguarda',
				citta: 'Milano',
				indirizzo: 'Piazza Ospedale Maggiore 3, 20162 Milano',
				telefono: '02 6444 2251',
				sito: 'https://www.ospedaleniguarda.it',
				note: 'Percorso multidisciplinare: endocrinologia, psicologia, chirurgia. Centro di riferimento nazionale.'
			},
			{
				nome: 'Ambulatorio Disforia di Genere — Policlinico Ca\' Granda',
				citta: 'Milano',
				indirizzo: 'Via Francesco Sforza 35, 20122 Milano',
				telefono: '02 5503 2745',
				sito: 'https://www.policlinico.mi.it',
				note: 'Endocrinologia e supporto psicologico. Collabora con il CIG del Niguarda per i percorsi chirurgici.'
			},
			{
				nome: 'Ambulatorio per la Varianza di Genere — ASST Spedali Civili',
				citta: 'Brescia',
				indirizzo: 'Piazzale Spedali Civili 1, 25123 Brescia',
				sito: 'https://www.asst-spedalicivili.it',
				note: 'Servizio di endocrinologia e supporto psicologico per le province di Brescia e Bergamo.'
			}
		],
		associazioni: [
			{
				nome: 'ALA Milano',
				tipo: 'lgbtq',
				citta: 'Milano',
				indirizzo: 'Via Bezzecca 3, 20135 Milano',
				sito: 'https://www.alamilano.org',
				descrizione: 'Associazione storica milanese attiva dal 1983. Offre sportello di ascolto, gruppi di auto-mutuo-aiuto e assistenza legale per persone trans.'
			},
			{
				nome: 'Arcigay Milano',
				tipo: 'lgbtq',
				citta: 'Milano',
				indirizzo: 'Via Bezzecca 3, 20135 Milano',
				sito: 'https://www.arcigaymilano.org',
				descrizione: 'Sezione milanese di Arcigay. Organizza eventi culturali, offre consulenza legale e supporto per persone LGBTQ+.'
			},
			{
				nome: 'AGEDO Lombardia',
				tipo: 'genitori',
				citta: 'Milano',
				sito: 'https://www.agedo.org',
				descrizione: 'Associazione di genitori, parenti e amici di persone LGBTQ+. Gruppi di sostegno per famiglie con figli trans.'
			},
			{
				nome: 'MIT — Movimento Identità Trans',
				tipo: 'lgbtq',
				citta: 'Milano',
				sito: 'https://www.mit-italia.it',
				descrizione: 'Organizzazione nazionale con sede operativa a Milano. Advocacy, sportello lavoro e supporto per persone trans migranti.'
			},
			{
				nome: 'Avvocatura per i diritti LGBTI — Rete Lenford',
				tipo: 'legale',
				citta: 'Milano',
				sito: 'https://www.retelenford.it',
				descrizione: 'Rete nazionale di avvocati specializzati in diritti LGBTQ+. Offre consulenze gratuite su rettificazione anagrafica e discriminazione.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans — Comune di Milano',
				tipo: 'sociale',
				ente: 'Comune di Milano',
				citta: 'Milano',
				indirizzo: 'Via Bezzecca 3, 20135 Milano',
				orari: 'Martedì e giovedì 15:00-18:00',
				note: 'Orientamento ai servizi, supporto per l\'accesso alla casa, al lavoro e alla sanità.'
			},
			{
				nome: 'Sportello Antidiscriminazione',
				tipo: 'antidiscriminazione',
				ente: 'UNAR / Comune di Milano',
				citta: 'Milano',
				telefono: '800 901 010',
				note: 'Numero verde nazionale contro le discriminazioni. Segnalazioni e assistenza legale gratuita.'
			}
		],
		iter_sanitario: {
			intro: 'In Lombardia il percorso di affermazione di genere passa attraverso le ATS (Agenzie di Tutela della Salute), che hanno sostituito le ASL. Il sistema è ben strutturato, con centri di riferimento riconosciuti a livello nazionale.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica presso un centro specializzato. Il medico di base può indirizzarti direttamente al CIG del Niguarda o al Policlinico.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con psicologo o psichiatra del centro gender per l\'inquadramento diagnostico. Non si tratta di un giudizio ma di un percorso di accompagnamento.',
					ente: 'CIG Niguarda / Policlinico Ca\' Granda',
					tempiStimati: '2-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'Dopo la valutazione, l\'endocrinologo prescrive la terapia ormonale sostitutiva. I controlli sono periodici (ogni 3-6 mesi).',
					ente: 'Endocrinologia — CIG Niguarda',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Puoi richiedere il cambio del nome e del genere sui documenti tramite il Tribunale. In molti casi non è più necessario l\'intervento chirurgico (sentenza Corte Costituzionale 221/2015).',
					ente: 'Tribunale Civile',
					tempiStimati: '6-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Se desiderato, il CIG del Niguarda offre chirurgia di affermazione di genere (mastectomia, vaginoplastica, falloplastica). Le liste d\'attesa possono essere lunghe.',
					ente: 'CIG Niguarda — Chirurgia Plastica',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'In Lombardia le ATS hanno sostituito le ASL: il funzionamento è simile ma la denominazione è diversa.',
				'Il CIG del Niguarda è il centro di riferimento regionale: accetta pazienti da tutta la Lombardia.',
				'La terapia ormonale è gratuita con il SSN tramite esenzione specifica.',
				'Per la rettificazione anagrafica non è obbligatorio l\'intervento chirurgico dal 2015.'
			]
		},
		storia_queer: {
			intro: 'Milano e la Lombardia hanno una storia lunga e significativa nel movimento per i diritti delle persone trans, con episodi che hanno segnato il dibattito nazionale.',
			eventi: [
				{
					anno: 1979,
					titolo: 'Primi collettivi trans a Milano',
					descrizione: 'Nascono i primi gruppi organizzati di persone trans a Milano, in connessione con il movimento femminista e i collettivi di liberazione omosessuale.'
				},
				{
					anno: 1982,
					titolo: 'Approvazione della Legge 164',
					descrizione: 'L\'Italia approva la legge 164/1982 che consente la rettificazione anagrafica del sesso. Milano diventa uno dei primi centri ad applicarla concretamente.'
				},
				{
					anno: 2002,
					titolo: 'Primo Trans Pride italiano',
					descrizione: 'Milano ospita il primo Trans Pride organizzato in Italia, evento che segna una maggiore visibilità del movimento trans nel Paese.'
				},
				{
					anno: 2019,
					titolo: 'Protesta della piscina Cozzi',
					descrizione: 'Una donna trans viene respinta dagli spogliatoi femminili della piscina comunale Cozzi. L\'episodio scatena un ampio dibattito nazionale su identità di genere e spazi pubblici.'
				},
				{
					anno: 2024,
					titolo: 'Alias universitari',
					descrizione: 'Le università lombarde (Politecnico, Statale, Bicocca) consolidano la pratica della carriera alias per studenti trans, un sistema che permette l\'uso del nome scelto nei documenti universitari.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Lombardia?',
				risposta: 'Il primo passo è chiedere al medico di base un\'impegnativa per il CIG dell\'Ospedale Niguarda o il Policlinico Ca\' Granda di Milano. Da lì si avvia un percorso multidisciplinare (psicologico, endocrinologico, eventualmente chirurgico) coperto dal SSN.'
			},
			{
				domanda: 'Qual è la differenza tra ATS e ASL in Lombardia?',
				risposta: 'Le ATS (Agenzie di Tutela della Salute) hanno sostituito le ASL in Lombardia dal 2016. Svolgono le stesse funzioni ma con una struttura organizzativa diversa. Per il percorso di transizione, ci si rivolge ai centri ospedalieri specializzati piuttosto che direttamente all\'ATS.'
			},
			{
				domanda: 'La terapia ormonale è gratuita in Lombardia?',
				risposta: 'Sì, la terapia ormonale sostitutiva per la disforia di genere è coperta dal Servizio Sanitario Nazionale. È necessaria la prescrizione di un endocrinologo del centro gender e l\'esenzione specifica.'
			},
			{
				domanda: 'Quanto tempo richiede il percorso di rettificazione anagrafica in Lombardia?',
				risposta: 'I tempi variano da 6 a 18 mesi, a seconda del Tribunale competente. Dal 2015 non è più obbligatorio sottoporsi a intervento chirurgico per ottenere la rettificazione.'
			},
			{
				domanda: 'Esistono gruppi di supporto per famiglie di persone trans in Lombardia?',
				risposta: 'Sì, AGEDO Lombardia organizza gruppi di sostegno per genitori e familiari. ALA Milano offre anche gruppi di auto-mutuo-aiuto aperti a famiglie e partner.'
			},
			{
				domanda: 'Ci sono servizi per persone trans migranti in Lombardia?',
				risposta: 'Il MIT (Movimento Identità Trans) ha una sede operativa a Milano e offre supporto specifico per persone trans migranti, incluso accompagnamento legale e orientamento ai servizi sanitari.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans',
			'protesta-piscina-milano'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'lazio',
		nome: 'Lazio',
		capoluogo: 'Roma',
		intro: `Il Lazio e Roma sono al centro della vita politica e culturale italiana, e questo si riflette anche nei servizi e nella storia dei diritti delle persone transgender. Roma ospita il SAIFIP, il servizio dell'Ospedale Umberto I che dal 1992 rappresenta un punto di riferimento nazionale per i percorsi di affermazione di genere. L'associazionismo romano è vivace e radicato: il Circolo di Cultura Omosessuale Mario Mieli, fondato nel 1983, è una delle realtà LGBTQ+ più grandi d'Italia e offre servizi specifici per persone trans. Il Lazio ha un significato simbolico particolare per il movimento trans italiano: è qui che nel 1982 fu approvata la legge 164 che consente la rettificazione anagrafica, e Roma è stata la città di Marcella Di Folco, prima donna trans eletta in un consiglio comunale italiano. Il Roma Pride è uno degli eventi più partecipati d'Italia.`,
		metaDescription: 'Guida completa alle risorse trans nel Lazio: SAIFIP Umberto I, associazioni a Roma, iter ASL e storia del movimento trans.',
		centri_gender: [
			{
				nome: 'SAIFIP — Servizio Adeguamento tra Identità Fisica e Identità Psichica',
				citta: 'Roma',
				indirizzo: 'Policlinico Umberto I, Viale del Policlinico 155, 00161 Roma',
				telefono: '06 4997 2684',
				sito: 'https://www.policlinicoumberto1.it',
				note: 'Centro di riferimento nazionale attivo dal 1992. Percorso completo: psicologia, endocrinologia, chirurgia.'
			},
			{
				nome: 'Ambulatorio Disforia di Genere — Ospedale San Camillo-Forlanini',
				citta: 'Roma',
				indirizzo: 'Piazza Carlo Forlanini 1, 00151 Roma',
				telefono: '06 5870 1',
				sito: 'https://www.aosancamillo.it',
				note: 'Servizio di endocrinologia e supporto psicologico. Collabora con il SAIFIP per i percorsi chirurgici.'
			}
		],
		associazioni: [
			{
				nome: 'Circolo di Cultura Omosessuale Mario Mieli',
				tipo: 'lgbtq',
				citta: 'Roma',
				indirizzo: 'Via Efeso 2, 00154 Roma',
				telefono: '06 541 3985',
				sito: 'https://www.mariomieli.net',
				descrizione: 'Una delle più grandi realtà LGBTQ+ italiane, fondata nel 1983. Offre sportello trans, consulenza legale, gruppi di socializzazione e supporto per persone trans migranti.'
			},
			{
				nome: 'Arcigay Roma',
				tipo: 'lgbtq',
				citta: 'Roma',
				sito: 'https://www.arcigayroma.it',
				descrizione: 'Sezione romana di Arcigay. Organizza eventi, offre consulenza e promuove campagne per i diritti LGBTQ+.'
			},
			{
				nome: 'AGEDO Lazio',
				tipo: 'genitori',
				citta: 'Roma',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ nella regione Lazio. Incontri mensili a Roma.'
			},
			{
				nome: 'Libellula',
				tipo: 'lgbtq',
				citta: 'Roma',
				descrizione: 'Associazione dedicata specificamente alle persone trans e non binarie a Roma. Offre gruppi di auto-mutuo-aiuto e accompagnamento ai servizi.'
			},
			{
				nome: 'Rete Lenford — sezione Lazio',
				tipo: 'legale',
				citta: 'Roma',
				sito: 'https://www.retelenford.it',
				descrizione: 'Avvocati specializzati in diritti LGBTQ+. Consulenza gratuita su rettificazione anagrafica, discriminazione e diritto di famiglia.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans Mario Mieli',
				tipo: 'psicologico',
				ente: 'Circolo Mario Mieli',
				citta: 'Roma',
				indirizzo: 'Via Efeso 2, 00154 Roma',
				orari: 'Mercoledì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, gruppi di sostegno.'
			},
			{
				nome: 'Sportello Antidiscriminazione — Roma Capitale',
				tipo: 'antidiscriminazione',
				ente: 'Roma Capitale',
				citta: 'Roma',
				telefono: '06 6710 7520',
				note: 'Segnalazione discriminazioni basate su identità di genere e orientamento sessuale.'
			}
		],
		iter_sanitario: {
			intro: 'Nel Lazio il percorso di affermazione di genere fa riferimento al sistema delle ASL e ai centri ospedalieri specializzati. Il SAIFIP dell\'Umberto I è il principale punto di riferimento regionale e nazionale.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base o la ASL',
					descrizione: 'Richiedi un\'impegnativa per una visita presso il SAIFIP del Policlinico Umberto I. In alternativa, puoi contattare direttamente il servizio per informazioni sulla prenotazione.',
					ente: 'Medico di Medicina Generale / ASL Roma',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione al SAIFIP',
					descrizione: 'Il percorso prevede colloqui psicologici e psichiatrici per un inquadramento diagnostico. Il SAIFIP adotta un approccio multidisciplinare con attenzione alla persona.',
					ente: 'SAIFIP — Policlinico Umberto I',
					tempiStimati: '3-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo del SAIFIP o del San Camillo-Forlanini prescrive la terapia ormonale sostitutiva, con controlli periodici.',
					ente: 'SAIFIP / San Camillo-Forlanini',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere sui documenti si richiede al Tribunale Civile di Roma. Il SAIFIP fornisce la documentazione clinica necessaria.',
					ente: 'Tribunale Civile di Roma',
					tempiStimati: '6-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Il SAIFIP offre chirurgia di affermazione di genere direttamente presso il Policlinico Umberto I. Le liste d\'attesa possono essere significative.',
					ente: 'SAIFIP — Policlinico Umberto I',
					tempiStimati: '1-2 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Il SAIFIP è attivo dal 1992 ed è uno dei centri con più esperienza in Italia.',
				'L\'accesso ai servizi è gratuito tramite SSN con impegnativa del medico di base.',
				'È possibile rivolgersi anche al San Camillo-Forlanini per la parte endocrinologica.',
				'Le associazioni come il Mario Mieli possono aiutare nell\'orientamento ai servizi.'
			]
		},
		storia_queer: {
			intro: 'Roma e il Lazio hanno avuto un ruolo centrale nella storia dei diritti trans in Italia, ospitando momenti legislativi cruciali e figure iconiche del movimento.',
			eventi: [
				{
					anno: 1980,
					titolo: 'Primi movimenti trans organizzati a Roma',
					descrizione: 'Nascono i primi collettivi trans nella capitale, spesso in connessione con i movimenti femministi e di liberazione sessuale.'
				},
				{
					anno: 1982,
					titolo: 'Approvazione della Legge 164/1982',
					descrizione: 'Il Parlamento italiano, con sede a Roma, approva la legge che consente la rettificazione anagrafica del sesso. L\'Italia è tra i primi Paesi europei a dotarsi di una normativa specifica.'
				},
				{
					anno: 1983,
					titolo: 'Fondazione del Circolo Mario Mieli',
					descrizione: 'Nasce a Roma il Circolo di Cultura Omosessuale Mario Mieli, che diventerà un punto di riferimento per l\'intera comunità LGBTQ+ italiana.'
				},
				{
					anno: 1995,
					titolo: 'Marcella Di Folco eletta consigliera comunale',
					descrizione: 'Marcella Di Folco viene eletta nel consiglio comunale di Bologna, ma la sua attività politica e il suo impatto culturale segnano profondamente anche la scena romana dove ha vissuto e lavorato.'
				},
				{
					anno: 2000,
					titolo: 'Primo World Pride a Roma',
					descrizione: 'Roma ospita il primo World Pride in una città a maggioranza cattolica, con una forte partecipazione della comunità trans e un impatto mediatico internazionale.'
				},
				{
					anno: 2015,
					titolo: 'Sentenza Corte Costituzionale 221/2015',
					descrizione: 'La Corte Costituzionale stabilisce che non è necessario l\'intervento chirurgico per la rettificazione anagrafica, una sentenza storica pronunciata a Roma.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al SAIFIP dell\'Umberto I?',
				risposta: 'Serve un\'impegnativa del medico di base per una visita psicologica o endocrinologica. Puoi anche contattare direttamente il SAIFIP per informazioni sulla prenotazione al numero 06 4997 2684.'
			},
			{
				domanda: 'Quanto costa il percorso di transizione nel Lazio?',
				risposta: 'Il percorso presso il SAIFIP e i centri pubblici è coperto dal Servizio Sanitario Nazionale. Si paga solo il ticket per le visite specialistiche, con possibilità di esenzione.'
			},
			{
				domanda: 'Ci sono tempi di attesa lunghi al SAIFIP?',
				risposta: 'I tempi di attesa per il primo appuntamento possono variare da 2 a 6 mesi. Per la chirurgia le liste sono più lunghe (1-2 anni). Le associazioni locali possono aiutare a orientarsi.'
			},
			{
				domanda: 'Esistono servizi per persone trans minori nel Lazio?',
				risposta: 'Il SAIFIP può accogliere anche adolescenti, con il coinvolgimento dei genitori. Il percorso per i minori prevede un approccio cauto e graduale, a partire dal supporto psicologico.'
			},
			{
				domanda: 'Dove trovare supporto legale per la rettificazione anagrafica a Roma?',
				risposta: 'La Rete Lenford offre consulenze gratuite con avvocati specializzati. Anche il Circolo Mario Mieli ha uno sportello legale dedicato alle persone trans.'
			},
			{
				domanda: 'Il Roma Pride include la comunità trans?',
				risposta: 'Sì, il Roma Pride è uno degli eventi LGBTQ+ più inclusivi d\'Italia. La comunità trans ha sempre avuto un ruolo centrale nell\'organizzazione e nella partecipazione.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'cambio-documenti-trans',
			'marcella-di-folco',
			'situazione-trans-italia',
			'condizione-trans-prima-1982'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'campania',
		nome: 'Campania',
		capoluogo: 'Napoli',
		intro: `La Campania ha una relazione antica e complessa con le identità di genere non conformi, radicata nella tradizione culturale partenopea dei femminielli, figure che rappresentano una delle più antiche espressioni di varianza di genere in Europa. Oggi Napoli è il principale centro di servizi per le persone trans nella regione, con l'AOU Federico II che offre percorsi di affermazione di genere e l'ASL Napoli 1 Centro come punto di riferimento territoriale. L'associazionismo campano è attivo e combattivo, con realtà come Arcigay Napoli e l'ATN (Associazione Transessuale Napoli) che forniscono supporto concreto in un contesto sociale che presenta sfide specifiche. I tempi dei percorsi sanitari in Campania tendono a essere più lunghi rispetto al Nord Italia, ma la rete di supporto sta crescendo e le risorse si stanno consolidando.`,
		metaDescription: 'Guida completa alle risorse trans in Campania: centri gender a Napoli, associazioni, iter sanitario ASL e tradizione dei femminielli.',
		centri_gender: [
			{
				nome: 'Ambulatorio Disforia di Genere — AOU Federico II',
				citta: 'Napoli',
				indirizzo: 'Via Sergio Pansini 5, 80131 Napoli',
				telefono: '081 746 2108',
				sito: 'https://www.policlinico.unina.it',
				note: 'Centro di riferimento regionale. Percorso endocrinologico e psicologico. Collabora con il dipartimento di chirurgia plastica per gli interventi.'
			},
			{
				nome: 'Ambulatorio di Endocrinologia — ASL Napoli 1 Centro',
				citta: 'Napoli',
				indirizzo: 'Via Comunale del Principe 13a, 80145 Napoli',
				sito: 'https://www.aslnapoli1centro.it',
				note: 'Servizio endocrinologico territoriale. Primo punto di contatto per la terapia ormonale nella città di Napoli.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Napoli — Antinoo',
				tipo: 'lgbtq',
				citta: 'Napoli',
				indirizzo: 'Vico San Geronimo 17, 80138 Napoli',
				sito: 'https://www.arcigaynapoli.org',
				descrizione: 'Sezione napoletana di Arcigay. Offre sportello di ascolto, consulenza legale e organizza eventi culturali e di advocacy.'
			},
			{
				nome: 'ATN — Associazione Transessuale Napoli',
				tipo: 'lgbtq',
				citta: 'Napoli',
				descrizione: 'Associazione dedicata specificamente alle persone trans. Offre accompagnamento ai servizi sanitari, supporto tra pari e advocacy per i diritti.'
			},
			{
				nome: 'AGEDO Campania',
				tipo: 'genitori',
				citta: 'Napoli',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ in Campania. Incontri mensili e supporto telefonico.'
			},
			{
				nome: 'Le Maree',
				tipo: 'lgbtq',
				citta: 'Napoli',
				descrizione: 'Collettivo transfemminista napoletano. Organizza eventi culturali, laboratori e iniziative di sensibilizzazione sulle tematiche trans e non binarie.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans — Arcigay Napoli',
				tipo: 'psicologico',
				ente: 'Arcigay Napoli',
				citta: 'Napoli',
				indirizzo: 'Vico San Geronimo 17, 80138 Napoli',
				orari: 'Lunedì 16:00-18:00',
				note: 'Ascolto, orientamento ai servizi e gruppi di auto-mutuo-aiuto per persone trans.'
			},
			{
				nome: 'Sportello Legale LGBTQ+',
				tipo: 'legale',
				ente: 'Arcigay Napoli',
				citta: 'Napoli',
				orari: 'Su appuntamento',
				note: 'Consulenza legale gratuita su rettificazione anagrafica, discriminazione e diritto del lavoro.'
			}
		],
		iter_sanitario: {
			intro: 'In Campania il percorso di affermazione di genere fa riferimento al sistema delle ASL e all\'AOU Federico II di Napoli come centro specializzato. I tempi possono essere più lunghi rispetto ad altre regioni, ma i servizi sono in crescita.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica presso l\'AOU Federico II. Il medico di base può anche indirizzarti ai servizi territoriali della ASL Napoli 1.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-4 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui di valutazione presso il servizio di psicologia dell\'AOU Federico II. Il percorso è orientato all\'accompagnamento e alla comprensione dell\'identità di genere.',
					ente: 'AOU Federico II — Psicologia',
					tempiStimati: '3-8 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo dell\'AOU Federico II o della ASL Napoli 1 prescrive la terapia ormonale sostitutiva. I controlli sono periodici.',
					ente: 'AOU Federico II / ASL Napoli 1',
					tempiStimati: '2-4 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile di Napoli. I tempi della giustizia campana possono essere più lunghi della media nazionale.',
					ente: 'Tribunale Civile di Napoli',
					tempiStimati: '12-24 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'L\'AOU Federico II offre alcuni interventi di chirurgia di affermazione di genere. Per interventi più complessi potrebbe essere necessario rivolgersi a centri fuori regione (Niguarda, SAIFIP).',
					ente: 'AOU Federico II — Chirurgia Plastica',
					tempiStimati: '2-4 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'I tempi di attesa in Campania sono mediamente più lunghi rispetto a Lombardia e Lazio.',
				'Le associazioni locali (ATN, Arcigay Napoli) possono aiutare a navigare il sistema sanitario.',
				'Per la chirurgia, molte persone campane si rivolgono a centri del Centro-Nord (Niguarda, SAIFIP).',
				'La terapia ormonale è coperta dal SSN anche in Campania tramite esenzione specifica.',
				'Per la rettificazione anagrafica, avere un avvocato specializzato può accelerare significativamente i tempi.'
			]
		},
		storia_queer: {
			intro: 'Napoli e la Campania hanno una tradizione secolare di varianza di genere, incarnata nella figura dei femminielli, riconosciuta e integrata nella cultura popolare partenopea.',
			eventi: [
				{
					anno: 1600,
					titolo: 'Tradizione dei femminielli',
					descrizione: 'I femminielli sono una figura della tradizione culturale napoletana: persone assegnate maschio alla nascita che vivono come donne. Documentati almeno dal Seicento, sono integrati nella cultura popolare e nelle pratiche rituali (come la tombola e la candelora).'
				},
				{
					anno: 1979,
					titolo: 'Primi movimenti organizzati a Napoli',
					descrizione: 'Nascono i primi collettivi LGBTQ+ napoletani, con una forte partecipazione di persone trans che portano la tradizione dei femminielli nel dibattito contemporaneo sui diritti.'
				},
				{
					anno: 1982,
					titolo: 'Impatto della Legge 164 in Campania',
					descrizione: 'L\'approvazione della legge 164/1982 ha un impatto significativo in Campania, dove molte persone trans vivevano in una condizione di limbo giuridico pur essendo culturalmente riconosciute.'
				},
				{
					anno: 2000,
					titolo: 'Fondazione dell\'ATN',
					descrizione: 'Nasce l\'Associazione Transessuale Napoli, che diventa un punto di riferimento per le persone trans campane, offrendo supporto pratico e portando avanti battaglie per i diritti.'
				},
				{
					anno: 2016,
					titolo: 'Napoli Pride e visibilità trans',
					descrizione: 'Il Napoli Pride cresce significativamente in partecipazione, con una forte componente trans. L\'evento contribuisce a rendere visibili le istanze della comunità trans campana.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede ai servizi trans in Campania?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per l\'AOU Federico II di Napoli. Le associazioni come Arcigay Napoli e l\'ATN possono aiutare nell\'orientamento ai servizi.'
			},
			{
				domanda: 'I tempi di attesa in Campania sono più lunghi?',
				risposta: 'Sì, i tempi di attesa per visite specialistiche e chirurgia tendono a essere più lunghi rispetto a Lombardia e Lazio. Per la chirurgia, molte persone scelgono di rivolgersi a centri fuori regione.'
			},
			{
				domanda: 'Chi sono i femminielli napoletani?',
				risposta: 'I femminielli sono una figura della tradizione culturale partenopea: persone assegnate maschio alla nascita che vivono come donne. Sono documentati almeno dal Seicento e rappresentano una delle più antiche espressioni di varianza di genere in Europa.'
			},
			{
				domanda: 'Ci sono servizi trans anche fuori Napoli in Campania?',
				risposta: 'I servizi specializzati sono concentrati a Napoli. Per le province (Salerno, Caserta, Avellino, Benevento) è necessario spostarsi nel capoluogo per i centri gender, ma il medico di base locale può avviare il percorso.'
			},
			{
				domanda: 'È possibile fare la chirurgia di affermazione di genere in Campania?',
				risposta: 'L\'AOU Federico II offre alcuni interventi, ma per procedure più complesse molte persone si rivolgono al CIG del Niguarda (Milano) o al SAIFIP (Roma). I costi sono coperti dal SSN anche fuori regione con autorizzazione.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans a Napoli?',
				risposta: 'Sì, Arcigay Napoli offre uno sportello trans con gruppi di auto-mutuo-aiuto. L\'ATN organizza incontri di supporto tra pari e l\'AGEDO Campania accoglie famiglie di persone LGBTQ+.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'situazione-trans-italia',
			'persone-trans-nella-storia',
			'trans-e-sanita'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'piemonte',
		nome: 'Piemonte',
		capoluogo: 'Torino',
		intro: `Il Piemonte e Torino in particolare rappresentano una realtà di primo piano per le persone transgender in Italia. La città sabauda vanta una lunga tradizione di apertura e impegno sui diritti civili, e questo si riflette nella qualità dei servizi disponibili. Il Centro di Riferimento per la Disforia di Genere presso la Città della Salute e della Scienza (Molinette) è uno dei principali poli nazionali, offrendo un percorso multidisciplinare completo che comprende supporto psicologico, endocrinologico e chirurgico. L\'associazionismo torinese è tra i più strutturati d\'Italia, con realtà come il Circolo Maurice e Arcigay Torino che offrono servizi concreti di supporto, consulenza e socializzazione. Il Piemonte si distingue anche per le politiche comunali di inclusione: Torino è stata tra le prime città italiane a istituire il registro delle unioni civili e a promuovere attivamente politiche contro la discriminazione basata sull\'identità di genere. La regione offre inoltre un contesto universitario particolarmente sensibile, con l\'Università di Torino che ha introdotto la carriera alias fin dai primi anni.`,
		metaDescription: 'Guida alle risorse trans in Piemonte: centro gender alle Molinette di Torino, associazioni, iter sanitario ASL e storia del movimento.',
		centri_gender: [
			{
				nome: 'Centro Disforia di Genere — Città della Salute e della Scienza (Molinette)',
				citta: 'Torino',
				indirizzo: 'Corso Bramante 88, 10126 Torino',
				telefono: '011 633 5610',
				sito: 'https://www.cittadellasalute.to.it',
				note: 'Centro di riferimento regionale per i percorsi di affermazione di genere. Equipe multidisciplinare: psicologia, endocrinologia, chirurgia plastica.'
			},
			{
				nome: 'Ambulatorio di Endocrinologia — AOU San Luigi Gonzaga',
				citta: 'Orbassano',
				indirizzo: 'Regione Gonzole 10, 10043 Orbassano (TO)',
				telefono: '011 902 6333',
				sito: 'https://www.sanluigi.piemonte.it',
				note: 'Servizio di endocrinologia che collabora con il centro delle Molinette per la gestione della terapia ormonale.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Torino — Ottavio Mai',
				tipo: 'lgbtq',
				citta: 'Torino',
				indirizzo: 'Via Bernardino Lanino 3/a, 10152 Torino',
				sito: 'https://www.arcigaytorino.it',
				descrizione: 'Sezione torinese di Arcigay. Offre sportello di ascolto, consulenza legale, gruppi di socializzazione e attività culturali per la comunità LGBTQ+.'
			},
			{
				nome: 'Circolo Maurice LGBTI',
				tipo: 'lgbtq',
				citta: 'Torino',
				indirizzo: 'Via Bernardino Lanino 3/a, 10152 Torino',
				sito: 'https://www.mauriceglbtq.org',
				descrizione: 'Associazione storica torinese fondata nel 1985. Organizza eventi culturali, offre sportello di ascolto e promuove iniziative per i diritti delle persone trans.'
			},
			{
				nome: 'AGEDO Piemonte',
				tipo: 'genitori',
				citta: 'Torino',
				sito: 'https://www.agedo.org',
				descrizione: 'Associazione di genitori, parenti e amici di persone LGBTQ+. Gruppi di sostegno mensili per famiglie con figli trans nella regione Piemonte.'
			},
			{
				nome: 'Rete Lenford — referenti Piemonte',
				tipo: 'legale',
				citta: 'Torino',
				sito: 'https://www.retelenford.it',
				descrizione: 'Rete nazionale di avvocati specializzati in diritti LGBTQ+. Consulenze gratuite su rettificazione anagrafica, discriminazione e diritto del lavoro a Torino.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans — Circolo Maurice',
				tipo: 'psicologico',
				ente: 'Circolo Maurice LGBTI',
				citta: 'Torino',
				indirizzo: 'Via Bernardino Lanino 3/a, 10152 Torino',
				orari: 'Mercoledì 18:00-20:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, gruppi di supporto tra pari per persone trans e non binarie.'
			},
			{
				nome: 'Sportello Antidiscriminazione — Città di Torino',
				tipo: 'antidiscriminazione',
				ente: 'Comune di Torino',
				citta: 'Torino',
				telefono: '011 011 24444',
				note: 'Servizio comunale per la segnalazione e la gestione di episodi di discriminazione basata su identità di genere e orientamento sessuale.'
			}
		],
		iter_sanitario: {
			intro: 'In Piemonte il percorso di affermazione di genere fa riferimento al sistema delle ASL regionali e al centro specializzato della Città della Salute e della Scienza di Torino (Molinette). Il sistema è ben organizzato e il centro torinese è tra i più riconosciuti a livello nazionale.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita psicologica o endocrinologica presso il Centro Disforia di Genere delle Molinette. Il medico di base della tua ASL può indirizzarti direttamente.',
					ente: 'Medico di Medicina Generale / ASL Piemonte',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con l\'equipe psicologica del centro gender delle Molinette per l\'inquadramento e l\'accompagnamento. L\'approccio è centrato sulla persona e non giudicante.',
					ente: 'Città della Salute — Molinette',
					tempiStimati: '2-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo del centro prescrive la terapia ormonale sostitutiva con controlli periodici ogni 3-6 mesi. Anche l\'AOU San Luigi Gonzaga di Orbassano collabora nella gestione ormonale.',
					ente: 'Molinette / AOU San Luigi Gonzaga',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere sui documenti si richiede al Tribunale Civile di Torino. L\'equipe del centro fornisce la documentazione clinica necessaria per la procedura.',
					ente: 'Tribunale Civile di Torino',
					tempiStimati: '6-14 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Le Molinette offrono interventi di chirurgia di affermazione di genere (mastectomia, vaginoplastica). Per alcune procedure potrebbe essere necessario rivolgersi ad altri centri nazionali.',
					ente: 'Città della Salute — Chirurgia Plastica',
					tempiStimati: '1-2 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Il centro delle Molinette è tra i più esperti in Italia e accoglie pazienti da tutto il Piemonte.',
				'La terapia ormonale è coperta dal SSN con esenzione specifica anche in Piemonte.',
				'Il Comune di Torino ha politiche attive di inclusione per le persone trans.',
				'Le associazioni come il Circolo Maurice possono aiutare nell\'orientamento ai servizi.'
			]
		},
		storia_queer: {
			intro: 'Torino e il Piemonte hanno una tradizione significativa di attivismo per i diritti civili e LGBTQ+, con episodi che hanno anticipato e influenzato il dibattito nazionale.',
			eventi: [
				{
					anno: 1978,
					titolo: 'Primi collettivi LGBTQ+ a Torino',
					descrizione: 'Nascono i primi gruppi organizzati per i diritti delle persone omosessuali e trans a Torino, in un contesto di forte fermento politico e sociale.'
				},
				{
					anno: 1985,
					titolo: 'Fondazione del Circolo Maurice',
					descrizione: 'Nasce a Torino il Circolo Maurice, una delle associazioni LGBTQ+ più longeve e attive d\'Italia, che include fin dall\'inizio un\'attenzione specifica per le persone trans.'
				},
				{
					anno: 2001,
					titolo: 'Torino Pride',
					descrizione: 'Torino ospita un Pride particolarmente partecipato, con una forte componente trans che contribuisce a rendere visibili le istanze della comunità nella città sabauda.'
				},
				{
					anno: 2014,
					titolo: 'Registro unioni civili',
					descrizione: 'Torino è tra le prime grandi città italiane a istituire un registro delle unioni civili, segnando un passo importante per il riconoscimento delle coppie dello stesso sesso e delle persone trans.'
				},
				{
					anno: 2023,
					titolo: 'Carriera alias nelle scuole piemontesi',
					descrizione: 'Cresce il numero di scuole superiori e università piemontesi che adottano la carriera alias per studenti trans, favorendo un ambiente scolastico più inclusivo.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Piemonte?',
				risposta: 'Il primo passo è chiedere al medico di base un\'impegnativa per il Centro Disforia di Genere delle Molinette a Torino. Da lì si avvia un percorso multidisciplinare coperto dal SSN.'
			},
			{
				domanda: 'Il centro delle Molinette accetta pazienti da fuori Torino?',
				risposta: 'Sì, il centro è di riferimento regionale e accoglie pazienti da tutte le province del Piemonte. È sufficiente un\'impegnativa del medico di base della propria ASL.'
			},
			{
				domanda: 'La terapia ormonale è gratuita in Piemonte?',
				risposta: 'Sì, la terapia ormonale sostitutiva per la disforia di genere è coperta dal Servizio Sanitario Nazionale con esenzione specifica. Serve la prescrizione dell\'endocrinologo del centro gender.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans a Torino?',
				risposta: 'Sì, il Circolo Maurice organizza gruppi di auto-mutuo-aiuto e sportelli di ascolto per persone trans. Anche Arcigay Torino offre servizi di supporto e socializzazione.'
			},
			{
				domanda: 'Quanto tempo richiede la rettificazione anagrafica in Piemonte?',
				risposta: 'I tempi al Tribunale di Torino variano da 6 a 14 mesi. Dal 2015 non è obbligatorio l\'intervento chirurgico. Un avvocato specializzato della Rete Lenford può assistere nella procedura.'
			},
			{
				domanda: 'Le scuole piemontesi offrono la carriera alias?',
				risposta: 'Sempre più scuole superiori e università piemontesi adottano la carriera alias, che permette agli studenti trans di utilizzare il nome scelto nei documenti scolastici. L\'Università di Torino è stata tra le prime ad attivarla.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans',
			'situazione-trans-italia'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'liguria',
		nome: 'Liguria',
		capoluogo: 'Genova',
		intro: `La Liguria, con il suo capoluogo Genova, offre un tessuto di servizi per le persone transgender che si concentra principalmente nel capoluogo regionale. L\'Ospedale Policlinico San Martino di Genova è il punto di riferimento per i percorsi di affermazione di genere nella regione, con un ambulatorio dedicato che fornisce supporto endocrinologico e psicologico. La città di Genova ha una tradizione di apertura e accoglienza legata alla sua storia portuale e cosmopolita, e questo si riflette in un associazionismo LGBTQ+ attivo e presente, guidato da Arcigay Genova e dal Coordinamento Liguria Rainbow. Nonostante le dimensioni relativamente contenute della regione, i servizi sono accessibili e il percorso sanitario è strutturato in modo chiaro attraverso le ASL liguri. Le province di Savona, La Spezia e Imperia fanno riferimento ai servizi genovesi per i percorsi specializzati, ma i medici di base locali possono avviare l\'iter e fornire le impegnative necessarie. La comunità trans ligure, pur essendo numericamente piccola, è coesa e supportata da una rete associativa solidale.`,
		metaDescription: 'Guida alle risorse trans in Liguria: centro gender al San Martino di Genova, associazioni, iter ASL e storia del movimento.',
		centri_gender: [
			{
				nome: 'Ambulatorio Disforia di Genere — IRCCS Ospedale Policlinico San Martino',
				citta: 'Genova',
				indirizzo: 'Largo Rosanna Benzi 10, 16132 Genova',
				telefono: '010 555 1',
				sito: 'https://www.ospedalesanmartino.it',
				note: 'Centro di riferimento regionale. Offre percorso endocrinologico e psicologico. Per la chirurgia collabora con centri nazionali.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Genova — Approdo',
				tipo: 'lgbtq',
				citta: 'Genova',
				indirizzo: 'Via della Maddalena 1/7, 16124 Genova',
				sito: 'https://www.arcigaygenova.it',
				descrizione: 'Sezione genovese di Arcigay. Offre sportello di ascolto, consulenza legale, eventi culturali e gruppi di supporto per persone LGBTQ+.'
			},
			{
				nome: 'Coordinamento Liguria Rainbow',
				tipo: 'lgbtq',
				citta: 'Genova',
				sito: 'https://www.liguriarainbow.it',
				descrizione: 'Coordinamento regionale delle associazioni LGBTQ+ liguri. Promuove iniziative congiunte, eventi e campagne di sensibilizzazione sui diritti trans.'
			},
			{
				nome: 'AGEDO Liguria',
				tipo: 'genitori',
				citta: 'Genova',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ in Liguria. Incontri periodici a Genova e supporto telefonico.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Genova',
				tipo: 'psicologico',
				ente: 'Arcigay Genova',
				citta: 'Genova',
				indirizzo: 'Via della Maddalena 1/7, 16124 Genova',
				orari: 'Giovedì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi e supporto per persone trans. Possibilità di colloqui individuali su appuntamento.'
			},
			{
				nome: 'Sportello Antidiscriminazione — Comune di Genova',
				tipo: 'antidiscriminazione',
				ente: 'Comune di Genova',
				citta: 'Genova',
				telefono: '010 557 2000',
				note: 'Segnalazione di episodi di discriminazione basata su identità di genere. Orientamento ai servizi di tutela legale.'
			}
		],
		iter_sanitario: {
			intro: 'In Liguria il percorso di affermazione di genere passa attraverso le ASL regionali e il Policlinico San Martino di Genova come centro specializzato. Il sistema è accessibile e il percorso è ben definito, anche se le risorse sono concentrate nel capoluogo.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica presso il Policlinico San Martino di Genova. Il medico di base della tua ASL (ASL 1 Imperiese, ASL 2 Savonese, ASL 3 Genovese, ASL 4 Chiavarese, ASL 5 Spezzina) può indirizzarti.',
					ente: 'Medico di Medicina Generale / ASL Liguria',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con lo psicologo o psichiatra del Policlinico San Martino per l\'inquadramento e l\'accompagnamento nel percorso di affermazione di genere.',
					ente: 'IRCCS Policlinico San Martino',
					tempiStimati: '2-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo del San Martino prescrive la terapia ormonale sostitutiva con monitoraggio periodico dei livelli ormonali e dello stato di salute generale.',
					ente: 'IRCCS Policlinico San Martino — Endocrinologia',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta di cambio nome e genere si presenta al Tribunale Civile di Genova (o del capoluogo della provincia di residenza). Il centro fornisce la documentazione clinica.',
					ente: 'Tribunale Civile di Genova',
					tempiStimati: '6-16 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per gli interventi di chirurgia di affermazione di genere, la Liguria fa generalmente riferimento a centri nazionali specializzati come il CIG del Niguarda (Milano) o il SAIFIP (Roma), con copertura SSN tramite autorizzazione.',
					ente: 'Centri nazionali di riferimento',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'I servizi specializzati sono concentrati a Genova, ma l\'impegnativa può essere rilasciata da qualsiasi medico di base ligure.',
				'La terapia ormonale è coperta dal SSN con esenzione specifica anche in Liguria.',
				'Per la chirurgia è generalmente necessario rivolgersi a centri fuori regione (Milano o Roma).',
				'Le associazioni locali come Arcigay Genova possono aiutare nell\'orientamento ai servizi.'
			]
		},
		storia_queer: {
			intro: 'Genova e la Liguria hanno una storia significativa di apertura culturale, legata alla tradizione portuale e cosmopolita della città, che ha favorito anche il movimento per i diritti LGBTQ+.',
			eventi: [
				{
					anno: 1981,
					titolo: 'Primi gruppi LGBTQ+ a Genova',
					descrizione: 'Si formano i primi collettivi per i diritti delle persone omosessuali e trans a Genova, in connessione con i movimenti di liberazione presenti nelle grandi città portuali.'
				},
				{
					anno: 1996,
					titolo: 'Fondazione di Arcigay Genova',
					descrizione: 'Nasce la sezione genovese di Arcigay, che diventa presto un punto di riferimento per la comunità LGBTQ+ ligure, includendo servizi specifici per le persone trans.'
				},
				{
					anno: 2009,
					titolo: 'Primo Liguria Pride a Genova',
					descrizione: 'Genova ospita il primo Pride regionale ligure, con una partecipazione significativa della comunità trans e un forte impatto sulla visibilità delle istanze LGBTQ+ nella regione.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso trans in Liguria?',
				risposta: 'Il primo passo è chiedere al medico di base un\'impegnativa per l\'ambulatorio del Policlinico San Martino di Genova. Da lì parte un percorso multidisciplinare coperto dal SSN.'
			},
			{
				domanda: 'Devo per forza andare a Genova per il percorso di transizione?',
				risposta: 'Per la valutazione iniziale e il percorso specializzato sì, il San Martino di Genova è il centro di riferimento regionale. Però il medico di base locale può avviare l\'iter e i controlli ormonali periodici possono essere gestiti anche a livello territoriale.'
			},
			{
				domanda: 'È possibile fare la chirurgia in Liguria?',
				risposta: 'Attualmente la Liguria non dispone di un centro chirurgico specializzato per gli interventi di affermazione di genere. La maggior parte delle persone si rivolge al CIG del Niguarda (Milano) o al SAIFIP (Roma), con copertura SSN.'
			},
			{
				domanda: 'La terapia ormonale è gratuita in Liguria?',
				risposta: 'Sì, la terapia ormonale sostitutiva è coperta dal Servizio Sanitario Nazionale con esenzione specifica, come in tutte le regioni italiane.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans a Genova?',
				risposta: 'Sì, Arcigay Genova offre uno sportello di ascolto e gruppi di supporto. Il Coordinamento Liguria Rainbow organizza anche eventi e iniziative per la comunità trans ligure.'
			},
			{
				domanda: 'Le province liguri hanno servizi trans dedicati?',
				risposta: 'Le province di Savona, La Spezia e Imperia non hanno centri gender dedicati, ma il medico di base locale può rilasciare l\'impegnativa per il San Martino di Genova. Arcigay ha referenti anche nelle province.'
			}
		],
		articoli_correlati: [
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'trans-e-sanita',
			'salute-mentale-persone-trans',
			'diritti-trans-mancanti'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'emilia-romagna',
		nome: 'Emilia Romagna',
		capoluogo: 'Bologna',
		intro: `L\'Emilia Romagna e Bologna in particolare rappresentano un punto di riferimento nazionale per i diritti e i servizi dedicati alle persone transgender. Bologna vanta una tradizione di apertura e inclusione che pochi centri italiani possono eguagliare: è qui che Marcella Di Folco, prima donna trans eletta in un consiglio comunale italiano, ha operato per anni. Il Policlinico Sant\'Orsola-Malpighi ospita un centro gender riconosciuto a livello nazionale, con un\'equipe multidisciplinare che offre percorsi completi di affermazione di genere. L\'associazionismo emiliano-romagnolo è tra i più vivaci d\'Italia: il MIT (Movimento Identità Trans), fondato a Bologna nel 1979, è la più antica associazione trans italiana ancora attiva, e il Cassero LGBTI+ Center è uno dei centri LGBTQ+ più grandi d\'Europa. La regione si distingue per politiche sanitarie inclusive e un sistema di AUSL efficienti che facilitano l\'accesso ai servizi. Anche città come Modena, Parma e Reggio Emilia offrono supporto attraverso sportelli e associazioni locali, rendendo l\'Emilia Romagna una delle regioni più accoglienti per le persone trans in Italia.`,
		metaDescription: 'Guida alle risorse trans in Emilia Romagna: centro gender al Sant\'Orsola di Bologna, MIT, Cassero, iter AUSL e storia del movimento.',
		centri_gender: [
			{
				nome: 'Centro per la Disforia di Genere — Policlinico Sant\'Orsola-Malpighi',
				citta: 'Bologna',
				indirizzo: 'Via Giuseppe Massarenti 9, 40138 Bologna',
				telefono: '051 214 1111',
				sito: 'https://www.aosp.bo.it',
				note: 'Centro di riferimento regionale con equipe multidisciplinare: psicologia, endocrinologia, chirurgia. Percorso completo di affermazione di genere.'
			},
			{
				nome: 'Ambulatorio di Endocrinologia — AOU di Modena',
				citta: 'Modena',
				indirizzo: 'Via del Pozzo 71, 41124 Modena',
				telefono: '059 422 2111',
				sito: 'https://www.aou.mo.it',
				note: 'Servizio endocrinologico che offre supporto per la terapia ormonale in collaborazione con il centro di Bologna.'
			}
		],
		associazioni: [
			{
				nome: 'MIT — Movimento Identità Trans',
				tipo: 'lgbtq',
				citta: 'Bologna',
				indirizzo: 'Via Polese 22, 40122 Bologna',
				sito: 'https://www.mit-italia.it',
				descrizione: 'Fondata nel 1979, è la più antica associazione trans italiana ancora attiva. Offre sportello di ascolto, accompagnamento ai servizi, supporto legale e casa di accoglienza per persone trans in difficoltà.'
			},
			{
				nome: 'Cassero LGBTI+ Center',
				tipo: 'lgbtq',
				citta: 'Bologna',
				indirizzo: 'Via Don Giovanni Minzoni 18, 40121 Bologna',
				sito: 'https://www.cassero.it',
				descrizione: 'Uno dei centri LGBTQ+ più grandi d\'Europa. Offre servizi di sportello, gruppi di socializzazione, eventi culturali e attività specifiche per persone trans e non binarie.'
			},
			{
				nome: 'Arcigay Bologna — Il Cassero',
				tipo: 'lgbtq',
				citta: 'Bologna',
				sito: 'https://www.arcigay.it/bologna',
				descrizione: 'Sezione bolognese di Arcigay, storicamente legata al Cassero. Consulenza legale, eventi, campagne di sensibilizzazione e supporto alla comunità LGBTQ+.'
			},
			{
				nome: 'AGEDO Emilia Romagna',
				tipo: 'genitori',
				citta: 'Bologna',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ con sedi e referenti in diverse città della regione.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans MIT',
				tipo: 'sociale',
				ente: 'MIT — Movimento Identità Trans',
				citta: 'Bologna',
				indirizzo: 'Via Polese 22, 40122 Bologna',
				orari: 'Lunedì e mercoledì 10:00-13:00, martedì e giovedì 15:00-18:00',
				note: 'Orientamento ai servizi sanitari e legali, accompagnamento, supporto per persone trans migranti, sportello lavoro e casa di accoglienza.'
			},
			{
				nome: 'Sportello Legale LGBTQ+ — Cassero',
				tipo: 'legale',
				ente: 'Cassero LGBTI+ Center',
				citta: 'Bologna',
				indirizzo: 'Via Don Giovanni Minzoni 18, 40121 Bologna',
				orari: 'Su appuntamento',
				note: 'Consulenza legale gratuita su rettificazione anagrafica, discriminazione, diritto del lavoro e diritto di famiglia.'
			}
		],
		iter_sanitario: {
			intro: 'In Emilia Romagna il percorso di affermazione di genere fa riferimento al sistema delle AUSL e al Policlinico Sant\'Orsola-Malpighi di Bologna come centro specializzato. La regione è tra le più organizzate in Italia per l\'accesso ai servizi.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita presso il Centro per la Disforia di Genere del Sant\'Orsola-Malpighi. Il medico di base della tua AUSL può indirizzarti e il MIT può aiutare nell\'orientamento.',
					ente: 'Medico di Medicina Generale / AUSL',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con l\'equipe psicologica del centro gender del Sant\'Orsola per l\'inquadramento diagnostico e l\'accompagnamento nel percorso.',
					ente: 'Policlinico Sant\'Orsola-Malpighi',
					tempiStimati: '2-5 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo del centro prescrive la terapia ormonale sostitutiva. I controlli periodici possono essere gestiti anche dall\'AOU di Modena o dalle endocrinologie territoriali.',
					ente: 'Sant\'Orsola-Malpighi / AOU Modena',
					tempiStimati: '1-2 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile di Bologna (o della città di residenza). Il MIT offre accompagnamento specifico per questa procedura.',
					ente: 'Tribunale Civile',
					tempiStimati: '6-12 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Il Sant\'Orsola offre alcuni interventi di chirurgia di affermazione di genere. Per procedure specifiche ci si può rivolgere anche a centri nazionali come il Niguarda (Milano) o il SAIFIP (Roma).',
					ente: 'Sant\'Orsola-Malpighi — Chirurgia',
					tempiStimati: '1-2 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'L\'Emilia Romagna ha un sistema AUSL tra i più efficienti d\'Italia per l\'accesso ai servizi.',
				'Il MIT di Bologna offre un supporto pratico prezioso nell\'orientamento al percorso sanitario e legale.',
				'La terapia ormonale è coperta dal SSN con esenzione specifica.',
				'I tempi della rettificazione anagrafica a Bologna sono generalmente tra i più rapidi in Italia.'
			]
		},
		storia_queer: {
			intro: 'Bologna e l\'Emilia Romagna sono centrali nella storia dei diritti trans in Italia, con figure iconiche e organizzazioni che hanno plasmato il movimento nazionale.',
			eventi: [
				{
					anno: 1979,
					titolo: 'Fondazione del MIT a Bologna',
					descrizione: 'Nasce a Bologna il Movimento Identità Trans (MIT), la prima e più longeva associazione trans italiana. Fondato da un gruppo di donne trans, diventa punto di riferimento nazionale.'
				},
				{
					anno: 1982,
					titolo: 'Il MIT e la Legge 164',
					descrizione: 'Il MIT di Bologna gioca un ruolo fondamentale nel dibattito che porta all\'approvazione della legge 164/1982 sulla rettificazione anagrafica del sesso.'
				},
				{
					anno: 1995,
					titolo: 'Marcella Di Folco eletta in consiglio comunale',
					descrizione: 'Marcella Di Folco, presidente del MIT, viene eletta nel consiglio comunale di Bologna. È la prima donna trans a ricoprire una carica elettiva in Italia e in Europa.'
				},
				{
					anno: 2012,
					titolo: 'Apertura del nuovo Cassero',
					descrizione: 'Il Cassero LGBTI+ Center si trasferisce nella nuova sede di Via Don Minzoni, diventando uno dei centri LGBTQ+ più grandi d\'Europa con servizi dedicati anche alle persone trans.'
				},
				{
					anno: 2022,
					titolo: 'Bologna città inclusiva',
					descrizione: 'Bologna rafforza le politiche di inclusione per le persone trans, con l\'adozione della carriera alias negli uffici comunali e l\'ampliamento dei servizi del centro gender.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Emilia Romagna?',
				risposta: 'Il primo passo è chiedere al medico di base un\'impegnativa per il Centro per la Disforia di Genere del Sant\'Orsola-Malpighi a Bologna. Il MIT può aiutare nell\'orientamento ai servizi.'
			},
			{
				domanda: 'Cos\'è il MIT e che servizi offre?',
				risposta: 'Il MIT (Movimento Identità Trans) è la più antica associazione trans italiana, fondata a Bologna nel 1979. Offre sportello di ascolto, accompagnamento ai servizi sanitari e legali, sportello lavoro e una casa di accoglienza per persone trans in difficoltà.'
			},
			{
				domanda: 'I tempi di attesa a Bologna sono lunghi?',
				risposta: 'L\'Emilia Romagna ha tempi generalmente più rapidi rispetto ad altre regioni. La prima visita al centro gender richiede 2-5 mesi di attesa, e la rettificazione anagrafica a Bologna è tra le più veloci d\'Italia (6-12 mesi).'
			},
			{
				domanda: 'Ci sono servizi anche fuori Bologna?',
				risposta: 'Sì, l\'AOU di Modena offre supporto endocrinologico e ci sono sportelli LGBTQ+ in diverse città emiliano-romagnole. Per il percorso specializzato completo, però, il riferimento resta il Sant\'Orsola di Bologna.'
			},
			{
				domanda: 'La chirurgia di affermazione di genere si fa a Bologna?',
				risposta: 'Il Sant\'Orsola offre alcuni interventi chirurgici. Per procedure più complesse, alcune persone si rivolgono al CIG del Niguarda (Milano) o al SAIFIP (Roma), con copertura SSN tramite autorizzazione.'
			},
			{
				domanda: 'Esistono risorse per famiglie di persone trans in Emilia Romagna?',
				risposta: 'Sì, AGEDO Emilia Romagna organizza gruppi di sostegno per genitori e familiari in diverse città della regione. Anche il Cassero e il MIT possono orientare le famiglie verso i servizi di supporto.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'marcella-di-folco',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'situazione-trans-italia'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'toscana',
		nome: 'Toscana',
		capoluogo: 'Firenze',
		intro: `La Toscana offre un panorama di servizi per le persone transgender che combina la tradizione culturale di apertura della regione con strutture sanitarie di qualità. Firenze è il centro nevralgico dei servizi, con l\'AOU Careggi che ospita un ambulatorio dedicato alla disforia di genere e un\'equipe endocrinologica tra le più competenti del Centro Italia. L\'associazionismo toscano è radicato e diversificato, con realtà come IREOS e Arcigay Firenze che offrono supporto concreto alle persone trans, e il movimento LGBTQ+ toscano ha una storia ricca che si intreccia con la tradizione progressista della regione. La Toscana si distingue per le politiche regionali di inclusione: è stata tra le prime regioni italiane ad approvare una legge regionale contro le discriminazioni basate sull\'orientamento sessuale e l\'identità di genere. Il sistema delle ASL toscane è efficiente e garantisce un buon accesso ai servizi anche dalle province più periferiche. Anche Pisa, con la sua università e il suo ospedale, offre un supporto significativo per i percorsi di affermazione di genere.`,
		metaDescription: 'Guida alle risorse trans in Toscana: centro gender a Careggi Firenze, associazioni, iter sanitario ASL e storia del movimento.',
		centri_gender: [
			{
				nome: 'Ambulatorio Disforia di Genere — AOU Careggi',
				citta: 'Firenze',
				indirizzo: 'Largo Giovanni Alessandro Brambilla 3, 50134 Firenze',
				telefono: '055 794 6090',
				sito: 'https://www.aou-careggi.toscana.it',
				note: 'Centro di riferimento regionale. Equipe multidisciplinare con endocrinologia, psicologia clinica e collaborazione con chirurgia plastica.'
			},
			{
				nome: 'Ambulatorio di Endocrinologia — AOU Pisana',
				citta: 'Pisa',
				indirizzo: 'Via Roma 67, 56126 Pisa',
				telefono: '050 997 111',
				sito: 'https://www.ao-pisa.toscana.it',
				note: 'Servizio endocrinologico che offre supporto per la terapia ormonale sostitutiva in collaborazione con il centro di Firenze.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Firenze — Altre Prospettive',
				tipo: 'lgbtq',
				citta: 'Firenze',
				indirizzo: 'Via Pisana 32r, 50143 Firenze',
				sito: 'https://www.arcigayfirenze.it',
				descrizione: 'Sezione fiorentina di Arcigay. Offre sportello di ascolto, consulenza legale, eventi culturali e gruppi di supporto per persone LGBTQ+ e trans.'
			},
			{
				nome: 'IREOS — Centro Servizi Comunità Queer',
				tipo: 'lgbtq',
				citta: 'Firenze',
				indirizzo: 'Via dei Serragli 3, 50124 Firenze',
				sito: 'https://www.ireos.org',
				descrizione: 'Centro servizi per la comunità LGBTQ+ fiorentina. Offre sportello psicologico, gruppi di auto-mutuo-aiuto, consulenza legale e attività specifiche per persone trans.'
			},
			{
				nome: 'AGEDO Toscana',
				tipo: 'genitori',
				citta: 'Firenze',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ in Toscana. Incontri mensili a Firenze e referenti nelle province.'
			},
			{
				nome: 'Rete Lenford — referenti Toscana',
				tipo: 'legale',
				citta: 'Firenze',
				sito: 'https://www.retelenford.it',
				descrizione: 'Avvocati specializzati in diritti LGBTQ+ con referenti in Toscana. Consulenze gratuite su rettificazione anagrafica e discriminazione.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto Trans — IREOS',
				tipo: 'psicologico',
				ente: 'IREOS',
				citta: 'Firenze',
				indirizzo: 'Via dei Serragli 3, 50124 Firenze',
				orari: 'Martedì 16:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, gruppi di auto-mutuo-aiuto per persone trans e non binarie.'
			},
			{
				nome: 'Sportello Antidiscriminazione — Regione Toscana',
				tipo: 'antidiscriminazione',
				ente: 'Regione Toscana',
				citta: 'Firenze',
				telefono: '055 438 2722',
				note: 'Servizio regionale per la segnalazione e gestione di discriminazioni basate su identità di genere e orientamento sessuale.'
			}
		],
		iter_sanitario: {
			intro: 'In Toscana il percorso di affermazione di genere fa riferimento al sistema delle ASL regionali e all\'AOU Careggi di Firenze come centro specializzato principale. La regione ha un sistema sanitario efficiente e politiche di inclusione tra le più avanzate d\'Italia.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita presso l\'ambulatorio di disforia di genere dell\'AOU Careggi a Firenze. Il medico di base della tua ASL può indirizzarti al percorso appropriato.',
					ente: 'Medico di Medicina Generale / ASL Toscana',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con l\'equipe psicologica di Careggi per l\'accompagnamento nel percorso di affermazione di genere. L\'approccio è centrato sulla persona.',
					ente: 'AOU Careggi — Psicologia',
					tempiStimati: '2-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo di Careggi o dell\'AOU Pisana prescrive la terapia ormonale sostitutiva con controlli periodici ogni 3-6 mesi.',
					ente: 'AOU Careggi / AOU Pisana',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile di Firenze (o della città di residenza). IREOS e le associazioni locali possono offrire orientamento legale.',
					ente: 'Tribunale Civile',
					tempiStimati: '6-14 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere, Careggi offre alcune procedure. Per interventi più complessi ci si può rivolgere a centri nazionali come il Niguarda (Milano) o il SAIFIP (Roma) con copertura SSN.',
					ente: 'AOU Careggi — Chirurgia / Centri nazionali',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'La Toscana ha una legge regionale contro le discriminazioni basate sull\'identità di genere.',
				'L\'AOU Careggi è il centro di riferimento regionale e accetta pazienti da tutta la Toscana.',
				'La terapia ormonale è coperta dal SSN con esenzione specifica.',
				'Le associazioni come IREOS offrono un supporto pratico importante nell\'orientamento ai servizi.'
			]
		},
		storia_queer: {
			intro: 'La Toscana ha una tradizione secolare di apertura culturale e artistica che ha favorito anche l\'emergere di una comunità LGBTQ+ vivace e organizzata.',
			eventi: [
				{
					anno: 1979,
					titolo: 'Primi collettivi LGBTQ+ fiorentini',
					descrizione: 'Si formano a Firenze i primi gruppi organizzati per i diritti delle persone omosessuali e trans, in un contesto culturale favorevole alla sperimentazione e alla libertà individuale.'
				},
				{
					anno: 2004,
					titolo: 'Legge regionale antidiscriminazione',
					descrizione: 'La Toscana approva una delle prime leggi regionali italiane contro le discriminazioni basate sull\'orientamento sessuale e l\'identità di genere, un modello per altre regioni.'
				},
				{
					anno: 2010,
					titolo: 'Toscana Pride diffuso',
					descrizione: 'Il Pride toscano adotta un formato diffuso, con eventi in diverse città della regione, favorendo la visibilità della comunità LGBTQ+ e trans anche nei centri minori.'
				},
				{
					anno: 2016,
					titolo: 'IREOS e servizi dedicati',
					descrizione: 'Il centro IREOS di Firenze amplia i servizi dedicati alle persone trans, con gruppi specifici di supporto e attività di accompagnamento ai percorsi sanitari e legali.'
				},
				{
					anno: 2024,
					titolo: 'Firenze e l\'inclusione scolastica',
					descrizione: 'Cresce il numero di scuole e università toscane che adottano la carriera alias e protocolli di inclusione per studenti trans, con il supporto attivo della Regione.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Toscana?',
				risposta: 'Il primo passo è chiedere al medico di base un\'impegnativa per l\'ambulatorio di disforia di genere dell\'AOU Careggi a Firenze. Le associazioni come IREOS possono aiutare nell\'orientamento.'
			},
			{
				domanda: 'L\'AOU Careggi accetta pazienti da fuori Firenze?',
				risposta: 'Sì, il centro è di riferimento regionale e accoglie pazienti da tutte le province della Toscana. È sufficiente un\'impegnativa del medico di base della propria ASL.'
			},
			{
				domanda: 'La Toscana ha leggi specifiche contro la discriminazione trans?',
				risposta: 'Sì, la Toscana ha una legge regionale del 2004 contro le discriminazioni basate sull\'orientamento sessuale e l\'identità di genere, tra le prime in Italia.'
			},
			{
				domanda: 'Ci sono servizi trans anche a Pisa?',
				risposta: 'Sì, l\'AOU Pisana offre supporto endocrinologico per la terapia ormonale. Per il percorso completo il riferimento resta Careggi a Firenze, ma i controlli possono essere gestiti anche a Pisa.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans a Firenze?',
				risposta: 'Sì, IREOS offre sportello psicologico e gruppi di auto-mutuo-aiuto per persone trans. Arcigay Firenze organizza anche eventi e attività di socializzazione per la comunità LGBTQ+.'
			},
			{
				domanda: 'La terapia ormonale è gratuita in Toscana?',
				risposta: 'Sì, la terapia ormonale sostitutiva è coperta dal Servizio Sanitario Nazionale con esenzione specifica, come in tutte le regioni italiane.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'salute-mentale-persone-trans',
			'cambio-documenti-trans',
			'discriminazione-lavoro-trans-italia'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'veneto',
		nome: 'Veneto',
		capoluogo: 'Venezia',
		intro: `Il Veneto rappresenta una realtà importante per i servizi dedicati alle persone transgender nel Nord-Est italiano. Padova è il principale polo di riferimento, grazie all\'Azienda Ospedaliera Universitaria che ospita un ambulatorio dedicato alla disforia di genere con una lunga tradizione di ricerca e cura in ambito endocrinologico. L\'Università di Padova è stata pioniera negli studi sull\'identità di genere in Italia, e il suo dipartimento di endocrinologia è riconosciuto a livello internazionale. L\'associazionismo veneto è attivo e diversificato, con sedi di Arcigay presenti nelle principali città della regione e realtà specifiche come il Gruppo Identità di Genere di Padova. Il contesto sociale veneto presenta sfide specifiche, con un tessuto culturale tradizionalmente conservatore che convive con sacche di apertura e innovazione, soprattutto nei contesti universitari e urbani. Le ULSS venete garantiscono l\'accesso ai servizi su tutto il territorio regionale, anche se i centri specializzati sono concentrati a Padova e, in misura minore, a Verona. La comunità trans veneta, pur affrontando le sfide di un contesto non sempre facile, può contare su strutture sanitarie di eccellenza e su un tessuto associativo in crescita.`,
		metaDescription: 'Guida alle risorse trans in Veneto: centro gender a Padova, associazioni, iter sanitario ULSS e storia del movimento.',
		centri_gender: [
			{
				nome: 'Ambulatorio Disforia di Genere — AOU di Padova',
				citta: 'Padova',
				indirizzo: 'Via Nicolao Giustiniani 2, 35128 Padova',
				telefono: '049 821 3300',
				sito: 'https://www.aopd.veneto.it',
				note: 'Centro di riferimento regionale con lunga tradizione in endocrinologia. Percorso multidisciplinare con psicologia, endocrinologia e collaborazione chirurgica.'
			},
			{
				nome: 'Ambulatorio di Endocrinologia — AOUI Verona',
				citta: 'Verona',
				indirizzo: 'Piazzale Aristide Stefani 1, 37126 Verona',
				telefono: '045 812 1111',
				sito: 'https://www.aovr.veneto.it',
				note: 'Servizio endocrinologico che offre supporto per la terapia ormonale, punto di riferimento per le province di Verona e del Veneto occidentale.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Padova — Tralaltro',
				tipo: 'lgbtq',
				citta: 'Padova',
				indirizzo: 'Via Davide Businello 3, 35121 Padova',
				sito: 'https://www.arcigaypadova.it',
				descrizione: 'Sezione padovana di Arcigay. Offre sportello di ascolto, consulenza legale, eventi culturali e gruppi di supporto per persone LGBTQ+ e trans.'
			},
			{
				nome: 'Arcigay Verona — Pianeta Urano',
				tipo: 'lgbtq',
				citta: 'Verona',
				sito: 'https://www.arcigayverona.it',
				descrizione: 'Sezione veronese di Arcigay. Attiva nella promozione dei diritti LGBTQ+ e nell\'offerta di servizi di ascolto e supporto in un contesto cittadino particolarmente sfidante.'
			},
			{
				nome: 'AGEDO Veneto',
				tipo: 'genitori',
				citta: 'Padova',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ con referenti in diverse città venete. Incontri periodici a Padova e Verona.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto Trans — Arcigay Padova',
				tipo: 'psicologico',
				ente: 'Arcigay Padova',
				citta: 'Padova',
				indirizzo: 'Via Davide Businello 3, 35121 Padova',
				orari: 'Venerdì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, supporto tra pari per persone trans e non binarie.'
			},
			{
				nome: 'Sportello Legale LGBTQ+',
				tipo: 'legale',
				ente: 'Arcigay Padova',
				citta: 'Padova',
				orari: 'Su appuntamento',
				note: 'Consulenza legale gratuita su rettificazione anagrafica, discriminazione sul lavoro e diritto di famiglia.'
			}
		],
		iter_sanitario: {
			intro: 'In Veneto il percorso di affermazione di genere fa riferimento al sistema delle ULSS e all\'AOU di Padova come centro specializzato principale. Il dipartimento di endocrinologia di Padova ha una tradizione di eccellenza riconosciuta a livello internazionale.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica presso l\'AOU di Padova. Il medico di base della tua ULSS può indirizzarti al percorso appropriato.',
					ente: 'Medico di Medicina Generale / ULSS Veneto',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con l\'equipe psicologica dell\'AOU di Padova per l\'inquadramento e l\'accompagnamento nel percorso di affermazione di genere.',
					ente: 'AOU di Padova — Psicologia',
					tempiStimati: '2-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo dell\'AOU di Padova o dell\'AOUI di Verona prescrive la terapia ormonale sostitutiva con controlli periodici. Il dipartimento padovano è un\'eccellenza nazionale in questo ambito.',
					ente: 'AOU Padova / AOUI Verona — Endocrinologia',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile della città di residenza. L\'equipe del centro fornisce la documentazione clinica necessaria.',
					ente: 'Tribunale Civile',
					tempiStimati: '8-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere, il Veneto fa generalmente riferimento a centri nazionali come il CIG del Niguarda (Milano) o il SAIFIP (Roma), con copertura SSN tramite autorizzazione.',
					ente: 'Centri nazionali di riferimento',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'L\'AOU di Padova ha uno dei dipartimenti di endocrinologia più rinomati d\'Italia per i percorsi di affermazione di genere.',
				'La terapia ormonale è coperta dal SSN con esenzione specifica anche in Veneto.',
				'Per la chirurgia è generalmente necessario rivolgersi a centri fuori regione.',
				'I tempi della rettificazione anagrafica in Veneto possono variare significativamente a seconda del Tribunale competente.'
			]
		},
		storia_queer: {
			intro: 'Il Veneto ha una storia articolata nel rapporto con le identità di genere, con un contesto culturale complesso in cui convivono tradizione e innovazione.',
			eventi: [
				{
					anno: 1980,
					titolo: 'Primi gruppi LGBTQ+ a Padova',
					descrizione: 'Nell\'ambiente universitario padovano nascono i primi collettivi per i diritti delle persone omosessuali e trans, favoriti dal contesto accademico aperto alla ricerca e al dibattito.'
				},
				{
					anno: 1990,
					titolo: 'Ricerca sull\'identità di genere a Padova',
					descrizione: 'L\'Università di Padova avvia programmi di ricerca pionieristici sull\'identità di genere e sull\'endocrinologia della disforia di genere, diventando un centro di riferimento scientifico.'
				},
				{
					anno: 2006,
					titolo: 'Primo Veneto Pride',
					descrizione: 'Il Veneto ospita il primo Pride regionale, un evento significativo in una regione percepita come culturalmente conservatrice, con una partecipazione che supera le aspettative.'
				},
				{
					anno: 2018,
					titolo: 'Verona e il dibattito sui diritti',
					descrizione: 'Verona diventa teatro di un acceso dibattito nazionale sui diritti LGBTQ+ in occasione del Congresso Mondiale delle Famiglie, mobilitando la comunità trans e i movimenti per i diritti civili.'
				},
				{
					anno: 2023,
					titolo: 'Carriera alias nelle università venete',
					descrizione: 'Le principali università venete (Padova, Verona, Ca\' Foscari) consolidano la pratica della carriera alias per studenti trans, contribuendo a un ambiente accademico più inclusivo.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Veneto?',
				risposta: 'Il primo passo è chiedere al medico di base un\'impegnativa per l\'AOU di Padova, centro di riferimento regionale. Da lì si avvia un percorso multidisciplinare coperto dal SSN.'
			},
			{
				domanda: 'Ci sono servizi anche a Verona?',
				risposta: 'Sì, l\'AOUI di Verona offre supporto endocrinologico per la terapia ormonale. Per il percorso completo il riferimento resta l\'AOU di Padova, ma i controlli possono essere gestiti anche a Verona.'
			},
			{
				domanda: 'La terapia ormonale è gratuita in Veneto?',
				risposta: 'Sì, la terapia ormonale sostitutiva è coperta dal Servizio Sanitario Nazionale con esenzione specifica, come in tutte le regioni italiane.'
			},
			{
				domanda: 'I tempi di rettificazione anagrafica in Veneto sono lunghi?',
				risposta: 'I tempi variano da 8 a 18 mesi a seconda del Tribunale competente. Dal 2015 non è obbligatorio l\'intervento chirurgico per la rettificazione.'
			},
			{
				domanda: 'È possibile fare la chirurgia in Veneto?',
				risposta: 'Attualmente il Veneto non ha un centro chirurgico dedicato per gli interventi di affermazione di genere. La maggior parte delle persone si rivolge al Niguarda (Milano) o al SAIFIP (Roma) con copertura SSN.'
			},
			{
				domanda: 'Com\'è il contesto sociale per le persone trans in Veneto?',
				risposta: 'Il contesto varia: le città universitarie come Padova sono generalmente più accoglienti, mentre in aree più piccole possono esserci maggiori difficoltà. Le associazioni locali offrono supporto e spazi sicuri.'
			}
		],
		articoli_correlati: [
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'discriminazione-lavoro-trans-italia',
			'salute-mentale-persone-trans',
			'coming-out-trans'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'friuli-venezia-giulia',
		nome: 'Friuli Venezia Giulia',
		capoluogo: 'Trieste',
		intro: `Il Friuli Venezia Giulia è una regione a statuto speciale del Nord-Est italiano che offre servizi per le persone transgender concentrati principalmente nelle città di Trieste e Udine. L\'Azienda Sanitaria Universitaria Giuliano Isontina (ASUGI) di Trieste è il punto di riferimento regionale per i percorsi di affermazione di genere, con un ambulatorio che opera in collaborazione con i servizi di salute mentale del territorio. La regione si distingue per una tradizione di attenzione alla salute mentale ereditata dall\'esperienza basagliana: Trieste è la città dove Franco Basaglia ha rivoluzionato la psichiatria italiana, e questo approccio centrato sulla persona si riflette anche nei servizi per le persone trans. L\'associazionismo è presente con sedi di Arcigay a Trieste e a Udine, e con realtà locali che offrono supporto e spazi di socializzazione. Il contesto transfrontaliero della regione, al confine con Slovenia e Austria, aggiunge una dimensione internazionale al dibattito sui diritti e all\'accesso ai servizi. Le Aziende Sanitarie regionali (ASUGI per l\'area giuliana e ASUFC per l\'area friulana) garantiscono l\'accesso ai percorsi su tutto il territorio.`,
		metaDescription: 'Guida alle risorse trans in Friuli Venezia Giulia: servizi a Trieste e Udine, associazioni, iter sanitario ASUGI e storia del movimento.',
		centri_gender: [
			{
				nome: 'Ambulatorio per l\'Identità di Genere — ASUGI Trieste',
				citta: 'Trieste',
				indirizzo: 'Via Giovanni Sai 1-3, 34128 Trieste',
				telefono: '040 399 7500',
				sito: 'https://asugi.sanita.fvg.it',
				note: 'Servizio di riferimento regionale. Percorso di valutazione psicologica e avvio della terapia ormonale in collaborazione con l\'endocrinologia.'
			},
			{
				nome: 'Servizio di Endocrinologia — ASUFC Udine',
				citta: 'Udine',
				indirizzo: 'Piazzale Santa Maria della Misericordia 15, 33100 Udine',
				telefono: '0432 552 111',
				sito: 'https://asufc.sanita.fvg.it',
				note: 'Supporto endocrinologico per la gestione della terapia ormonale. Punto di riferimento per la parte friulana della regione.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Trieste — Arcilesbica',
				tipo: 'lgbtq',
				citta: 'Trieste',
				indirizzo: 'Via Donota 2, 34121 Trieste',
				sito: 'https://www.arcigayfvg.it',
				descrizione: 'Sezione triestina di Arcigay. Offre sportello di ascolto, gruppi di supporto, consulenza legale e eventi culturali per la comunità LGBTQ+.'
			},
			{
				nome: 'Arcigay Udine — Friuli',
				tipo: 'lgbtq',
				citta: 'Udine',
				sito: 'https://www.arcigayfvg.it',
				descrizione: 'Sezione udinese di Arcigay. Promuove i diritti LGBTQ+ nell\'area friulana con eventi, sportelli di ascolto e iniziative culturali.'
			},
			{
				nome: 'AGEDO Friuli Venezia Giulia',
				tipo: 'genitori',
				citta: 'Trieste',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ nella regione. Incontri periodici a Trieste e Udine.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Trieste',
				tipo: 'psicologico',
				ente: 'Arcigay Trieste',
				citta: 'Trieste',
				indirizzo: 'Via Donota 2, 34121 Trieste',
				orari: 'Mercoledì 17:30-19:30',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, supporto tra pari per persone trans e non binarie nella regione.'
			}
		],
		iter_sanitario: {
			intro: 'In Friuli Venezia Giulia il percorso di affermazione di genere fa riferimento alle Aziende Sanitarie regionali (ASUGI per l\'area giuliana e ASUFC per l\'area friulana). L\'approccio basagliano alla salute mentale influenza positivamente l\'accoglienza delle persone trans nei servizi.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita psicologica o endocrinologica presso l\'ASUGI di Trieste o l\'ASUFC di Udine. Il medico di base può indirizzarti al servizio più vicino.',
					ente: 'Medico di Medicina Generale / ASUGI o ASUFC',
					tempiStimati: '1-3 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con l\'equipe psicologica del servizio di riferimento per l\'accompagnamento nel percorso. L\'approccio è ispirato alla tradizione basagliana di centralita della persona.',
					ente: 'ASUGI Trieste / ASUFC Udine',
					tempiStimati: '2-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo dell\'ASUGI o dell\'ASUFC prescrive la terapia ormonale sostitutiva con controlli periodici ogni 3-6 mesi.',
					ente: 'ASUGI / ASUFC — Endocrinologia',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile di Trieste o di Udine. I servizi sanitari forniscono la documentazione clinica necessaria.',
					ente: 'Tribunale Civile di Trieste / Udine',
					tempiStimati: '6-16 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere, il Friuli Venezia Giulia fa riferimento a centri nazionali come il CIG del Niguarda (Milano), il SAIFIP (Roma) o l\'AOU di Padova, con copertura SSN tramite autorizzazione.',
					ente: 'Centri nazionali di riferimento',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Il Friuli Venezia Giulia ha due aziende sanitarie principali: ASUGI (Trieste-Gorizia) e ASUFC (Udine-Pordenone).',
				'La tradizione basagliana di Trieste favorisce un approccio accogliente è centrato sulla persona nei servizi di salute mentale.',
				'La terapia ormonale è coperta dal SSN con esenzione specifica.',
				'Per la chirurgia è necessario rivolgersi a centri fuori regione, con copertura SSN tramite autorizzazione preventiva.'
			]
		},
		storia_queer: {
			intro: 'Il Friuli Venezia Giulia ha una storia particolare nel campo dei diritti e della salute mentale, influenzata dalla rivoluzione basagliana e dalla posizione di confine della regione.',
			eventi: [
				{
					anno: 1978,
					titolo: 'Legge Basaglia e salute mentale',
					descrizione: 'Trieste è al centro della rivoluzione psichiatrica di Franco Basaglia, che porta alla legge 180/1978. Questo approccio centrato sulla persona influenzerà positivamente anche l\'accoglienza delle persone trans nei servizi sanitari.'
				},
				{
					anno: 1985,
					titolo: 'Primi gruppi LGBTQ+ a Trieste',
					descrizione: 'Nel clima di rinnovamento culturale post-basagliano, nascono a Trieste i primi gruppi organizzati per i diritti delle persone omosessuali e trans.'
				},
				{
					anno: 2002,
					titolo: 'Arcigay si radica in regione',
					descrizione: 'Arcigay consolida la propria presenza in Friuli Venezia Giulia con sedi attive a Trieste e Udine, offrendo servizi di sportello e supporto anche per le persone trans.'
				},
				{
					anno: 2015,
					titolo: 'FVG Pride',
					descrizione: 'Il Pride regionale del Friuli Venezia Giulia cresce in partecipazione, con la comunità trans che assume un ruolo sempre più visibile e centrale nell\'organizzazione degli eventi.'
				},
				{
					anno: 2024,
					titolo: 'Inclusione e carriera alias',
					descrizione: 'L\'Università di Trieste e l\'Università di Udine adottano e consolidano la carriera alias per studenti trans, favorendo un ambiente accademico più inclusivo nella regione.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Friuli Venezia Giulia?',
				risposta: 'Il primo passo è chiedere al medico di base un\'impegnativa per l\'ASUGI di Trieste o l\'ASUFC di Udine. Da lì si avvia un percorso multidisciplinare coperto dal SSN.'
			},
			{
				domanda: 'Qual è la differenza tra ASUGI e ASUFC?',
				risposta: 'ASUGI (Azienda Sanitaria Universitaria Giuliano Isontina) copre l\'area di Trieste e Gorizia, mentre ASUFC (Azienda Sanitaria Universitaria Friuli Centrale) copre l\'area di Udine e Pordenone. Entrambe offrono servizi per le persone trans.'
			},
			{
				domanda: 'La terapia ormonale è gratuita in Friuli Venezia Giulia?',
				risposta: 'Sì, la terapia ormonale sostitutiva è coperta dal Servizio Sanitario Nazionale con esenzione specifica, come in tutte le regioni italiane.'
			},
			{
				domanda: 'È possibile fare la chirurgia nella regione?',
				risposta: 'Il Friuli Venezia Giulia non dispone di un centro chirurgico specializzato per gli interventi di affermazione di genere. Le persone si rivolgono a centri nazionali come il Niguarda (Milano), il SAIFIP (Roma) o l\'AOU di Padova.'
			},
			{
				domanda: 'Cosa c\'entra Basaglia con i servizi per le persone trans?',
				risposta: 'La rivoluzione basagliana ha lasciato a Trieste un\'eredità di approccio centrato sulla persona nei servizi di salute mentale. Questo si traduce in un\'accoglienza generalmente attenta e rispettosa anche nei percorsi per le persone trans.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans nella regione?',
				risposta: 'Sì, Arcigay ha sedi a Trieste e Udine con sportelli di ascolto e gruppi di supporto. AGEDO Friuli Venezia Giulia offre sostegno alle famiglie di persone LGBTQ+.'
			}
		],
		articoli_correlati: [
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans',
			'famiglie-e-persone-trans',
			'trans-e-sanita'
		],
		ultimoAggiornamento: '2026-02-24'
	}
];

import { batch2 } from './_regioni-batch2';
import { batch3 } from './_regioni-batch3';

const tutteLeRegioni: RegioneDettaglio[] = [...dati, ...batch2, ...batch3];

export const regioniDettaglio: Map<string, RegioneDettaglio> = new Map(
	tutteLeRegioni.map((r) => [r.slug, r])
);
