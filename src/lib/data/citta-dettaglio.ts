import type {
	CentroGender,
	Associazione,
	Sportello,
	PassoIterSanitario,
	EventoStoria
} from './regioni-dettaglio';

export interface CittaDettaglio {
	slug: string;
	nome: string;
	regione: string;
	provincia: string;
	intro: string;
	metaDescription: string;
	contesto_locale: string;
	centri_gender_intro: string;
	associazioni_intro: string;
	sportelli_intro: string;
	image: string;
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

const dati: CittaDettaglio[] = [
	{
		slug: 'milano',
		nome: 'Milano',
		regione: 'Lombardia',
		provincia: 'MI',
		intro: 'Milano è il principale polo italiano per i percorsi di affermazione di genere, grazie alla presenza del CIG (Centro Interdipartimentale per l\'Incongruenza di Genere) dell\'Ospedale Niguarda, punto di riferimento nazionale. La città vanta un tessuto associativo tra i più ricchi d\'Italia, con decine di realtà che offrono supporto legale, psicologico e sociale alle persone trans e non binarie. Nel 2002 Milano ha ospitato il primo Trans Pride italiano, segnando un momento storico per la visibilità della comunità transgender nel Paese. L\'ampia rete di servizi pubblici e del terzo settore rende Milano una delle città più accessibili per chi intraprende un percorso di transizione.',
		metaDescription: 'Guida completa ai servizi per persone trans a Milano: CIG Niguarda, associazioni, sportelli, iter sanitario e FAQ sul percorso di transizione in Lombardia.',
		contesto_locale: 'Milano rappresenta il principale punto di riferimento in Italia per i percorsi di affermazione di genere. Il cuore di questa rete è il CIG (Centro Interdipartimentale per l\'Incongruenza di Genere) dell\'Ospedale Niguarda, l\'unico centro in Lombardia interamente finanziato dal Servizio Sanitario Nazionale per questo tipo di percorsi. Secondo un reportage di Sky TG24 del 2023, il CIG segue oltre 500 pazienti. La città vanta un tessuto associativo tra i più densi d\'Italia: al Milano Pride partecipano regolarmente oltre 90 organizzazioni LGBTQ+. Milano è stata anche la prima grande città italiana ad adottare un registro di genere comunale nel 2022, che consente alle persone trans di ottenere documenti comunali (tessere ATM, badge, carte biblioteca) con il nome corrispondente alla propria identità di genere. Nel 2024 il Comune ha esteso la carriera alias anche ai propri dipendenti. Il 4 maggio 2025, in occasione dell\'anniversario della Legge 164/1982, si è tenuta la prima edizione del Trans Pride Milano.',
		centri_gender_intro: 'Per accedere ai centri per l\'incongruenza di genere a Milano serve un\'impegnativa del medico di base, solitamente per "visita psicologica clinica". Il CIG Niguarda offre un percorso multidisciplinare completo: valutazione psicodiagnostica, terapia ormonale (endocrinologia) e chirurgia di affermazione di genere, tutto coperto dal SSN. I tempi di attesa per il primo colloquio possono essere di diversi mesi a causa dell\'alta domanda — il centro ha una lista d\'attesa di circa 140 persone (dato 2023).',
		associazioni_intro: 'Milano dispone di una rete associativa ampia e diversificata a supporto delle persone trans e non binarie. Le realtà presenti coprono ogni tipo di bisogno: dallo sportello trans di ALA Milano (che offre supporto psicologico, legale e orientamento lavorativo) alla consulenza legale specializzata di Rete Lenford, dai gruppi di auto-mutuo-aiuto di Arcigay Milano all\'accompagnamento tra pari del MIT. Per le famiglie, AGEDO Milano organizza incontri mensili dedicati ai genitori di persone trans.',
		sportelli_intro: 'Il Comune di Milano mette a disposizione diversi servizi pubblici gratuiti per le persone transgender. Lo Sportello Trans comunale offre orientamento su percorsi sanitari, documenti e mediazione con servizi pubblici. Alla Casa dei Diritti è attivo un Help Center antidiscriminazione che accoglie segnalazioni di discriminazioni legate all\'identità di genere, offrendo ascolto, orientamento e consulenza legale gratuita. È inoltre operativo il nodo milanese dello Sportello UNAR, raggiungibile tramite il numero verde 800 901 010.',
		image: '/images/citta/milano.webp',
		centri_gender: [
			{
				nome: 'CIG — Centro Interdipartimentale per l\'Incongruenza di Genere, Ospedale Niguarda',
				citta: 'Milano',
				indirizzo: 'Piazza dell\'Ospedale Maggiore 3, 20162 Milano',
				telefono: '02 6444 2021',
				email: 'cig@ospedaleniguarda.it',
				sito: 'https://www.ospedaleniguarda.it',
				note: 'Centro di riferimento nazionale. Offre percorso completo: valutazione psicodiagnostica, endocrinologia, chirurgia. Accesso con impegnativa del medico di base per "visita psicologica clinica".'
			},
			{
				nome: 'Fondazione IRCCS Ca\' Granda — Ospedale Maggiore Policlinico',
				citta: 'Milano',
				indirizzo: 'Via Francesco Sforza 35, 20122 Milano',
				telefono: '02 5503 1',
				sito: 'https://www.policlinico.mi.it',
				note: 'Servizio di endocrinologia con esperienza in terapia ormonale per persone transgender. Collabora con il CIG Niguarda per i percorsi multidisciplinari.'
			},
			{
				nome: 'Ambulatorio Medicina di Genere — IRCCS Ospedale San Raffaele',
				citta: 'Milano',
				indirizzo: 'Via Olgettina 60, 20132 Milano',
				telefono: '02 2643 2643',
				sito: 'https://www.hsr.it',
				note: 'Ambulatorio di endocrinologia con competenze specifiche sulla disforia di genere. Struttura convenzionata SSN per alcune prestazioni, ma verificare la copertura.'
			}
		],
		associazioni: [
			{
				nome: 'ALA Milano Onlus',
				tipo: 'lgbtq',
				citta: 'Milano',
				indirizzo: 'Via Sammartini 21, 20125 Milano',
				email: 'info@alamilano.org',
				sito: 'https://www.alamilano.org',
				descrizione: 'Associazione storica milanese che offre supporto psicologico, gruppi di auto-mutuo-aiuto per persone trans e non binarie, e accompagnamento nei percorsi di transizione.'
			},
			{
				nome: 'Arcigay Milano',
				tipo: 'lgbtq',
				citta: 'Milano',
				indirizzo: 'Via Bezzecca 3, 20135 Milano',
				telefono: '02 5412 2529',
				email: 'info@arcigaymilano.org',
				sito: 'https://www.arcigaymilano.org',
				descrizione: 'Sezione milanese di Arcigay. Gestisce sportelli di ascolto, consulenza legale e gruppi dedicati alle persone trans e alle loro famiglie. Organizza il Milano Pride.'
			},
			{
				nome: 'AGEDO Lombardia',
				tipo: 'genitori',
				citta: 'Milano',
				indirizzo: 'Via Bezzecca 3, 20135 Milano',
				email: 'lombardia@agedo.org',
				sito: 'https://www.agedo.org',
				descrizione: 'Associazione di genitori, parenti e amici di persone LGBTQ+. Offre gruppi di confronto per famiglie di persone trans, supporto telefonico e incontri mensili a Milano.'
			},
			{
				nome: 'MIT — Movimento Identità Trans (sede operativa Nord)',
				tipo: 'lgbtq',
				citta: 'Milano',
				email: 'milano@mit-italia.it',
				sito: 'https://www.mit-italia.it',
				descrizione: 'Riferimento storico del movimento trans in Italia. La sede operativa milanese offre accompagnamento ai percorsi, supporto tra pari e advocacy per i diritti delle persone transgender.'
			},
			{
				nome: 'Rete Lenford — Avvocatura per i diritti LGBTI+',
				tipo: 'legale',
				citta: 'Milano',
				email: 'info@retelenford.it',
				sito: 'https://www.retelenford.it',
				descrizione: 'Rete nazionale di avvocati e avvocate specializzati in diritti LGBTQ+. Fornisce consulenza legale gratuita per rettificazione anagrafica, discriminazioni e diritto del lavoro.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans del Comune di Milano',
				tipo: 'sociale',
				ente: 'Comune di Milano — Direzione Politiche Sociali',
				citta: 'Milano',
				indirizzo: 'Via Dogana 2, 20123 Milano',
				telefono: '02 0202',
				sito: 'https://www.comune.milano.it',
				orari: 'Martedì e giovedì 10:00–13:00, su appuntamento',
				note: 'Servizio gratuito di orientamento per persone transgender: informazioni su percorsi sanitari, supporto per documenti, mediazione con servizi pubblici e datori di lavoro.'
			},
			{
				nome: 'Sportello Antidiscriminazione UNAR — Nodo di Milano',
				tipo: 'antidiscriminazione',
				ente: 'UNAR / Comune di Milano',
				citta: 'Milano',
				indirizzo: 'Via Dogana 2, 20123 Milano',
				telefono: '800 901 010',
				sito: 'https://www.unar.it',
				orari: 'Lunedì–venerdì 9:00–18:00 (numero verde)',
				note: 'Raccoglie segnalazioni di discriminazione basata su identità di genere. Offre consulenza gratuita e, se necessario, supporto legale tramite la rete territoriale.'
			},
			{
				nome: 'Sportello di Ascolto Psicologico — CIG Niguarda',
				tipo: 'psicologico',
				ente: 'ASST Grande Ospedale Metropolitano Niguarda',
				citta: 'Milano',
				indirizzo: 'Piazza dell\'Ospedale Maggiore 3, 20162 Milano',
				telefono: '02 6444 2021',
				orari: 'Su appuntamento tramite CIG',
				note: 'Colloqui di sostegno psicologico per persone in fase di valutazione o già in percorso. Accessibile anche ai familiari. Servizio SSN con impegnativa.'
			}
		],
		iter_sanitario: {
			intro: 'A Milano il percorso di affermazione di genere fa riferimento principalmente al CIG dell\'Ospedale Niguarda, centro multidisciplinare riconosciuto a livello nazionale. In Lombardia le ASL sono state sostituite dalle ATS (Agenzie di Tutela della Salute) e dalle ASST (Aziende Socio Sanitarie Territoriali): l\'impegnativa per la prima visita si richiede al proprio medico di medicina generale. Il CIG coordina l\'intero percorso, dalla valutazione psicodiagnostica alla chirurgia, all\'interno del Servizio Sanitario Nazionale.',
			passi: [
				{
					ordine: 1,
					titolo: 'Richiesta impegnativa al medico di base',
					descrizione: 'Il primo passo è rivolgersi al proprio medico di medicina generale per ottenere un\'impegnativa per "visita psicologica clinica" o "prima visita endocrinologica" indirizzata al CIG Niguarda. In Lombardia l\'impegnativa passa attraverso il sistema ATS/ASST. Non è necessaria una diagnosi preventiva.',
					ente: 'Medico di medicina generale / ATS Milano',
					tempiStimati: '1–2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicodiagnostica al CIG',
					descrizione: 'Il CIG Niguarda effettua una valutazione psicodiagnostica attraverso colloqui clinici (generalmente 4–8 incontri). L\'équipe multidisciplinare include psicologi, psichiatri e altri specialisti. Al termine viene redatta una relazione che attesta l\'incongruenza di genere.',
					ente: 'CIG — Ospedale Niguarda',
					tempiStimati: '3–8 mesi (inclusa lista d\'attesa)'
				},
				{
					ordine: 3,
					titolo: 'Avvio della terapia ormonale',
					descrizione: 'Con la relazione psicodiagnostica, l\'endocrinologo del CIG o di altro centro convenzionato prescrive la terapia ormonale sostitutiva (testosterone o estrogeni/antiandrogeni). I farmaci sono coperti dal SSN con esenzione specifica. Sono previsti controlli ematici periodici.',
					ente: 'Endocrinologia CIG Niguarda / Policlinico',
					tempiStimati: 'Avvio entro 1–2 mesi dalla relazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica presso il Tribunale di Milano',
					descrizione: 'La richiesta di rettificazione di sesso e nome sui documenti si presenta al Tribunale di Milano tramite ricorso in volontaria giurisdizione. Dal 2015 (sentenza Corte Costituzionale 221/2015) non è più obbligatorio l\'intervento chirurgico.',
					ente: 'Tribunale Ordinario di Milano',
					tempiStimati: '6–18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Interventi chirurgici (facoltativi)',
					descrizione: 'Gli interventi di affermazione di genere (mastectomia, vaginoplastica, falloplastica, mammoplastica e altri) sono disponibili presso il CIG Niguarda e sono coperti dal SSN. La decisione è personale e non vincolante per la rettificazione anagrafica.',
					ente: 'Chirurgia CIG Niguarda',
					tempiStimati: '12–24 mesi di lista d\'attesa'
				}
			],
			note_importanti: [
				'In Lombardia le ex-ASL sono state sostituite da ATS e ASST: l\'impegnativa si fa sempre tramite il medico di base, ma il sistema organizzativo è diverso da altre regioni.',
				'Il CIG dell\'Ospedale Niguarda è centro di riferimento nazionale e gestisce l\'intero percorso in équipe multidisciplinare (psicologi, endocrinologi, chirurghi, logopedisti).',
				'La terapia ormonale è coperta dal SSN con esenzione per patologia. I farmaci vengono prescritti dall\'endocrinologo e possono essere ritirati in farmacia con ricetta rossa.',
				'Dal 2015, a seguito della sentenza 221/2015 della Corte Costituzionale, la rettificazione anagrafica non richiede interventi chirurgici.'
			]
		},
		storia_queer: {
			intro: 'Milano è stata storicamente una delle città italiane più centrali per il movimento transgender, ospitando le prime forme organizzate di attivismo trans già alla fine degli anni Settanta e diventando sede di conquiste giuridiche e sociali fondamentali.',
			eventi: [
				{
					anno: 1979,
					titolo: 'Primi collettivi trans a Milano',
					descrizione: 'Alla fine degli anni Settanta nascono a Milano i primi collettivi organizzati di persone transessuali, in dialogo con il movimento femminista e quello omosessuale. Queste realtà pionieristiche pongono le basi per la futura legislazione.'
				},
				{
					anno: 1982,
					titolo: 'Legge 164 — Milano tra le prime ad applicarla',
					descrizione: 'Con l\'approvazione della Legge 164/1982, che consente la rettificazione anagrafica del sesso, Milano è tra le prime città italiane dove i tribunali applicano la nuova normativa.'
				},
				{
					anno: 2002,
					titolo: 'Primo Trans Pride italiano',
					descrizione: 'Nel 2002 si tiene a Milano il primo Trans Pride d\'Italia, una manifestazione dedicata specificamente alla visibilità e ai diritti delle persone transgender. L\'evento segna un momento fondamentale di affermazione identitaria.'
				},
				{
					anno: 2019,
					titolo: 'Protesta della piscina Cozzi',
					descrizione: 'Nel 2019 una donna transgender viene allontanata dalla piscina comunale Cozzi di Milano. L\'episodio genera un\'ampia mobilitazione cittadina e un dibattito nazionale sull\'accesso agli spazi pubblici per le persone trans.'
				},
				{
					anno: 2024,
					titolo: 'Alias universitari consolidati',
					descrizione: 'Entro il 2024 tutti i principali atenei milanesi — Statale, Bicocca, Politecnico, Bocconi, Cattolica e IULM — hanno attivato la carriera alias per studenti transgender e non binari.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso presso il CIG dell\'Ospedale Niguarda?',
				risposta: 'Per accedere al CIG Niguarda è necessaria un\'impegnativa del medico di medicina generale per "visita psicologica clinica". Con l\'impegnativa si può prenotare la prima visita tramite il CUP regionale (numero 800 638 638) o presso gli sportelli dell\'ASST Niguarda. Non è richiesta una diagnosi preventiva.'
			},
			{
				domanda: 'Qual è la differenza tra ATS e ASL in Lombardia?',
				risposta: 'Dal 2016 in Lombardia le ASL sono state sostituite dalle ATS (Agenzie di Tutela della Salute), che svolgono funzioni di programmazione e controllo, e dalle ASST (Aziende Socio Sanitarie Territoriali), che erogano le prestazioni sanitarie. Per il percorso di transizione l\'impegnativa si ottiene sempre dal medico di base.'
			},
			{
				domanda: 'La terapia ormonale è gratuita a Milano?',
				risposta: 'Sì, la terapia ormonale sostitutiva per le persone transgender è coperta dal Servizio Sanitario Nazionale. Una volta ottenuta la prescrizione dall\'endocrinologo del CIG, i farmaci possono essere ritirati in farmacia con ricetta rossa e codice di esenzione.'
			},
			{
				domanda: 'Quanto tempo richiede la rettificazione anagrafica a Milano?',
				risposta: 'I tempi presso il Tribunale di Milano variano generalmente tra i 6 e i 18 mesi dalla presentazione del ricorso. È necessario presentare documentazione medica e psicologica che attesti il percorso di transizione.'
			},
			{
				domanda: 'Esistono gruppi di supporto per famiglie di persone trans a Milano?',
				risposta: 'Sì, diversi. AGEDO Lombardia organizza incontri mensili per genitori e familiari di persone trans a Milano. Anche ALA Milano e Arcigay Milano offrono gruppi di confronto per famiglie. Il CIG Niguarda stesso prevede colloqui di supporto per i familiari.'
			},
			{
				domanda: 'È possibile scegliere un medico di base trans-friendly a Milano?',
				risposta: 'Non esiste una lista ufficiale, ma le associazioni milanesi come ALA Milano e Arcigay possono suggerire medici di medicina generale sensibili alle tematiche di genere. Se il proprio medico di base rifiuta l\'impegnativa, si può segnalare il caso all\'Ordine dei Medici di Milano.'
			},
			{
				domanda: 'Cos\'è il centro per la disforia di genere a Milano e come si accede?',
				risposta: 'Il principale centro di riferimento è il CIG (Centro Interdipartimentale per l\'Incongruenza di Genere) dell\'Ospedale Niguarda. Per accedere serve un\'impegnativa del medico di base per "visita psicologica clinica", con cui si prenota la prima visita tramite il CUP regionale (800 638 638) o gli sportelli ASST Niguarda. Non serve una diagnosi preventiva. Il CIG offre un percorso completo: valutazione psicodiagnostica, endocrinologia, logopedia e chirurgia, tutto all\'interno del SSN.'
			},
			{
				domanda: 'Quali sono i tempi di attesa per iniziare la transizione a Milano?',
				risposta: 'I tempi variano in base al servizio richiesto. Per il primo colloquio psicodiagnostico al CIG Niguarda la lista d\'attesa è significativa: nel 2023 risultavano circa 140 persone in attesa. La fase di valutazione dura generalmente 3-8 mesi (inclusa l\'attesa). Dopo la relazione psicodiagnostica, l\'avvio della terapia ormonale richiede 1-2 mesi. I tempi complessivi dipendono molto dal momento in cui si presenta la richiesta. Rivolgersi alle associazioni locali come ALA Milano può aiutare a orientarsi e velocizzare i passaggi burocratici.'
			},
			{
				domanda: 'Il percorso di transizione a Milano è a carico del SSN o a pagamento?',
				risposta: 'Il percorso presso il CIG Niguarda è coperto dal Servizio Sanitario Nazionale. La valutazione psicodiagnostica, le visite endocrinologiche e gli interventi chirurgici sono erogati in regime SSN con il pagamento del solo ticket (dove previsto). Dal 1 ottobre 2020, grazie a due determine AIFA, anche i farmaci per la terapia ormonale (testosterone, estrogeni, antiandrogeni) sono completamente a carico del SSN, con ricetta rossa e codice di esenzione. La rettificazione anagrafica presso il Tribunale ha costi legali che possono essere azzerati con il gratuito patrocinio (ISEE sotto i 12.838,01 euro).'
			},
			{
				domanda: 'Esistono associazioni a Milano che supportano le famiglie di persone trans?',
				risposta: 'Sì, la realtà principale è AGEDO Milano (Associazione di Genitori, Parenti e Amici di persone LGBT+), che organizza incontri mensili di confronto per genitori e familiari di persone trans. Negli ultimi anni AGEDO ha accolto un numero crescente di genitori di giovani transgender e non binari. Anche Arcigay Milano offre gruppi dedicati alle famiglie, e il CIG Niguarda prevede colloqui di supporto psicologico per i familiari delle persone in percorso.'
			},
			{
				domanda: 'Come si inizia un percorso di transizione a Milano?',
				risposta: 'Il primo passo è rivolgersi al proprio medico di medicina generale per ottenere un\'impegnativa per "visita psicologica clinica" indirizzata al CIG dell\'Ospedale Niguarda. Con l\'impegnativa si prenota la prima visita tramite CUP regionale o sportelli ASST. In parallelo, è molto utile contattare un\'associazione come ALA Milano o Arcigay Milano: possono offrire orientamento, supporto tra pari e aiutarti a capire cosa aspettarti dal percorso. Non è necessario avere una diagnosi preventiva né aver già iniziato alcun trattamento.'
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
		ultimoAggiornamento: '2026-02-25'
	},
	{
		slug: 'bologna',
		nome: 'Bologna',
		regione: 'Emilia-Romagna',
		provincia: 'BO',
		intro: 'Bologna è storicamente una delle città più progressiste d\'Italia per i diritti delle persone transgender. Sede nazionale del MIT (Movimento Identità Trans), fondato nel 1982, la città rappresenta un punto di riferimento per l\'attivismo e i servizi dedicati alle persone trans in tutto il Paese. La presenza dell\'Università di Bologna e del Cassero LGBTQ+ Center contribuisce a creare un tessuto sociale particolarmente inclusivo e attento alle tematiche di genere. Il Policlinico Sant\'Orsola-Malpighi offre un percorso di affermazione di genere strutturato e multidisciplinare, riconosciuto a livello nazionale.',
		metaDescription: 'Guida completa alle risorse trans a Bologna: centri gender al Sant\'Orsola, MIT, Cassero LGBTQ+, sportelli, iter sanitario e storia queer della città.',
		contesto_locale: 'Bologna occupa un posto unico nella storia dei diritti delle persone transgender in Italia. Qui ha sede il MIT (Movimento Identità Trans), fondato nel 1979 come Movimento Italiano Transessuali e attivo nella sede bolognese dal 1988 — l\'unico nucleo MIT ancora operativo a livello nazionale. Nel 1994 il Comune di Bologna concesse al MIT una sede propria in via Polese 22, dando vita al primo consultorio al mondo gestito direttamente da persone trans. Nel 1995 Marcella Di Folco, presidente del MIT, fu eletta consigliera comunale di Bologna con i Verdi, diventando la prima donna trans al mondo a ricoprire una carica elettiva. Nel 2023 il Comune di Bologna ha introdotto la carriera alias per dipendenti comunali e cittadini, primo comune in Italia a farlo sia per il personale sia per chi accede ai servizi pubblici. La rete sanitaria fa perno sul Policlinico Sant\'Orsola-Malpighi, centro di riferimento regionale dell\'Emilia-Romagna, e sul consultorio MIT convenzionato con l\'AUSL di Bologna, che offre supporto psicologico, endocrinologico e accompagnamento ai servizi sanitari tramite SSN.',
		centri_gender_intro: 'A Bologna il percorso di affermazione di genere è coordinato dal Centro per la Salute delle Persone Trans del Policlinico Sant\'Orsola-Malpighi, centro di riferimento regionale. L\'accesso avviene tramite impegnativa del medico di base per visita psicologica clinica; l\'équipe multidisciplinare include endocrinologi, psicologi, chirurghi plastici e urologi. L\'AUSL di Bologna offre inoltre un ambulatorio dedicato all\'identità di genere in via Altura. I tempi di attesa per il primo appuntamento al Sant\'Orsola possono variare da 2 a 6 mesi, e tutte le prestazioni sono coperte dal SSN.',
		associazioni_intro: 'Il MIT (Movimento Identità Trans) è il principale punto di riferimento per le persone trans a Bologna e in tutta Italia, con servizi gratuiti di sportello di ascolto, supporto legale, accompagnamento sanitario, accoglienza abitativa e inserimento lavorativo. Il Cassero LGBTQ+ Center offre sportello legale, gruppi di auto-mutuo-aiuto e attività culturali dedicate anche alle persone trans e non binarie. Il Gruppo Trans APS, anch\'esso attivo a Bologna, gestisce lo Sportello APAG per l\'accompagnamento al percorso di affermazione di genere e il servizio nutrizionale Nutra in collaborazione con l\'AUSL.',
		sportelli_intro: 'Il Comune di Bologna ha sottoscritto un Patto di Collaborazione LGBTQIA+ che coinvolge oltre 20 associazioni e prevede 104 progetti su servizi, formazione e cultura. Lo Sportello Antidiscriminazioni (SPAD), gestito dal Comune presso il Centro Interculturale Zonarelli, accoglie e orienta vittime o testimoni di discriminazioni, comprese quelle basate sull\'identità di genere. Il Cassero LGBTQ+ Center gestisce inoltre un centro antidiscriminazione con sportello legale, sportello psicologico e il servizio Telefono Amico Cassero.',
		image: '/images/citta/bologna.webp',
		centri_gender: [
			{
				nome: 'Centro per la Salute delle Persone Trans e di Genere Non Conforme',
				citta: 'Bologna',
				indirizzo: 'Via Massarenti 9, 40138 Bologna (Policlinico Sant\'Orsola-Malpighi)',
				telefono: '051 2143500',
				sito: 'https://www.aosp.bo.it',
				note: 'Centro multidisciplinare di riferimento regionale con équipe composta da endocrinologi, psicologi, chirurghi plastici e urologi. Accesso tramite impegnativa del medico di base.'
			},
			{
				nome: 'Ambulatorio Identità di Genere AUSL Bologna',
				citta: 'Bologna',
				indirizzo: 'Via Altura 3, 40139 Bologna',
				telefono: '051 6584601',
				sito: 'https://www.ausl.bologna.it',
				note: 'Servizio di salute mentale dell\'AUSL con percorso psicologico dedicato alle persone in fase di esplorazione e affermazione dell\'identità di genere. Primo accesso tramite CUP.'
			}
		],
		associazioni: [
			{
				nome: 'MIT — Movimento Identità Trans',
				tipo: 'lgbtq',
				citta: 'Bologna',
				indirizzo: 'Via Polese 22, 40122 Bologna',
				telefono: '051 226601',
				email: 'info@mit-italia.it',
				sito: 'https://www.mit-italia.it',
				descrizione: 'Sede nazionale del Movimento Identità Trans, fondato nel 1982. Offre sportello di ascolto, supporto legale, accompagnamento ai servizi sanitari, accoglienza abitativa e progetti di inclusione lavorativa per persone trans.'
			},
			{
				nome: 'Cassero LGBTQ+ Center',
				tipo: 'lgbtq',
				citta: 'Bologna',
				indirizzo: 'Via Don Minzoni 18, 40121 Bologna',
				telefono: '051 6494416',
				email: 'info@cassero.it',
				sito: 'https://www.cassero.it',
				descrizione: 'Storico centro LGBTQ+ di Bologna, punto di riferimento per la comunità con attività culturali, sportello legale, gruppi di auto-mutuo-aiuto e iniziative dedicate alle persone trans e non binarie.'
			},
			{
				nome: 'Arcigay Il Cassero Bologna',
				tipo: 'lgbtq',
				citta: 'Bologna',
				indirizzo: 'Via Don Minzoni 18, 40121 Bologna',
				telefono: '051 6494416',
				email: 'bologna@arcigay.it',
				sito: 'https://www.arcigaybologna.it',
				descrizione: 'Sezione bolognese di Arcigay che opera all\'interno del Cassero. Organizza attività di sensibilizzazione, eventi culturali e offre supporto alla comunità LGBTQ+ con attenzione specifica alle persone transgender.'
			},
			{
				nome: 'AGEDO Emilia-Romagna',
				tipo: 'genitori',
				citta: 'Bologna',
				indirizzo: 'Via Don Minzoni 18, 40121 Bologna',
				email: 'emiliaromagna@agedo.org',
				sito: 'https://www.agedo.org',
				descrizione: 'Sezione regionale dell\'associazione di genitori, parenti e amici di persone LGBTQ+. Offre gruppi di sostegno per le famiglie di persone trans e incontri di condivisione mensili.'
			},
			{
				nome: 'Consultorio Transgenere — SOS Donna',
				tipo: 'salute_mentale',
				citta: 'Bologna',
				indirizzo: 'Via Tagliacozzi 4, 40122 Bologna',
				telefono: '051 233779',
				sito: 'https://www.sosdonna.com',
				descrizione: 'Servizio di consulenza psicologica e supporto specifico per persone transgender e gender non-conforming, con particolare attenzione ai percorsi di autodeterminazione e benessere psicologico.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto MIT',
				tipo: 'sociale',
				ente: 'MIT — Movimento Identità Trans',
				citta: 'Bologna',
				indirizzo: 'Via Polese 22, 40122 Bologna',
				telefono: '051 226601',
				email: 'sportello@mit-italia.it',
				orari: 'Lunedì e giovedì 10:00-13:00, martedì e mercoledì 15:00-18:00',
				note: 'Sportello storico del MIT che offre accoglienza, orientamento ai servizi sanitari e sociali, supporto nella ricerca di lavoro e alloggio, e accompagnamento nei percorsi di transizione.'
			},
			{
				nome: 'Sportello Legale Cassero',
				tipo: 'legale',
				ente: 'Cassero LGBTQ+ Center',
				citta: 'Bologna',
				indirizzo: 'Via Don Minzoni 18, 40121 Bologna',
				telefono: '051 6494416',
				email: 'legale@cassero.it',
				orari: 'Mercoledì 18:00-20:00 su appuntamento',
				note: 'Consulenza legale gratuita su rettifica anagrafica, cambio nome e genere sui documenti, discriminazioni sul lavoro e tutela dei diritti delle persone transgender.'
			},
			{
				nome: 'Sportello Antidiscriminazione UNAR',
				tipo: 'antidiscriminazione',
				ente: 'Comune di Bologna — UNAR',
				citta: 'Bologna',
				indirizzo: 'Piazza Liber Paradisus 10, 40129 Bologna',
				telefono: '800 901010',
				note: 'Punto di contatto locale della rete UNAR per segnalare episodi di discriminazione basata sull\'identità di genere. Offre orientamento, mediazione e supporto nella presentazione di denunce.'
			}
		],
		iter_sanitario: {
			intro: 'A Bologna il percorso di affermazione di genere è coordinato dal Centro per la Salute delle Persone Trans presso il Policlinico Sant\'Orsola-Malpighi, centro di riferimento regionale dell\'Emilia-Romagna. L\'AUSL di Bologna offre inoltre un servizio di salute mentale con competenze specifiche sull\'identità di genere. L\'accesso ai servizi avviene tramite il Servizio Sanitario Nazionale con impegnativa del medico di base.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto e accoglienza',
					descrizione: 'Il primo passo è rivolgersi al proprio medico di base per ottenere un\'impegnativa per il Centro per la Salute delle Persone Trans al Policlinico Sant\'Orsola-Malpighi, oppure contattare direttamente l\'Ambulatorio Identità di Genere dell\'AUSL Bologna. È possibile anche rivolgersi al MIT per un orientamento iniziale.',
					ente: 'Medico di base / AUSL Bologna',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica e psichiatrica',
					descrizione: 'Si avvia un percorso di valutazione psicodiagnostica con professionisti specializzati in disforia di genere. Il percorso prevede colloqui clinici approfonditi e, se necessario, test psicodiagnostici.',
					ente: 'Policlinico Sant\'Orsola-Malpighi',
					tempiStimati: '6-12 mesi'
				},
				{
					ordine: 3,
					titolo: 'Terapia ormonale sostitutiva',
					descrizione: 'Dopo la valutazione psicologica, l\'endocrinologo del centro prescrive la terapia ormonale sostitutiva personalizzata. Il monitoraggio prevede esami del sangue regolari e visite endocrinologiche periodiche.',
					ente: 'Endocrinologia — Sant\'Orsola-Malpighi',
					tempiStimati: '1-2 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Percorso legale e cambio documenti',
					descrizione: 'Con il supporto dello sportello legale del Cassero o del MIT, è possibile avviare la procedura di rettifica anagrafica presso il Tribunale di Bologna. Il cambio dei documenti può essere ottenuto anche senza interventi chirurgici.',
					ente: 'Tribunale Civile di Bologna',
					tempiStimati: '6-14 mesi'
				},
				{
					ordine: 5,
					titolo: 'Eventuali interventi chirurgici',
					descrizione: 'Per chi desidera interventi chirurgici di affermazione di genere, il Policlinico Sant\'Orsola-Malpighi dispone di équipe di chirurgia plastica e urologia con esperienza specifica. L\'accesso avviene tramite SSN.',
					ente: 'Chirurgia — Sant\'Orsola-Malpighi',
					tempiStimati: '1-2 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'I tempi di attesa per il primo appuntamento al Centro del Sant\'Orsola-Malpighi possono variare da 2 a 6 mesi. È consigliabile prenotare il prima possibile e nel frattempo rivolgersi al MIT per supporto.',
				'L\'Emilia-Romagna è una delle regioni con il percorso più strutturato in Italia. Tutte le prestazioni relative al percorso di affermazione di genere sono coperte dal SSN.',
				'Il MIT offre un servizio di accompagnamento alle visite mediche e può facilitare il rapporto con le strutture sanitarie.',
				'Dal 2023 l\'AUSL Bologna ha attivato un percorso dedicato ai minori transgender, con un\'équipe multidisciplinare che include neuropsichiatra infantile, psicologo e pediatra endocrinologo.'
			]
		},
		storia_queer: {
			intro: 'Bologna vanta una delle storie più ricche d\'Italia per quanto riguarda i diritti e la visibilità delle persone transgender. Città universitaria per eccellenza e tradizionalmente progressista, è stata pioniera nell\'attivismo trans e nella creazione di servizi dedicati.',
			eventi: [
				{
					anno: 1982,
					titolo: 'Fondazione del MIT — Movimento Identità Trans',
					descrizione: 'A Bologna nasce il MIT, una delle prime organizzazioni al mondo specificamente dedicate ai diritti e al supporto delle persone transgender. Fondato da attiviste trans, il MIT diventa rapidamente un punto di riferimento nazionale e internazionale.'
				},
				{
					anno: 1985,
					titolo: 'Nascita del Cassero',
					descrizione: 'Il Comune di Bologna concede gli spazi dell\'ex porta di Strada Maggiore al Circolo Culturale 28 Giugno, dando vita al Cassero, che diventerà uno dei centri LGBTQ+ più importanti d\'Europa.'
				},
				{
					anno: 1995,
					titolo: 'Bologna pioniera nei diritti civili',
					descrizione: 'Il Comune di Bologna si distingue come una delle prime amministrazioni italiane a riconoscere informalmente le coppie di fatto, incluse quelle dello stesso sesso, aprendo un dibattito nazionale sui diritti civili.'
				},
				{
					anno: 2012,
					titolo: 'Registro delle unioni civili',
					descrizione: 'Bologna istituisce ufficialmente il Registro delle Unioni Civili, permettendo la registrazione delle coppie di fatto indipendentemente dal genere dei partner.'
				},
				{
					anno: 2022,
					titolo: 'Alias carriera nei servizi comunali',
					descrizione: 'Il Comune di Bologna approva l\'introduzione dell\'alias carriera nei servizi comunali, permettendo alle persone transgender in transizione di utilizzare il nome scelto nei rapporti con l\'amministrazione comunale.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come accedere al Centro per la Salute delle Persone Trans al Sant\'Orsola di Bologna?',
				risposta: 'Per accedere al Centro è necessaria un\'impegnativa del medico di base. Si può quindi prenotare telefonicamente o tramite il CUP dell\'AUSL. I tempi di attesa per la prima visita variano da 2 a 6 mesi. È consigliabile rivolgersi al MIT per orientamento e supporto durante l\'attesa.'
			},
			{
				domanda: 'Il MIT di Bologna offre servizi gratuiti?',
				risposta: 'Sì, il MIT offre numerosi servizi gratuiti tra cui sportello di ascolto, orientamento ai servizi sanitari, supporto legale, accompagnamento alle visite mediche, accoglienza abitativa temporanea e progetti di inserimento lavorativo. I servizi sono rivolti a tutte le persone trans, indipendentemente dalla residenza.'
			},
			{
				domanda: 'È possibile iniziare la terapia ormonale a Bologna senza passare da uno psicologo privato?',
				risposta: 'Sì, a Bologna l\'intero percorso può essere svolto attraverso il Servizio Sanitario Nazionale. La valutazione psicologica è effettuata dai professionisti del Centro al Sant\'Orsola-Malpighi o dell\'Ambulatorio AUSL, e la terapia ormonale viene prescritta dall\'endocrinologo del centro.'
			},
			{
				domanda: 'Quali documenti servono per la rettifica anagrafica al Tribunale di Bologna?',
				risposta: 'Per la rettifica anagrafica occorre presentare la documentazione medica del percorso di affermazione di genere (relazione psicologica, certificazione endocrinologica), un certificato di nascita aggiornato e un documento d\'identità. Lo sportello legale del Cassero e il MIT offrono consulenza gratuita.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans a Bologna?',
				risposta: 'Sì, a Bologna sono attivi diversi gruppi di supporto. Il MIT organizza incontri settimanali per persone trans, il Cassero propone gruppi di auto-mutuo-aiuto per persone trans e non binarie, e AGEDO Emilia-Romagna tiene incontri mensili per familiari. Tutti i gruppi sono gratuiti.'
			},
			{
				domanda: 'Bologna offre servizi per minori transgender?',
				risposta: 'Sì, dal 2023 l\'AUSL Bologna ha attivato un percorso dedicato ai minori transgender presso il servizio di Neuropsichiatria dell\'Infanzia e dell\'Adolescenza, con un\'équipe che include neuropsichiatra, psicologo e pediatra endocrinologo. Anche il MIT offre supporto e orientamento per famiglie con minori trans.'
			},
			{
				domanda: 'Cos\'è il centro per la disforia di genere a Bologna e come si accede?',
				risposta: 'Il Centro per la Salute delle Persone Trans al Policlinico Sant\'Orsola-Malpighi è il centro di riferimento regionale dell\'Emilia-Romagna per i percorsi di affermazione di genere. L\'accesso avviene tramite impegnativa del medico di base per visita psicologica clinica. L\'équipe multidisciplinare comprende psicologi, endocrinologi, chirurghi plastici e urologi. Il percorso è interamente coperto dal Servizio Sanitario Nazionale. In alternativa, è possibile rivolgersi al consultorio del MIT, convenzionato con AUSL e Sant\'Orsola, che offre supporto psicoterapeutico ed endocrinologico.'
			},
			{
				domanda: 'Quali sono i tempi di attesa per la transizione a Bologna?',
				risposta: 'I tempi di attesa per il primo appuntamento al Centro del Policlinico Sant\'Orsola-Malpighi possono variare da 2 a 6 mesi. La fase di valutazione psicologica richiede generalmente dai 6 ai 12 mesi, dopo i quali si può accedere alla terapia ormonale sostitutiva (1-2 mesi dalla valutazione). Per gli eventuali interventi chirurgici, la lista d\'attesa può essere di 1-2 anni. Nel frattempo, è consigliabile rivolgersi al MIT per supporto e accompagnamento durante l\'attesa.'
			},
			{
				domanda: 'Cos\'è il MIT di Bologna e cosa offre alle persone trans?',
				risposta: 'Il MIT (Movimento Identità Trans) è la più antica associazione trans d\'Italia, fondata nel 1979 e con sede operativa a Bologna dal 1988 in via Polese 22. Offre gratuitamente sportello di ascolto, consultorio psicologico convenzionato con l\'AUSL, supporto legale, accompagnamento ai servizi sanitari, accoglienza abitativa per persone in emergenza, e progetti di inserimento lavorativo. Il MIT ha anche un ruolo storico: ha contribuito all\'approvazione della Legge 164/1982 e nel 1994 ha aperto il primo consultorio al mondo gestito da persone trans.'
			},
			{
				domanda: 'Esistono servizi di supporto per le famiglie di persone trans a Bologna?',
				risposta: 'Sì, a Bologna AGEDO Emilia-Romagna (con sede presso il Cassero, via Don Minzoni 18) organizza gruppi di sostegno mensili per genitori, parenti e amici di persone LGBTQ+, incluse le famiglie di persone trans. Il consultorio del MIT offre supporto psicologico dedicato alle coppie e alle famiglie. Il Patto di Collaborazione LGBTQIA+ del Comune prevede inoltre incontri di community building aperti a persone transgender e ai loro familiari, organizzati dal Gruppo Trans APS.'
			},
			{
				domanda: 'Come si inizia il percorso di transizione a Bologna?',
				risposta: 'Per iniziare il percorso a Bologna ci sono diverse opzioni. La via principale è richiedere al proprio medico di base un\'impegnativa per il Centro per la Salute delle Persone Trans al Sant\'Orsola-Malpighi. È anche possibile contattare l\'Ambulatorio Identità di Genere dell\'AUSL Bologna (via Altura 3) tramite CUP, oppure il consultorio del MIT (051 271666) che offre orientamento e accompagnamento gratuiti. Il MIT è spesso il primo punto di contatto consigliato, poiché può guidarti nella scelta del percorso più adatto e ridurre i tempi di attesa attraverso l\'accompagnamento ai servizi.'
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
		ultimoAggiornamento: '2026-02-25'
	},
	{
		slug: 'roma',
		nome: 'Roma',
		regione: 'Lazio',
		provincia: 'RM',
		intro: 'Roma ospita il SAIFIP (Servizio di Adeguamento tra Identità Fisica e Identità Psichica) presso il Policlinico Umberto I, attivo dal 1992 e punto di riferimento nazionale per i percorsi di affermazione di genere. Il Circolo di Cultura Omosessuale Mario Mieli è uno dei più grandi centri LGBTQ+ d\'Italia, offrendo servizi dedicati anche alle persone trans. Roma è stata la città di Marcella Di Folco, figura storica del movimento trans italiano, e ha ospitato il World Pride nel 2000. Il Roma Pride raccoglie ogni anno centinaia di migliaia di partecipanti, confermando la capitale come epicentro delle lotte per i diritti civili in Italia.',
		metaDescription: 'Guida completa alle risorse trans a Roma: SAIFIP al Policlinico Umberto I, Circolo Mario Mieli, associazioni, sportelli e iter sanitario nel Lazio.',
		contesto_locale: 'Roma è il cuore istituzionale e storico dei diritti delle persone transgender in Italia. Il SAIFIP (Servizio per l\'Adeguamento tra Identità Fisica e Identità Psichica), istituito nel 1992 presso l\'Ospedale San Camillo-Forlanini, è stato il primo servizio pubblico italiano dedicato ai percorsi di affermazione di genere e resta un punto di riferimento nazionale. Dal 2024, il SAIFIP afferisce alla UOSD Area per la Cura delle Relazioni dello stesso ospedale. Il Policlinico Umberto I offre un ambulatorio di endocrinologia e andrologia che segue pazienti con incongruenza di genere. Roma ospita inoltre la sede dell\'UNAR (Ufficio Nazionale Antidiscriminazioni Razziali), organo della Presidenza del Consiglio che raccoglie segnalazioni di discriminazione basate anche sull\'identità di genere tramite il numero verde 800 901 010. Il primo Roma Pride si è tenuto il 2 luglio 1994, organizzato dal Circolo Mario Mieli, con la partecipazione di circa 10.000 persone. Nel 2000 Roma ha ospitato il primo World Pride della storia. Il Circolo di Cultura Omosessuale Mario Mieli, fondato nel 1983, è una delle più grandi organizzazioni LGBTQ+ italiane e dal 1994 organizza la parata annuale del Pride nella capitale.',
		centri_gender_intro: 'A Roma i servizi per l\'incongruenza di genere fanno perno sul SAIFIP dell\'Ospedale San Camillo-Forlanini, attivo dal 1992, che offre un percorso multidisciplinare con psicologi, psicoterapeuti, endocrinologi e chirurghi. L\'accesso avviene tramite impegnativa del medico di base; lo sportello informativo del SAIFIP è attivo il lunedì (14:00-17:00) e il mercoledì (9:00-11:00). Il Policlinico Umberto I dispone inoltre di un ambulatorio di endocrinologia che segue pazienti in terapia ormonale per incongruenza di genere.',
		associazioni_intro: 'Roma dispone di una rete associativa solida e diversificata. Il Circolo di Cultura Omosessuale Mario Mieli, fondato nel 1983, offre Sportello Trans, consulenza legale, supporto psicologico e organizza il Roma Pride dal 1994. L\'Associazione Libellula, attiva dal 1997, è specificamente dedicata al supporto delle persone trans con sportello psicologico, accompagnamento nei percorsi di affermazione di genere e unità di strada. Arcigay Roma, Di\' Gay Project e AGEDO Lazio completano la rete di servizi con sportello legale, prevenzione sanitaria e supporto alle famiglie.',
		sportelli_intro: 'Roma offre diversi servizi pubblici e convenzionati di supporto e contrasto alle discriminazioni. Il progetto Welcome4Rainbow, finanziato dall\'UNAR e gestito dal Circolo Mario Mieli con le associazioni Libellula, Cirses e Rete Lenford, garantisce accoglienza 24 ore su 24 tramite la RainbowLine e sportelli di ascolto in diversi Municipi della città. L\'UNAR, con sede a Largo Chigi, raccoglie segnalazioni di discriminazione attraverso il numero verde gratuito 800 901 010 (lunedì-venerdì, 8:00-17:00) e tramite il sito unar.it.',
		image: '/images/citta/roma.webp',
		centri_gender: [
			{
				nome: 'SAIFIP — Policlinico Umberto I',
				citta: 'Roma',
				indirizzo: 'Viale del Policlinico 155, 00161 Roma',
				telefono: '06 4997 2693',
				sito: 'https://www.policlinicoumberto1.it',
				note: 'Attivo dal 1992, è il centro di riferimento nazionale per i percorsi di affermazione di genere. Offre supporto psicologico, endocrinologico e chirurgico. Accesso tramite impegnativa del medico di base.'
			},
			{
				nome: 'Ambulatorio Disforia di Genere — Ospedale San Camillo-Forlanini',
				citta: 'Roma',
				indirizzo: 'Circonvallazione Gianicolense 87, 00152 Roma',
				telefono: '06 5870 4735',
				sito: 'https://www.scamilloforlanini.rm.it',
				note: 'Ambulatorio dedicato all\'interno del Dipartimento di Salute Mentale. Offre valutazione psicodiagnostica e supporto psicologico per persone con incongruenza di genere.'
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
				descrizione: 'Uno dei più grandi centri LGBTQ+ d\'Italia. Offre Sportello Trans, supporto psicologico, consulenza legale, gruppi di mutuo aiuto e organizza il Roma Pride.'
			},
			{
				nome: 'Arcigay Roma',
				tipo: 'lgbtq',
				citta: 'Roma',
				indirizzo: 'Via Nicola Zabaglia 14, 00153 Roma',
				telefono: '06 6450 1102',
				sito: 'https://www.arcigayroma.it',
				descrizione: 'Sezione romana di Arcigay. Sportello legale, supporto psicologico, gruppi di socializzazione, sportello lavoro e consulenza sui diritti per persone LGBTQ+.'
			},
			{
				nome: 'Di\' Gay Project — DGP',
				tipo: 'lgbtq',
				citta: 'Roma',
				indirizzo: 'Via Nicola Zabaglia 14, 00153 Roma',
				sito: 'https://www.digayproject.org',
				descrizione: 'Prevenzione sanitaria, test HIV e IST, consulenza tra pari e progetti di inclusione sociale per persone trans.'
			},
			{
				nome: 'AGEDO Lazio',
				tipo: 'genitori',
				citta: 'Roma',
				indirizzo: 'Via Efeso 2, 00154 Roma',
				sito: 'https://www.agedo.org',
				descrizione: 'Supporto a genitori e familiari di persone LGBTQ+, gruppi di ascolto, consulenza familiare e sensibilizzazione nelle scuole.'
			},
			{
				nome: 'Libellula',
				tipo: 'lgbtq',
				citta: 'Roma',
				indirizzo: 'Via Efeso 2, 00154 Roma',
				sito: 'https://www.mariomieli.net',
				descrizione: 'Progetto del Circolo Mario Mieli dedicato alle persone trans: sportello, accompagnamento nei percorsi di transizione, gruppi di auto-mutuo aiuto e orientamento ai servizi sanitari.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans — Circolo Mario Mieli',
				tipo: 'sociale',
				ente: 'Circolo di Cultura Omosessuale Mario Mieli',
				citta: 'Roma',
				indirizzo: 'Via Efeso 2, 00154 Roma',
				telefono: '06 541 3985',
				orari: 'Mercoledì 17:00-19:00, su appuntamento',
				note: 'Ascolto e accoglienza, orientamento al percorso di transizione, accompagnamento ai servizi sanitari e consulenza legale per cambio documenti.'
			},
			{
				nome: 'UNAR — Ufficio Nazionale Antidiscriminazioni Razziali',
				tipo: 'antidiscriminazione',
				ente: 'Presidenza del Consiglio dei Ministri',
				citta: 'Roma',
				indirizzo: 'Largo Chigi 19, 00187 Roma',
				telefono: '800 901 010',
				orari: 'Lunedì–Venerdì 8:00–20:00',
				note: 'Contact center nazionale contro le discriminazioni basate su identità di genere. Segnalazione casi, mediazione e assistenza legale.'
			},
			{
				nome: 'Sportello Legale Arcigay Roma',
				tipo: 'legale',
				ente: 'Arcigay Roma',
				citta: 'Roma',
				indirizzo: 'Via Nicola Zabaglia 14, 00153 Roma',
				telefono: '06 6450 1102',
				orari: 'Giovedì 18:00-20:00, su appuntamento',
				note: 'Consulenza legale gratuita per rettifica anagrafica, discriminazioni sul lavoro e orientamento normativo.'
			}
		],
		iter_sanitario: {
			intro: 'A Roma il percorso di affermazione di genere ha come punto di riferimento principale il SAIFIP presso il Policlinico Umberto I, centro multidisciplinare attivo dal 1992 che integra supporto psicologico, endocrinologico e chirurgico. L\'accesso avviene tramite il Servizio Sanitario Nazionale con impegnativa del medico di base, attraverso la ASL Roma competente per territorio.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto e accesso al SAIFIP',
					descrizione: 'Richiedi al tuo medico di base un\'impegnativa per visita presso il SAIFIP del Policlinico Umberto I. In alternativa, puoi rivolgerti al tuo Distretto ASL Roma di appartenenza per un primo orientamento. Il Circolo Mario Mieli offre supporto nell\'orientamento iniziale.',
					ente: 'Medico di base / ASL Roma',
					tempiStimati: '1-3 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicodiagnostica',
					descrizione: 'Il SAIFIP prevede un percorso di valutazione psicologica e psicodiagnostica condotto da professionisti esperti in identità di genere. Il percorso ha una durata variabile, generalmente tra i 6 e i 12 mesi.',
					ente: 'SAIFIP — Policlinico Umberto I',
					tempiStimati: '6-12 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio della terapia ormonale',
					descrizione: 'Ottenuta la relazione psicodiagnostica, l\'endocrinologo del SAIFIP prescrive la terapia ormonale sostitutiva. I controlli endocrinologici periodici vengono effettuati presso lo stesso centro. I farmaci possono essere ritirati con ricetta SSN.',
					ente: 'Endocrinologia — SAIFIP',
					tempiStimati: '1-2 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettifica anagrafica presso il Tribunale di Roma',
					descrizione: 'Con la documentazione del SAIFIP è possibile presentare istanza al Tribunale Civile di Roma per la rettifica di sesso e nome sui documenti. Dal 2015, la Corte Costituzionale ha stabilito che l\'intervento chirurgico non è prerequisito obbligatorio.',
					ente: 'Tribunale Civile di Roma',
					tempiStimati: '6-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Eventuali interventi chirurgici',
					descrizione: 'Gli interventi chirurgici di affermazione di genere possono essere effettuati presso il Policlinico Umberto I o l\'Ospedale San Camillo-Forlanini. Il SAIFIP coordina l\'intero percorso chirurgico, inclusa la preparazione pre-operatoria e il follow-up.',
					ente: 'SAIFIP / San Camillo-Forlanini',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Il SAIFIP è raggiungibile con Metro B (fermata Policlinico). I tempi di attesa per il primo appuntamento possono superare i 6 mesi: è consigliabile prenotare il prima possibile.',
				'La Regione Lazio garantisce la copertura SSN per la terapia ormonale sostitutiva e per gli interventi chirurgici di affermazione di genere presso le strutture pubbliche.',
				'Dal 2022 il Comune di Roma ha attivato il Registro Alias, che consente di ottenere una tessera con il nome d\'elezione per i servizi comunali, anche prima della rettifica anagrafica.',
				'Il Circolo Mario Mieli e Libellula offrono gruppi di mutuo aiuto specifici per persone in transizione.'
			]
		},
		storia_queer: {
			intro: 'Roma è il cuore della storia dei diritti LGBTQ+ in Italia. Dalla capitale sono partite le prime manifestazioni, qui è stata approvata la Legge 164 e qui ha sede il Circolo Mario Mieli, fondato nel 1983 in memoria dell\'intellettuale e attivista.',
			eventi: [
				{
					anno: 1978,
					titolo: 'Prime manifestazioni LGBTQ+ a Roma',
					descrizione: 'Il 5 aprile 1978 si tiene a Roma una delle prime manifestazioni pubbliche del movimento omosessuale italiano, organizzata dal FUORI! e dai collettivi romani.'
				},
				{
					anno: 1982,
					titolo: 'Approvazione della Legge 164',
					descrizione: 'Il 14 aprile 1982 il Parlamento italiano approva la Legge 164 che consente la rettifica di attribuzione di sesso. L\'Italia diventa uno dei primi Paesi europei a riconoscere legalmente il percorso di transizione di genere.'
				},
				{
					anno: 1992,
					titolo: 'Apertura del SAIFIP al Policlinico Umberto I',
					descrizione: 'Nasce il SAIFIP, primo servizio pubblico italiano interamente dedicato ai percorsi di affermazione di genere. Diventa rapidamente il centro di riferimento nazionale per le persone trans.'
				},
				{
					anno: 1995,
					titolo: 'Marcella Di Folco eletta in consiglio comunale',
					descrizione: 'Marcella Di Folco, nata a Roma e figura centrale del movimento trans italiano, viene eletta nel consiglio comunale di Bologna. È la prima donna trans a ricoprire una carica elettiva in Italia.'
				},
				{
					anno: 2000,
					titolo: 'World Pride Roma',
					descrizione: 'Roma ospita il World Pride, la più grande manifestazione mondiale per i diritti LGBTQ+. Centinaia di migliaia di persone sfilano per le vie della capitale.'
				},
				{
					anno: 2022,
					titolo: 'Registro Alias del Comune di Roma',
					descrizione: 'Il Comune di Roma istituisce il Registro Alias, permettendo alle persone trans di ottenere una tessera con il nome d\'elezione per l\'accesso ai servizi comunali.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al SAIFIP del Policlinico Umberto I a Roma?',
				risposta: 'Per accedere al SAIFIP è necessaria un\'impegnativa del medico di base per "visita per disforia di genere" o "incongruenza di genere". Si può poi prenotare telefonando al numero 06 4997 2693. I tempi di attesa possono superare i 6 mesi.'
			},
			{
				domanda: 'Quali servizi offre il Circolo Mario Mieli per le persone trans a Roma?',
				risposta: 'Il Circolo Mario Mieli offre uno Sportello Trans con accoglienza e orientamento, gruppi di mutuo aiuto, consulenza legale gratuita per la rettifica anagrafica, supporto psicologico e accompagnamento ai servizi sanitari. Il progetto Libellula è specificamente dedicato alle persone trans.'
			},
			{
				domanda: 'La terapia ormonale è coperta dal SSN nella Regione Lazio?',
				risposta: 'Sì, la terapia ormonale sostitutiva per le persone trans è coperta dal Servizio Sanitario Nazionale nella Regione Lazio. La prescrizione viene effettuata dall\'endocrinologo del SAIFIP e i farmaci possono essere ritirati con ricetta SSN.'
			},
			{
				domanda: 'Come funziona il Registro Alias del Comune di Roma?',
				risposta: 'Il Registro Alias del Comune di Roma, attivo dal 2022, consente alle persone trans di ottenere una tessera con il nome d\'elezione per l\'accesso ai servizi comunali, alle biblioteche e ai centri sportivi. La richiesta si presenta presso l\'Ufficio Anagrafe del proprio Municipio.'
			},
			{
				domanda: 'Dove posso fare la rettifica anagrafica a Roma?',
				risposta: 'La rettifica anagrafica si richiede presso il Tribunale Civile di Roma (Viale Giulio Cesare 52). È necessario presentare istanza con la documentazione clinica del percorso di transizione. Non è più obbligatorio l\'intervento chirurgico. Lo Sportello Legale di Arcigay Roma offre consulenza gratuita.'
			},
			{
				domanda: 'Esistono risorse per minori trans a Roma?',
				risposta: 'Sì, il SAIFIP del Policlinico Umberto I offre un percorso dedicato ai minorenni con incongruenza di genere, che coinvolge la famiglia e prevede supporto psicologico specializzato. AGEDO Lazio offre inoltre supporto specifico per i genitori e le famiglie.'
			},
			{
				domanda: 'Cos\'è il centro per la disforia di genere a Roma e dove si trova?',
				risposta: 'Il principale centro per la disforia di genere (oggi chiamata incongruenza di genere) a Roma è il SAIFIP (Servizio per l\'Adeguamento tra Identità Fisica e Identità Psichica), istituito nel 1992 presso l\'Ospedale San Camillo-Forlanini in Via Bernardino Ramazzini 68, padiglione Maroncelli. L\'équipe multidisciplinare comprende psicologi, psicoterapeuti, endocrinologi e chirurghi. Il Policlinico Umberto I offre inoltre un ambulatorio di endocrinologia che segue pazienti con incongruenza di genere. Entrambi i servizi sono accessibili tramite il Servizio Sanitario Nazionale.'
			},
			{
				domanda: 'Quali sono i tempi per la transizione di genere a Roma?',
				risposta: 'I tempi di attesa per il primo appuntamento al SAIFIP possono superare i 6 mesi. La fase di valutazione psicodiagnostica dura generalmente dai 6 ai 12 mesi. Dopo la valutazione, l\'avvio della terapia ormonale richiede 1-2 mesi. Per la rettifica anagrafica presso il Tribunale di Roma i tempi vanno dai 6 ai 18 mesi. Per eventuali interventi chirurgici, la lista d\'attesa può essere di 1-3 anni. Durante l\'attesa, è consigliabile rivolgersi al Circolo Mario Mieli o a Libellula per supporto e orientamento.'
			},
			{
				domanda: 'Come si accede al SAIFIP a Roma per iniziare il percorso di affermazione di genere?',
				risposta: 'Per accedere al SAIFIP occorre un\'impegnativa del medico di base per visita relativa a incongruenza di genere. Lo sportello informativo del SAIFIP, gestito dall\'équipe psicologica, è attivo il lunedì dalle 14:00 alle 17:00 e il mercoledì dalle 9:00 alle 11:00, presso la sede di Via Bernardino Ramazzini 68. È possibile contattare lo sportello ai numeri 06 5870 3700 o 06 5870 2527, oppure via email a saifip@scamilloforlanini.rm.it. Il servizio offre colloqui psicologici, psicoterapia individuale e di gruppo, valutazione psicodiagnostica e sportello dei Peer Navigator per l\'accompagnamento tra pari.'
			},
			{
				domanda: 'Quali associazioni supportano le persone trans a Roma?',
				risposta: 'Le principali associazioni a Roma sono il Circolo di Cultura Omosessuale Mario Mieli (fondato nel 1983, offre Sportello Trans, consulenza legale e psicologica), l\'Associazione Libellula (attiva dal 1997, dedicata specificamente alle persone trans con sportello psicologico e accompagnamento ai percorsi di affermazione di genere), Arcigay Roma (sportello legale e psicologico), Di\' Gay Project (prevenzione sanitaria, test HIV e IST, consulenza tra pari) e AGEDO Lazio (supporto a genitori e familiari). Il progetto Welcome4Rainbow, finanziato dall\'UNAR, offre accoglienza 24/7 tramite la RainbowLine.'
			},
			{
				domanda: 'Come iniziare il percorso di transizione a Roma?',
				risposta: 'Per iniziare il percorso a Roma, il primo passo è rivolgersi al proprio medico di base per ottenere un\'impegnativa per il SAIFIP dell\'Ospedale San Camillo-Forlanini. In parallelo, è consigliabile contattare lo Sportello Trans del Circolo Mario Mieli (mercoledì 17:00-19:00, su appuntamento) o l\'Associazione Libellula per ricevere orientamento gratuito e accompagnamento ai servizi. Il SAIFIP offre l\'intero percorso multidisciplinare: valutazione psicologica, terapia ormonale e coordinamento chirurgico, tutto coperto dal SSN con impegnativa. Durante i tempi di attesa, le associazioni offrono gruppi di mutuo aiuto e supporto psicologico.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'condizione-trans-prima-1982',
			'marcella-di-folco'
		],
		ultimoAggiornamento: '2026-02-25'
	},
	{
		slug: 'napoli',
		nome: 'Napoli',
		regione: 'Campania',
		provincia: 'NA',
		intro: 'Napoli rappresenta il principale punto di riferimento per le persone transgender nel Sud Italia. Il Centro di Identità di Genere presso l\'AOU Federico II offre percorsi multidisciplinari di affermazione di genere che comprendono endocrinologia, psicologia clinica e supporto chirurgico. L\'associazionismo napoletano è particolarmente vivace, con realtà storiche come Arcigay Napoli Antinoo e l\'Associazione Trans Napoli (ATN) che forniscono supporto diretto alla comunità. La città ha un rapporto unico con le identità di genere non conformi, radicato nella tradizione secolare dei femminielli, figure riconosciute nella cultura popolare napoletana.',
		metaDescription: 'Guida completa alle risorse trans a Napoli: Centro Gender Federico II, associazioni, sportelli, iter sanitario ASL e storia del movimento.',
		contesto_locale: 'Napoli ha un rapporto unico con le identità di genere non conformi, radicato nella tradizione secolare dei femminielli: figure storicamente integrate nella vita dei quartieri popolari, riconosciute nella cultura partenopea fin dal Cinquecento (già nel 1586 Giovanni Battista Della Porta ne documentava la presenza). Il 29 giugno 1996 Napoli ospitò il primo Pride del Sud Italia, intitolato Jesce Sole, con oltre ventimila partecipanti e l\'intervento dell\'allora sindaco Antonio Bassolino con la fascia tricolore. Dal 2009 il Napoli Pride si tiene ogni anno senza interruzione, unico Pride in Europa a non essersi fermato nemmeno durante la pandemia. Sul piano sanitario, il Centro di Identità di Genere dell\'AOU Federico II rappresenta il polo di riferimento per la Campania e gran parte del Mezzogiorno, con attività clinica e di ricerca sulla varianza di genere attive dal 1997. L\'Università Federico II è stata tra le prime in Italia ad attivare la carriera alias nel 2014. L\'associazionismo napoletano è vivace: l\'ATN (Associazione Transessuale Napoli, fondata nel 2007) e Arcigay Napoli Antinoo offrono supporto diretto, mentre la Casa delle Culture e dell\'Accoglienza LGBTQI+, prima struttura comunale del Sud Italia dedicata alle persone LGBTQI+, fornisce ospitalità e servizi antidiscriminazione.',
		centri_gender_intro: 'Il Centro di Identità di Genere dell\'AOU Federico II è il principale riferimento regionale per i percorsi di affermazione di genere. L\'accesso avviene tramite impegnativa del medico di base, con un percorso multidisciplinare che comprende psicologia clinica, endocrinologia e chirurgia, interamente coperto dal SSN. Per l\'età evolutiva, il programma di Endocrinologia Pediatrica della Federico II segue minori con sviluppo atipico dell\'identità di genere, con un primo colloquio psicologico prenotabile inviando l\'impegnativa all\'indirizzo endoped.aou@unina.it.',
		associazioni_intro: 'Napoli dispone di una rete associativa consolidata a supporto delle persone trans. L\'ATN (Associazione Transessuale Napoli), fondata nel 2007, opera come sportello unico offrendo consulenza legale e psicologica, orientamento lavorativo, accompagnamento ai percorsi sanitari e gestione di una casa di accoglienza per vittime di violenza omotransfobica. Arcigay Napoli Antinoo organizza il Napoli Pride e gestisce lo sportello trans con ascolto e orientamento, mentre AGEDO Campania offre gruppi di sostegno per le famiglie.',
		sportelli_intro: 'Il Comune di Napoli gestisce la Casa delle Culture e dell\'Accoglienza delle persone LGBTQI+ in Via Parco Carelli 8C, prima struttura municipale del Sud Italia dedicata alla tutela delle persone LGBTQI+. Al suo interno operano sportelli di consulenza legale, psicologica e di orientamento lavorativo gratuiti, oltre a un servizio di ospitalità per persone in emergenza abitativa. È inoltre attivo il progetto Napoli DiverCity, promosso dal Comune e realizzato dal Centro SinapSi della Federico II insieme ad Arcigay Napoli, che offre ascolto e consulenza gratuita presso Via Porta di Massa 1.',
		image: '/images/citta/napoli.webp',
		centri_gender: [
			{
				nome: 'Centro di Identità di Genere — AOU Federico II',
				citta: 'Napoli',
				indirizzo: 'Via Sergio Pansini 5, 80131 Napoli',
				telefono: '081 746 2660',
				sito: 'https://www.policlinico.unina.it',
				note: 'Centro di riferimento regionale per la disforia di genere. Percorso multidisciplinare: endocrinologia, psicologia clinica, chirurgia. Accetta pazienti da tutta la Campania e dal Sud Italia.'
			},
			{
				nome: 'Ambulatorio di Endocrinologia — ASL Napoli 1 Centro',
				citta: 'Napoli',
				indirizzo: 'Via Comunale del Principe 13/a, 80145 Napoli',
				telefono: '081 254 4111',
				sito: 'https://www.aslnapoli1centro.it',
				note: 'Servizio endocrinologico territoriale. Supporto per il monitoraggio della terapia ormonale con impegnativa del medico di base.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Napoli Antinoo',
				tipo: 'lgbtq',
				citta: 'Napoli',
				indirizzo: 'Via San Geronimo alle Monache 21, 80134 Napoli',
				sito: 'https://www.arcigaynapoli.it',
				descrizione: 'Sezione napoletana di Arcigay, tra le più attive del Mezzogiorno. Organizza il Napoli Pride, offre sportello trans, consulenza legale e gruppi di socializzazione.'
			},
			{
				nome: 'ATN — Associazione Trans Napoli',
				tipo: 'lgbtq',
				citta: 'Napoli',
				sito: 'https://www.associazionetransnapoli.it',
				descrizione: 'Associazione storica dedicata alle persone trans napoletane. Offre accompagnamento ai servizi sanitari, supporto tra pari e advocacy per i diritti delle persone trans nel Mezzogiorno.'
			},
			{
				nome: 'AGEDO Campania',
				tipo: 'genitori',
				citta: 'Napoli',
				sito: 'https://www.agedo.org',
				descrizione: 'Sezione campana dell\'associazione di genitori, parenti e amici di persone LGBTQ+. Gruppi di sostegno per famiglie con figli trans, incontri periodici a Napoli.'
			},
			{
				nome: 'Le Maree',
				tipo: 'lgbtq',
				citta: 'Napoli',
				descrizione: 'Collettivo transfemminista napoletano che promuove attività culturali, laboratori e iniziative di visibilità per le persone trans e non binarie.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans — Arcigay Napoli Antinoo',
				tipo: 'psicologico',
				ente: 'Arcigay Napoli Antinoo',
				citta: 'Napoli',
				indirizzo: 'Via San Geronimo alle Monache 21, 80134 Napoli',
				orari: 'Giovedì 16:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, accompagnamento per persone trans e in questioning. Accesso libero e gratuito.'
			},
			{
				nome: 'Sportello UNAR Campania',
				tipo: 'antidiscriminazione',
				ente: 'UNAR / Regione Campania',
				citta: 'Napoli',
				telefono: '800 901 010',
				note: 'Numero verde nazionale contro le discriminazioni basate su identità di genere e orientamento sessuale. Segnalazioni e assistenza legale gratuita.'
			}
		],
		iter_sanitario: {
			intro: 'A Napoli il percorso di affermazione di genere fa riferimento alla ASL Napoli 1 Centro e al Centro di Identità di Genere dell\'AOU Federico II, che rappresenta il polo specializzato per tutta la Campania e gran parte del Sud Italia.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi al medico di medicina generale un\'impegnativa per una visita endocrinologica o psicologica presso l\'AOU Federico II. Il medico può indirizzarti direttamente al Centro di Identità di Genere.',
					ente: 'Medico di Medicina Generale / ASL Napoli 1',
					tempiStimati: '1-3 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con lo psicologo o psichiatra del Centro di Identità di Genere della Federico II. Il percorso è di accompagnamento e comprensione, non di giudizio.',
					ente: 'Centro Identità di Genere — AOU Federico II',
					tempiStimati: '3-8 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo del Centro prescrive la terapia ormonale sostitutiva. I controlli sono periodici (ogni 3-6 mesi). Il monitoraggio può essere effettuato anche presso l\'ambulatorio della ASL Napoli 1.',
					ente: 'Endocrinologia — AOU Federico II',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta di cambio del nome e del genere sui documenti si presenta al Tribunale Civile di Napoli. Non è più obbligatorio l\'intervento chirurgico (sentenza Corte Costituzionale 221/2015).',
					ente: 'Tribunale Civile di Napoli',
					tempiStimati: '8-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Se desiderato, il Centro di Identità di Genere della Federico II offre alcuni interventi di chirurgia di affermazione di genere. Per interventi più complessi può essere necessario rivolgersi a centri fuori regione come il CIG del Niguarda a Milano.',
					ente: 'AOU Federico II / Centri nazionali',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Il Centro di Identità di Genere della Federico II è il punto di riferimento per tutta la Campania e accoglie anche pazienti dalle regioni limitrofe.',
				'La terapia ormonale è gratuita con il SSN tramite esenzione specifica.',
				'Per la rettificazione anagrafica non è obbligatorio l\'intervento chirurgico dal 2015.',
				'Le associazioni locali (ATN, Arcigay Napoli) possono aiutare nell\'orientamento e nell\'accompagnamento ai servizi sanitari.'
			]
		},
		storia_queer: {
			intro: 'Napoli ha una storia unica nel panorama italiano delle identità di genere, radicata nella tradizione secolare dei femminielli e in un tessuto sociale che ha saputo esprimere forme di riconoscimento delle diversità di genere molto prima del movimento LGBTQ+ contemporaneo.',
			eventi: [
				{
					anno: 1600,
					titolo: 'La tradizione dei femminielli',
					descrizione: 'I femminielli sono figure storicamente riconosciute nella cultura popolare napoletana: persone assegnate maschio alla nascita che assumono ruoli e comportamenti femminili. Integrati nella vita dei quartieri, rappresentano una forma di fluidità di genere ante litteram.'
				},
				{
					anno: 1985,
					titolo: 'Prime associazioni per i diritti trans',
					descrizione: 'Nascono a Napoli i primi gruppi organizzati per i diritti delle persone trans, in un contesto sociale complesso ma ricco di energie.'
				},
				{
					anno: 2005,
					titolo: 'Primo Napoli Pride',
					descrizione: 'Napoli ospita il suo primo Pride ufficiale, con una partecipazione significativa della comunità trans. L\'evento segna un punto di svolta nella visibilità LGBTQ+ nel Mezzogiorno.'
				},
				{
					anno: 2018,
					titolo: 'Centro di Identità di Genere alla Federico II',
					descrizione: 'L\'AOU Federico II struttura il Centro di Identità di Genere come servizio multidisciplinare permanente, diventando il polo di riferimento per le persone trans di tutta la Campania e del Sud Italia.'
				},
				{
					anno: 2023,
					titolo: 'Carriera alias all\'Università Federico II',
					descrizione: 'L\'Università Federico II di Napoli attiva la carriera alias per gli studenti transgender e non binari, permettendo l\'uso del nome d\'elezione nei documenti universitari.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione a Napoli?',
				risposta: 'Il primo passo è chiedere al medico di base un\'impegnativa per il Centro di Identità di Genere dell\'AOU Federico II. Da lì si avvia un percorso multidisciplinare coperto dal SSN. L\'Arcigay Napoli Antinoo può aiutare con l\'orientamento.'
			},
			{
				domanda: 'Cos\'è la tradizione dei femminielli napoletani?',
				risposta: 'I femminielli sono figure storiche della cultura popolare napoletana: persone assegnate maschio alla nascita che vivono in modo femminile. Riconosciuti nei quartieri e integrati nella vita sociale, rappresentano una forma di fluidità di genere radicata nella tradizione partenopea, anche se non vanno confusi con le moderne identità transgender.'
			},
			{
				domanda: 'La terapia ormonale è gratuita a Napoli?',
				risposta: 'Sì, la terapia ormonale sostitutiva per la disforia di genere è coperta dal Servizio Sanitario Nazionale. È necessaria la prescrizione di un endocrinologo del Centro di Identità di Genere della Federico II e l\'esenzione specifica.'
			},
			{
				domanda: 'È possibile fare la chirurgia di affermazione di genere a Napoli?',
				risposta: 'Il Centro di Identità di Genere della Federico II offre alcuni interventi chirurgici. Per procedure più complesse, come la falloplastica, può essere necessario rivolgersi a centri fuori regione (CIG Niguarda a Milano, SAIFIP a Roma). Il SSN copre i costi anche fuori regione con autorizzazione.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans a Napoli?',
				risposta: 'Sì, Arcigay Napoli Antinoo gestisce uno sportello trans con ascolto e orientamento. L\'ATN (Associazione Trans Napoli) offre accompagnamento e supporto tra pari. AGEDO Campania accoglie le famiglie con gruppi di sostegno periodici.'
			},
			{
				domanda: 'Quanto tempo richiede la rettificazione anagrafica a Napoli?',
				risposta: 'I tempi variano da 8 a 18 mesi presso il Tribunale Civile di Napoli. Non è più necessario l\'intervento chirurgico dal 2015. La Rete Lenford offre consulenze gratuite.'
			},
			{
				domanda: 'Cos\'è il centro per la disforia di genere a Napoli e come si accede?',
				risposta: 'Il centro di riferimento è il Centro di Identità di Genere dell\'AOU Federico II, in Via Sergio Pansini 5. L\'attività clinica e di ricerca sulla varianza di genere è attiva dal 1997. Per accedere serve un\'impegnativa del medico di base per visita endocrinologica o psicologica. Il Centro offre un percorso multidisciplinare che comprende psicologia clinica, endocrinologia e chirurgia, tutto coperto dal SSN. Accoglie pazienti da tutta la Campania e dal Sud Italia.'
			},
			{
				domanda: 'Quali sono i tempi per la transizione di genere a Napoli?',
				risposta: 'I tempi del percorso di affermazione di genere a Napoli dipendono dalla fase. La valutazione psicologica presso il Centro di Identità di Genere della Federico II richiede generalmente 3-8 mesi. L\'avvio della terapia ormonale può avvenire entro 1-3 mesi dalla valutazione. Per la rettificazione anagrafica al Tribunale Civile di Napoli i tempi variano tra 8 e 18 mesi. Per gli interventi chirurgici le liste d\'attesa possono raggiungere 1-3 anni. Le associazioni locali come ATN e Arcigay Napoli possono aiutare a orientarsi nei passaggi burocratici.'
			},
			{
				domanda: 'Quali associazioni supportano le persone trans a Napoli?',
				risposta: 'Le principali realtà sono l\'ATN (Associazione Transessuale Napoli), fondata nel 2007, che offre consulenza legale e psicologica, orientamento lavorativo, accompagnamento ai servizi sanitari e una casa di accoglienza per vittime di violenza omotransfobica. Arcigay Napoli Antinoo gestisce uno sportello trans (giovedì 16-19) con ascolto e orientamento ai servizi. AGEDO Campania organizza gruppi di sostegno per le famiglie. Il collettivo transfemminista Le Maree promuove attività culturali e di visibilità per persone trans e non binarie.'
			},
			{
				domanda: 'Il percorso di transizione a Napoli è coperto dal SSN?',
				risposta: 'Sì, l\'intero percorso di affermazione di genere presso il Centro di Identità di Genere della Federico II è coperto dal Servizio Sanitario Nazionale. La valutazione psicologica, le visite endocrinologiche e gli interventi chirurgici sono erogati in regime SSN con il pagamento del solo ticket. La terapia ormonale sostitutiva è gratuita con esenzione specifica e ricetta rossa. Per interventi chirurgici non disponibili a Napoli, il SSN copre i costi anche presso centri fuori regione (come il CIG Niguarda a Milano) con autorizzazione della ASL. La rettificazione anagrafica può essere gratuita con il gratuito patrocinio.'
			},
			{
				domanda: 'Come si inizia un percorso di transizione a Napoli?',
				risposta: 'Il primo passo è rivolgersi al proprio medico di medicina generale per ottenere un\'impegnativa per visita endocrinologica o psicologica indirizzata al Centro di Identità di Genere dell\'AOU Federico II. Con l\'impegnativa si prenota la prima visita presso il Centro, in Via Sergio Pansini 5. In parallelo, è molto utile contattare un\'associazione come l\'ATN o Arcigay Napoli Antinoo: possono offrire orientamento, accompagnamento ai servizi e supporto tra pari. Non è necessario avere una diagnosi preventiva per accedere al primo colloquio. La Casa delle Culture LGBTQI+ del Comune di Napoli offre ulteriori servizi di accoglienza e orientamento.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'persone-trans-nella-storia',
			'situazione-trans-italia',
			'salute-mentale-persone-trans'
		],
		ultimoAggiornamento: '2026-02-25'
	},
	{
		slug: 'torino',
		nome: 'Torino',
		regione: 'Piemonte',
		provincia: 'TO',
		intro: 'Torino è una delle città più importanti in Italia per i servizi dedicati alle persone transgender, grazie alla presenza del CIDIGEM (Centro Interdipartimentale Disturbi di Identità di Genere) presso l\'Ospedale CTO-Molinette, uno dei centri più antichi e autorevoli del Paese. La forte tradizione universitaria torinese ha contribuito alla ricerca clinica e alla formazione di professionisti specializzati. Il tessuto associativo è ricco e radicato: il Centro LGBTQ Maurice, attivo dal 1996, rappresenta un punto di riferimento per l\'intera comunità.',
		metaDescription: 'Guida completa alle risorse trans a Torino: CIDIGEM Molinette, associazioni, sportelli, iter sanitario ASL e storia del movimento.',
		contesto_locale: 'Torino occupa un ruolo di primo piano in Italia per i diritti e i servizi dedicati alle persone transgender. Nel 2001 il Comune ha istituito il Servizio LGBT, primo esempio in Italia di un servizio pubblico inserito in un\'amministrazione comunale per il superamento delle discriminazioni legate all\'identità di genere e all\'orientamento sessuale. Nel 2005 nasce il CIDIGEM (Centro Interdipartimentale Disturbi di Identità di Genere) presso le Molinette, riconosciuto dalla Regione Piemonte nel 2008 come Centro di Riferimento Regionale: ad oggi segue oltre 700 pazienti tra i servizi psicologico ed endocrinologico. Il tessuto associativo torinese è tra i più radicati d\'Italia, con realtà come il Centro LGBTQ Maurice (attivo dal 1985), Arcigay Torino "Ottavio Mai" e CasArcobaleno, polo che dal 2014 riunisce oltre 20 associazioni in via Bernardino Lanino. Nel 2006 Torino ha ospitato il Pride nazionale con oltre 20.000 partecipanti, e sempre nel 2006 è nata in città la rete RE.A.DY, network di oltre 300 enti pubblici contro le discriminazioni.',
		centri_gender_intro: 'Il CIDIGEM presso l\'Ospedale CTO-Molinette (AOU Città della Salute e della Scienza) è il centro di riferimento regionale per la disforia di genere in Piemonte, attivo dal 2005. Offre un percorso multidisciplinare completo — valutazione psicologica, terapia ormonale e chirurgia di affermazione di genere — interamente coperto dal SSN. I tempi di attesa per il primo colloquio possono superare i 12 mesi a causa dell\'alta domanda e della carenza di personale; il servizio endocrinologico collabora anche con l\'AOU San Luigi Gonzaga di Orbassano per il monitoraggio ormonale.',
		associazioni_intro: 'Torino dispone di una rete associativa LGBTQ+ ampia e consolidata. Il Centro LGBTQ Maurice, fondato nel 1985, offre uno sportello trans settimanale (Spo-T) con ascolto, orientamento e gruppi di supporto tra pari. CasArcobaleno, inaugurata nel 2014 per iniziativa di Arcigay Torino "Ottavio Mai", riunisce oltre 20 associazioni in un unico spazio in via Bernardino Lanino 3/a, con servizi che includono accoglienza, test rapidi HIV e sifilide gratuiti, e gruppi di socializzazione. AGEDO Piemonte organizza incontri mensili per le famiglie di persone trans.',
		sportelli_intro: 'Il Comune di Torino mette a disposizione il Servizio LGBT, istituito nel 2001, che svolge attività di formazione per dipendenti comunali, ASL e operatori sociali, e promuove normative antidiscriminazione. È inoltre attivo il centro PorTO Sicuro, primo centro antidiscriminazioni LGBTQIA+ sul territorio metropolitano, gestito da Arcigay Torino, AGEDO, Maurice e Almaterra, con tre sedi (CasArcobaleno, Maurice e Almaterra) e accesso garantito cinque giorni a settimana.',
		image: '/images/citta/torino.webp',
		centri_gender: [
			{
				nome: 'CIDIGEM — Centro Interdipartimentale Disturbi di Identità di Genere, CTO-Molinette',
				citta: 'Torino',
				indirizzo: 'Via Zuretti 29, 10126 Torino',
				telefono: '011 633 5750',
				sito: 'https://www.cittadellasalute.to.it',
				note: 'Centro di riferimento nazionale per la disforia di genere. Percorso multidisciplinare: psicologia, endocrinologia, chirurgia. Uno dei centri più antichi d\'Italia.'
			},
			{
				nome: 'Ambulatorio di Endocrinologia — AOU San Luigi Gonzaga',
				citta: 'Orbassano',
				indirizzo: 'Regione Gonzole 10, 10043 Orbassano (TO)',
				telefono: '011 902 6111',
				sito: 'https://www.sanluigi.piemonte.it',
				note: 'Servizio endocrinologico per il monitoraggio della terapia ormonale. Collabora con il CIDIGEM per i percorsi nella cintura torinese.'
			}
		],
		associazioni: [
			{
				nome: 'Coordinamento Torino Pride',
				tipo: 'lgbtq',
				citta: 'Torino',
				sito: 'https://www.torinopride.it',
				descrizione: 'Coordinamento delle associazioni LGBTQ+ torinesi che organizza il Torino Pride annuale. Promuove visibilità, diritti e campagne di sensibilizzazione con forte attenzione alle tematiche trans.'
			},
			{
				nome: 'Centro LGBTQ Maurice',
				tipo: 'lgbtq',
				citta: 'Torino',
				indirizzo: 'Via Stampatori 10, 10122 Torino',
				sito: 'https://www.mauriceglbtq.org',
				descrizione: 'Centro storico LGBTQ+ di Torino, attivo dal 1996. Offre sportello trans, biblioteca, gruppi di auto-mutuo-aiuto, consulenza legale e attività culturali.'
			},
			{
				nome: 'Arcigay Torino',
				tipo: 'lgbtq',
				citta: 'Torino',
				indirizzo: 'Via Stampatori 10, 10122 Torino',
				sito: 'https://www.arcigaytorino.it',
				descrizione: 'Sezione torinese di Arcigay. Organizza eventi culturali, offre consulenza legale e supporto per persone LGBTQ+. Collabora con il Maurice per i servizi dedicati alle persone trans.'
			},
			{
				nome: 'AGEDO Piemonte',
				tipo: 'genitori',
				citta: 'Torino',
				sito: 'https://www.agedo.org',
				descrizione: 'Sezione piemontese dell\'associazione di genitori, parenti e amici di persone LGBTQ+. Gruppi di sostegno mensili a Torino per famiglie con figli trans.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans — Centro Maurice',
				tipo: 'psicologico',
				ente: 'Centro LGBTQ Maurice',
				citta: 'Torino',
				indirizzo: 'Via Stampatori 10, 10122 Torino',
				orari: 'Mercoledì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, supporto tra pari e accompagnamento per persone trans, non binarie e in questioning. Accesso libero e gratuito.'
			},
			{
				nome: 'Sportello Antidiscriminazione — Comune di Torino',
				tipo: 'antidiscriminazione',
				ente: 'Comune di Torino',
				citta: 'Torino',
				indirizzo: 'Via Milano 7, 10154 Torino',
				telefono: '011 011 28800',
				note: 'Servizio comunale per la segnalazione di episodi di discriminazione basati su identità di genere e orientamento sessuale.'
			}
		],
		iter_sanitario: {
			intro: 'A Torino il percorso di affermazione di genere fa riferimento alla ASL Città di Torino e al CIDIGEM presso l\'Ospedale CTO-Molinette, centro di riferimento nazionale con una lunga tradizione clinica e di ricerca.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi al medico di medicina generale un\'impegnativa per una visita presso il CIDIGEM all\'Ospedale CTO-Molinette. Il medico può indirizzarti direttamente al centro specializzato.',
					ente: 'Medico di Medicina Generale / ASL Città di Torino',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui di valutazione e accompagnamento con l\'équipe psicologica del CIDIGEM. Il percorso è personalizzato e mira alla comprensione dell\'identità di genere della persona.',
					ente: 'CIDIGEM — CTO-Molinette',
					tempiStimati: '2-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo del CIDIGEM prescrive la terapia ormonale sostitutiva dopo la valutazione. I controlli sono periodici (ogni 3-6 mesi). Il monitoraggio può essere effettuato anche presso l\'AOU San Luigi Gonzaga di Orbassano.',
					ente: 'Endocrinologia — CIDIGEM / AOU San Luigi Gonzaga',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta di cambio del nome e del genere sui documenti si presenta al Tribunale Civile di Torino. Non è più obbligatorio l\'intervento chirurgico (sentenza Corte Costituzionale 221/2015).',
					ente: 'Tribunale Civile di Torino',
					tempiStimati: '6-14 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Se desiderato, il CIDIGEM offre chirurgia di affermazione di genere (mastectomia, vaginoplastica, falloplastica) presso le Molinette. Il centro è tra i più esperti d\'Italia.',
					ente: 'CIDIGEM — Chirurgia Plastica CTO-Molinette',
					tempiStimati: '1-2 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Il CIDIGEM è uno dei centri gender più antichi e autorevoli d\'Italia: accetta pazienti da tutto il Piemonte e dalle regioni limitrofe.',
				'La terapia ormonale è gratuita con il SSN tramite esenzione specifica.',
				'Per la rettificazione anagrafica non è obbligatorio l\'intervento chirurgico dal 2015.',
				'Il Centro Maurice offre orientamento gratuito e può aiutare nel primo contatto con il CIDIGEM.'
			]
		},
		storia_queer: {
			intro: 'Torino occupa un posto centrale nella storia del movimento per i diritti LGBTQ+ in Italia. Dalla vicinanza con il FUORI!, primo movimento di liberazione omosessuale italiano, alla consolidata tradizione del CIDIGEM, la città ha contribuito in modo significativo alla conquista dei diritti delle persone trans.',
			eventi: [
				{
					anno: 1978,
					titolo: 'Il FUORI! e il contesto torinese',
					descrizione: 'Il FUORI! (Fronte Unitario Omosessuale Rivoluzionario Italiano), fondato nel 1971 a Torino, rappresenta il primo movimento di liberazione omosessuale in Italia. Il clima culturale torinese favorisce il dibattito su identità di genere e sessualità.'
				},
				{
					anno: 1982,
					titolo: 'Legge 164 e il ruolo di Torino',
					descrizione: 'L\'approvazione della legge 164/1982 sulla rettificazione anagrafica del sesso vede Torino tra le prime città ad applicarla concretamente, grazie alla presenza di professionisti clinici già attivi nel campo.'
				},
				{
					anno: 2001,
					titolo: 'Primo Torino Pride',
					descrizione: 'Torino ospita il suo primo Pride ufficiale, con una forte partecipazione della comunità trans. L\'evento diventa un appuntamento annuale.'
				},
				{
					anno: 2006,
					titolo: 'Espansione del CIDIGEM',
					descrizione: 'Il CIDIGEM amplia i propri servizi e consolida il modello multidisciplinare (psicologia, endocrinologia, chirurgia), diventando un punto di riferimento nazionale per i percorsi di affermazione di genere.'
				},
				{
					anno: 2023,
					titolo: 'Carriera alias al Politecnico di Torino',
					descrizione: 'Il Politecnico di Torino attiva ufficialmente la carriera alias per gli studenti transgender e non binari, permettendo l\'uso del nome d\'elezione nel badge e nei registri universitari.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione a Torino?',
				risposta: 'Il primo passo è chiedere al medico di base un\'impegnativa per il CIDIGEM presso l\'Ospedale CTO-Molinette. Da lì si avvia un percorso multidisciplinare coperto dal SSN. Il Centro Maurice può aiutare con l\'orientamento iniziale.'
			},
			{
				domanda: 'Cos\'è il CIDIGEM di Torino?',
				risposta: 'Il CIDIGEM (Centro Interdipartimentale Disturbi di Identità di Genere) è un centro specializzato presso l\'Ospedale CTO-Molinette di Torino. È uno dei centri gender più antichi e autorevoli d\'Italia e offre un percorso completo: valutazione psicologica, terapia ormonale e chirurgia.'
			},
			{
				domanda: 'La terapia ormonale è gratuita a Torino?',
				risposta: 'Sì, la terapia ormonale sostitutiva per la disforia di genere è coperta dal Servizio Sanitario Nazionale. È necessaria la prescrizione di un endocrinologo del CIDIGEM e l\'esenzione specifica.'
			},
			{
				domanda: 'È possibile fare la chirurgia di affermazione di genere a Torino?',
				risposta: 'Sì, il CIDIGEM presso le Molinette offre chirurgia di affermazione di genere, incluse mastectomia, vaginoplastica e falloplastica. Il centro ha una lunga esperienza. Le liste d\'attesa variano da 1 a 2 anni.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans a Torino?',
				risposta: 'Sì, il Centro LGBTQ Maurice gestisce uno sportello trans con ascolto, orientamento e gruppi di auto-mutuo-aiuto. Arcigay Torino offre consulenza legale. AGEDO Piemonte accoglie le famiglie con incontri mensili.'
			},
			{
				domanda: 'Quanto tempo richiede la rettificazione anagrafica a Torino?',
				risposta: 'I tempi variano da 6 a 14 mesi presso il Tribunale Civile di Torino. Non è più necessario l\'intervento chirurgico dal 2015. La Rete Lenford offre consulenze legali gratuite.'
			},
			{
				domanda: 'Cos\'è il CIDIGEM e come funziona il centro per la disforia di genere a Torino?',
				risposta: 'Il CIDIGEM (Centro Interdipartimentale Disturbi di Identità di Genere) è il centro di riferimento regionale per la disforia di genere in Piemonte, attivo dal 2005 presso l\'Ospedale CTO-Molinette (AOU Città della Salute e della Scienza di Torino). Offre un percorso multidisciplinare che include valutazione psicologica, terapia ormonale e chirurgia di affermazione di genere, tutto coperto dal SSN. Il servizio psicologico segue attualmente 286 pazienti, mentre quello endocrinologico ne ha in carico 424.'
			},
			{
				domanda: 'Quali sono i tempi di attesa per iniziare la transizione a Torino?',
				risposta: 'I tempi di attesa al CIDIGEM per il primo colloquio psicologico possono superare i 12 mesi, a causa dell\'alta domanda e della carenza di personale dedicato. Dopo la valutazione psicologica (2-6 mesi), l\'avvio della terapia ormonale richiede 1-3 mesi aggiuntivi. Per la chirurgia di affermazione di genere le liste d\'attesa variano da 1 a 2 anni. Il Centro Maurice può orientare nell\'attesa con supporto tra pari e consulenza.'
			},
			{
				domanda: 'Quali associazioni supportano le persone trans a Torino?',
				risposta: 'Le principali realtà sono: il Centro LGBTQ Maurice (dal 1985, con sportello trans Spo-T settimanale), CasArcobaleno (polo di oltre 20 associazioni in via Bernardino Lanino 3/a, con accoglienza e servizi gratuiti), Arcigay Torino "Ottavio Mai" (consulenza legale e progetti inclusivi), il Coordinamento Torino Pride (visibilità e campagne) e AGEDO Piemonte (gruppi mensili per famiglie con figli trans).'
			},
			{
				domanda: 'Il percorso di transizione a Torino è coperto dal Servizio Sanitario Nazionale?',
				risposta: 'Sì, il percorso presso il CIDIGEM alle Molinette è interamente coperto dal SSN: la valutazione psicologica, la terapia ormonale sostitutiva (con esenzione specifica) e la chirurgia di affermazione di genere sono gratuite. Serve un\'impegnativa del medico di base per accedere al centro. Il monitoraggio ormonale può essere effettuato anche presso l\'AOU San Luigi Gonzaga di Orbassano.'
			},
			{
				domanda: 'Come si inizia il percorso di transizione a Torino?',
				risposta: 'Il primo passo è rivolgersi al medico di medicina generale per ottenere un\'impegnativa per il CIDIGEM presso l\'Ospedale CTO-Molinette. Il centro avvierà una valutazione psicologica personalizzata, seguita dalla terapia ormonale e, se desiderato, dalla chirurgia. Per un supporto iniziale gratuito ci si può rivolgere allo Sportello Trans del Centro Maurice (mercoledì 17:00-19:00) o al Welcome Desk di CasArcobaleno.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans',
			'storia-movimento-trans'
		],
		ultimoAggiornamento: '2026-03-02'
	},
	{
		slug: 'firenze',
		nome: 'Firenze',
		regione: 'Toscana',
		provincia: 'FI',
		intro: 'Firenze offre alle persone transgender un contesto tra i più inclusivi d\'Italia, grazie alla combinazione di servizi sanitari strutturati, un associazionismo radicato e politiche regionali progressive. L\'AOU Careggi ospita l\'Ambulatorio Identità di Genere, centro di riferimento per tutta la Toscana. IREOS, centro servizi LGBTQ+ attivo dal 1998, rappresenta un punto di riferimento per ascolto, orientamento e supporto. La Toscana è tra le regioni con la normativa antidiscriminazione più avanzata in Italia.',
		metaDescription: 'Risorse trans a Firenze: ambulatorio identità di genere Careggi, IREOS, associazioni, sportelli, iter sanitario e storia LGBTQ+ in Toscana.',
		contesto_locale: 'Firenze è uno dei principali poli italiani per i percorsi di affermazione di genere, grazie alla SOD di Andrologia, Endocrinologia Femminile e Incongruenza di Genere dell\'AOU Careggi, coordinatrice della rete regionale CRIG istituita con delibera regionale 907 del 2018 — la prima rete di questo tipo in Italia. La Toscana è stata anche la prima regione italiana ad approvare una legge contro le discriminazioni basate su orientamento sessuale e identità di genere, la Legge Regionale 63 del 2004. Il tessuto associativo fiorentino è ricco e radicato: IREOS, centro servizi queer fondato nel 1997, gestisce da oltre vent\'anni un consultorio della salute e dal 2003 organizza il Florence Queer Festival, uno dei principali festival di cultura queer in Italia. Il Toscana Pride, nato nel 2016 come progetto itinerante tra le città della regione, ha portato complessivamente 150.000 persone in piazza, con Firenze città ospitante nel 2016 e nel 2023. Azione Gay e Lesbica, attiva a Firenze da oltre trent\'anni, gestisce uno sportello antidiscriminazione e antiviolenza per persone LGBTQ+.',
		centri_gender_intro: 'L\'AOU Careggi ospita la SOD di Andrologia, Endocrinologia Femminile e Incongruenza di Genere, diretta dalla professoressa Linda Vignozzi. L\'équipe multidisciplinare comprende endocrinologi, psicologi, psichiatri e collabora con ginecologi, urologi, chirurghi plastici e logopedisti. L\'accesso avviene tramite impegnativa del medico di base con prenotazione al CUP regionale (telefono 055 545454); il percorso segue le linee guida internazionali WPATH e della Endocrine Society.',
		associazioni_intro: 'Firenze dispone di una rete associativa consolidata a supporto delle persone trans e non binarie. IREOS, centro servizi queer autogestito fondato nel 1997, offre consultorio della salute, gruppi di auto-mutuo aiuto, counseling e test HIV anonimo e gratuito. Arcigay Firenze, Azione Gay e Lesbica (attiva dal 1989) e AGEDO Toscana completano il panorama con supporto legale, psicologico, eventi culturali e gruppi per le famiglie.',
		sportelli_intro: 'A Firenze sono disponibili diversi sportelli gratuiti per le persone transgender. IREOS gestisce uno sportello di ascolto e orientamento con colloqui gratuiti condotti da psicologhe specializzate. Lo Sportello Antidiscriminazione del Comune di Firenze, attivo presso la Direzione Diritti e Inclusione, raccoglie segnalazioni di discriminazioni legate all\'identità di genere. Azione Gay e Lesbica offre inoltre uno sportello antiviolenza con supporto psicologico e legale.',
		image: '/images/citta/firenze.webp',
		centri_gender: [
			{
				nome: 'Ambulatorio Identità di Genere — AOU Careggi',
				citta: 'Firenze',
				indirizzo: 'Largo Brambilla 3, 50134 Firenze',
				telefono: '055 794 6760',
				sito: 'https://www.aou-careggi.toscana.it',
				note: 'Centro di riferimento regionale per la Toscana. Équipe multidisciplinare: endocrinologia, psicologia, chirurgia. Accesso tramite impegnativa del medico di base.'
			},
			{
				nome: 'Ambulatorio AUSL Toscana Centro — Salute Mentale',
				citta: 'Firenze',
				indirizzo: 'Via Lorenzo il Magnifico 104, 50129 Firenze',
				telefono: '055 693 5390',
				sito: 'https://www.uslcentro.toscana.it',
				note: 'Servizio di salute mentale con competenze sulla varianza di genere. Percorso psicologico di supporto e accompagnamento.'
			}
		],
		associazioni: [
			{
				nome: 'IREOS — Centro Servizi Comunità LGBTQ+',
				tipo: 'lgbtq',
				citta: 'Firenze',
				indirizzo: 'Via dei Serragli 3, 50124 Firenze',
				telefono: '055 216 907',
				sito: 'https://www.ireos.org',
				descrizione: 'Centro servizi LGBTQ+ di Firenze attivo dal 1998. Offre sportello di ascolto, gruppi di auto-mutuo aiuto per persone trans, consulenza psicologica, orientamento ai servizi sanitari e legali.'
			},
			{
				nome: 'Arcigay Firenze',
				tipo: 'lgbtq',
				citta: 'Firenze',
				sito: 'https://www.arcigayfirenze.it',
				descrizione: 'Sezione fiorentina di Arcigay. Organizza eventi culturali, offre consulenza legale, gruppi di socializzazione e supporto per persone LGBTQ+. Organizza il Toscana Pride.'
			},
			{
				nome: 'AGEDO Toscana',
				tipo: 'genitori',
				citta: 'Firenze',
				sito: 'https://www.agedo.org',
				descrizione: 'Sezione toscana dell\'associazione di genitori, parenti e amici di persone LGBTQ+. Gruppi di sostegno per famiglie con figli trans, incontri periodici a Firenze.'
			},
			{
				nome: 'Consultoria Queer Firenze',
				tipo: 'lgbtq',
				citta: 'Firenze',
				descrizione: 'Collettivo transfemminista che offre sportello di ascolto, gruppi di confronto e iniziative culturali. Particolare attenzione alle persone non binarie e alle soggettività queer.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto e Orientamento — IREOS',
				tipo: 'psicologico',
				ente: 'IREOS Firenze',
				citta: 'Firenze',
				indirizzo: 'Via dei Serragli 3, 50124 Firenze',
				orari: 'Lunedì e giovedì 16:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, accompagnamento per persone trans e LGBTQ+. Colloqui gratuiti con psicologhe specializzate.'
			},
			{
				nome: 'Sportello Antidiscriminazione — Comune di Firenze',
				tipo: 'antidiscriminazione',
				ente: 'Comune di Firenze',
				citta: 'Firenze',
				note: 'Segnalazione di episodi di discriminazione basati su identità di genere e orientamento sessuale. Attivo presso la Direzione Diritti e Inclusione del Comune.'
			}
		],
		iter_sanitario: {
			intro: 'A Firenze il percorso di affermazione di genere è ben strutturato grazie all\'AOU Careggi, centro di riferimento regionale. La Toscana garantisce l\'accesso ai percorsi attraverso la AUSL Toscana Centro, con un iter che prevede la collaborazione tra medico di base, servizi territoriali e centro specializzato.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita presso l\'Ambulatorio Identità di Genere dell\'AOU Careggi. Il medico di base può anche indirizzarti verso lo sportello IREOS per un primo orientamento.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica e presa in carico',
					descrizione: 'L\'équipe dell\'AOU Careggi avvia un percorso di valutazione e accompagnamento psicologico. I colloqui mirano alla comprensione dell\'identità di genere della persona e alla preparazione per le fasi successive.',
					ente: 'AOU Careggi — Ambulatorio Identità di Genere',
					tempiStimati: '3-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio della terapia ormonale',
					descrizione: 'L\'endocrinologo dell\'AOU Careggi prescrive la terapia ormonale sostitutiva. I controlli sono periodici (ogni 3-6 mesi) e possono essere seguiti anche dalla AUSL Toscana Centro.',
					ente: 'AOU Careggi / AUSL Toscana Centro',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta di cambio del nome e del genere sui documenti si presenta al Tribunale Civile di Firenze. La Toscana è tradizionalmente tra le regioni con tempi più rapidi per la rettificazione.',
					ente: 'Tribunale Civile di Firenze',
					tempiStimati: '6-14 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'L\'AOU Careggi offre alcuni interventi di chirurgia di affermazione di genere. Per interventi più complessi è possibile rivolgersi al CIG del Niguarda a Milano o al SAIFIP a Roma, con copertura SSN.',
					ente: 'AOU Careggi / centri di riferimento nazionale',
					tempiStimati: '1-2 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'L\'AOU Careggi è il centro di riferimento regionale e accetta pazienti da tutta la Toscana.',
				'La Toscana prevede l\'esenzione per le prestazioni legate alla disforia di genere tramite il codice regionale specifico.',
				'IREOS può facilitare l\'accesso ai servizi e offrire supporto durante tutto il percorso.',
				'L\'Università di Firenze ha attivato la carriera alias per studenti transgender e non binari.'
			]
		},
		storia_queer: {
			intro: 'Firenze ha una lunga tradizione di apertura culturale e ha contribuito significativamente al movimento per i diritti LGBTQ+ in Italia, con un associazionismo radicato e una comunità trans attiva e visibile.',
			eventi: [
				{
					anno: 1998,
					titolo: 'Fondazione di IREOS',
					descrizione: 'Nasce a Firenze IREOS, centro servizi per la comunità LGBTQ+ che diventa rapidamente un punto di riferimento per le persone trans toscane, offrendo ascolto, supporto e orientamento ai servizi.'
				},
				{
					anno: 2004,
					titolo: 'Toscana Pride a Firenze',
					descrizione: 'Firenze ospita un grande Toscana Pride con una forte partecipazione della comunità trans. La manifestazione contribuisce alla visibilità e al dibattito pubblico sui diritti delle persone transgender.'
				},
				{
					anno: 2015,
					titolo: 'Legge regionale contro le discriminazioni',
					descrizione: 'La Regione Toscana rafforza le norme contro le discriminazioni basate su orientamento sessuale e identità di genere, confermandosi tra le regioni più progressive d\'Italia.'
				},
				{
					anno: 2020,
					titolo: 'Potenziamento dell\'ambulatorio a Careggi',
					descrizione: 'L\'AOU Careggi amplia l\'équipe e le risorse dell\'ambulatorio per l\'identità di genere, riducendo le liste d\'attesa e migliorando l\'accesso ai percorsi di affermazione di genere.'
				},
				{
					anno: 2024,
					titolo: 'Carriera alias all\'Università di Firenze',
					descrizione: 'L\'Università di Firenze consolida la procedura di carriera alias per studenti transgender e non binari, garantendo l\'uso del nome elettivo nella documentazione interna e nei registri.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione a Firenze?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per l\'Ambulatorio Identità di Genere dell\'AOU Careggi, il centro di riferimento regionale. IREOS può aiutare nell\'orientamento iniziale e nell\'accompagnamento ai servizi.'
			},
			{
				domanda: 'Quali servizi offre l\'AOU Careggi per le persone trans?',
				risposta: 'L\'AOU Careggi offre un percorso multidisciplinare che include valutazione psicologica, terapia ormonale sostitutiva con monitoraggio endocrinologico e, per alcuni interventi, chirurgia di affermazione di genere. L\'accesso è tramite SSN con impegnativa.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans a Firenze?',
				risposta: 'Sì, IREOS organizza gruppi di auto-mutuo aiuto per persone trans e non binarie con incontri periodici. Anche Consultoria Queer Firenze offre spazi di confronto. Arcigay Firenze e AGEDO Toscana forniscono ulteriore supporto.'
			},
			{
				domanda: 'Quanto costa il percorso di transizione a Firenze?',
				risposta: 'Il percorso presso l\'AOU Careggi è coperto dal Servizio Sanitario Nazionale. Si pagano i ticket per le visite e gli esami, con possibilità di esenzione per reddito. La terapia ormonale è a carico del SSN.'
			},
			{
				domanda: 'L\'Università di Firenze offre la carriera alias?',
				risposta: 'Sì, l\'Università di Firenze ha attivato la carriera alias per studenti transgender e non binari. La procedura consente l\'uso del nome elettivo nel badge, nei registri e nella posta elettronica dell\'ateneo.'
			},
			{
				domanda: 'Cos\'è il centro per la disforia di genere di Careggi a Firenze?',
				risposta: 'L\'AOU Careggi ospita la SOD di Andrologia, Endocrinologia Femminile e Incongruenza di Genere, centro di riferimento regionale per la Toscana istituito con delibera 907/2018. L\'équipe multidisciplinare include endocrinologi, psicologi, psichiatri e collabora con ginecologi, urologi, chirurghi plastici e logopedisti. Segue le linee guida internazionali WPATH e della Endocrine Society. Nel 2023 il centro ha registrato 150 accessi con 26 prescrizioni di trattamento farmacologico.'
			},
			{
				domanda: 'Quali sono i tempi per la transizione di genere a Firenze?',
				risposta: 'Dopo aver ottenuto l\'impegnativa dal medico di base, si prenota al CUP regionale (055 545454). La fase di valutazione psicologica presso Careggi dura circa un anno, al termine della quale l\'équipe multidisciplinare conferma la diagnosi e avvia il percorso. La terapia ormonale viene prescritta dall\'endocrinologo con controlli ogni 3-6 mesi. Per la rettificazione anagrafica al Tribunale di Firenze si stimano 6-14 mesi. Per gli interventi chirurgici le liste d\'attesa possono raggiungere 1-2 anni.'
			},
			{
				domanda: 'Quali associazioni supportano le persone trans a Firenze?',
				risposta: 'Le principali associazioni sono: IREOS, centro servizi queer autogestito fondato nel 1997 che offre consultorio della salute, gruppi di auto-mutuo aiuto e counseling; Arcigay Firenze, con eventi culturali e consulenza legale; Azione Gay e Lesbica, attiva dal 1989 con sportello antidiscriminazione e antiviolenza; AGEDO Toscana, con gruppi di sostegno per famiglie di persone trans; Consultoria Queer Firenze, collettivo transfemminista con sportello di ascolto e spazi di confronto per persone non binarie.'
			},
			{
				domanda: 'Il percorso di transizione a Firenze è coperto dal SSN in Toscana?',
				risposta: 'Sì, il percorso di affermazione di genere presso l\'AOU Careggi è coperto dal Servizio Sanitario Nazionale. La Toscana ha istituito la rete CRIG (delibera 907/2018) per coordinare l\'assistenza alle persone con incongruenza di genere. Si pagano i ticket per visite ed esami, con possibilità di esenzione per reddito. La terapia ormonale sostitutiva è a carico del SSN. La Regione Toscana prevede inoltre un codice regionale di esenzione specifico per le prestazioni legate alla disforia di genere.'
			},
			{
				domanda: 'Come iniziare il percorso di transizione a Firenze passo per passo?',
				risposta: 'Il percorso inizia dal medico di base, che rilascia l\'impegnativa per l\'Ambulatorio Identità di Genere dell\'AOU Careggi. Si prenota tramite CUP regionale al 055 545454. IREOS (Via dei Serragli 3) può offrire un primo orientamento gratuito. A Careggi si avvia la valutazione psicologica (circa un anno), seguita dalla presa in carico endocrinologica per la terapia ormonale. Per la rettificazione anagrafica ci si rivolge al Tribunale Civile di Firenze. Gli interventi chirurgici possono essere effettuati a Careggi o presso altri centri nazionali con copertura SSN.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans'
		],
		ultimoAggiornamento: '2026-03-02'
	},
	{
		slug: 'palermo',
		nome: 'Palermo',
		regione: 'Sicilia',
		provincia: 'PA',
		intro: 'Palermo è il principale punto di riferimento in Sicilia per le persone transgender e non binarie, pur in un contesto regionale dove i servizi strutturati restano limitati. L\'ARNAS Civico ospita un ambulatorio dedicato all\'identità di genere che rappresenta l\'unico servizio specializzato dell\'isola. Nel 2015 il sindaco Leoluca Orlando ha proclamato Palermo "città dei diritti umani", promuovendo politiche di inclusione per le persone LGBTQ+. L\'associazionismo palermitano, con Arcigay Palermo in prima linea, svolge un ruolo fondamentale di orientamento e supporto per le persone trans di tutta la Sicilia.',
		metaDescription: 'Risorse trans a Palermo: ambulatorio identità di genere ARNAS Civico, associazioni LGBTQ+, sportelli, iter sanitario ASP e storia del movimento in Sicilia.',
		contesto_locale: 'Palermo è il principale punto di riferimento per le persone transgender in Sicilia, pur in un contesto regionale dove i servizi strutturati restano limitati rispetto al Centro-Nord. Nel 2013 l\'ARNAS Civico ha aperto il primo ambulatorio in Sicilia dedicato alle persone trans, mentre il Policlinico Universitario Paolo Giaccone ha avviato nel 2019 il Progetto T.U.T.T.O. (Tutela Umana dei Transessuali e Transgender in ambito Ospedaliero), un percorso multidisciplinare che integra psichiatria, endocrinologia e chirurgia plastica. A livello politico, nel 2015 il sindaco Leoluca Orlando ha promosso la Carta di Palermo, dichiarando la città luogo di accoglienza e diritti umani. Nel 2010 Palermo ha ospitato per la prima volta il Sicilia Pride, e nel 2013 è stata scelta come sede del Pride nazionale, con oltre 100.000 partecipanti. L\'associazionismo locale, guidato da Arcigay Palermo presso le Officine Arcobaleno, svolge un ruolo cruciale di orientamento e supporto: dal 2016 offre un servizio di accompagnamento alla transizione e gestisce il Centro Antidiscriminazioni Protego, primo in Sicilia occidentale. Per la chirurgia di affermazione di genere, tuttavia, è ancora necessario rivolgersi a centri fuori regione.',
		centri_gender_intro: 'A Palermo i servizi per l\'identità di genere fanno capo a due strutture principali: l\'ARNAS Civico, che dal 2013 ospita un ambulatorio dedicato, e il Policlinico Universitario Paolo Giaccone, sede del Progetto T.U.T.T.O. con un\'équipe multidisciplinare che include psichiatria, endocrinologia e chirurgia plastica. L\'accesso avviene tramite impegnativa del medico di base; i tempi di attesa possono essere significativi, essendo le uniche strutture di riferimento per tutta la Sicilia occidentale.',
		associazioni_intro: 'Arcigay Palermo, con sede alle Officine Arcobaleno in via della Rosa alla Gioiamia 2/4, è il principale punto di riferimento per le persone trans in Sicilia. Dal 2016 offre uno sportello psicologico dedicato alla transizione, consulenza legale attiva dal 2010, e il Gruppo Trans*, uno spazio di socializzazione e confronto per persone trans e gender non-conforming. Sul territorio operano anche Famiglie Arcobaleno Sicilia, AGEDO Sicilia e il coordinamento Palermo Pride.',
		sportelli_intro: 'Il Centro Antidiscriminazioni Protego, gestito da Arcigay Palermo in collaborazione con il Comune di Palermo e il Comune di Trapani, è il primo sportello contro le discriminazioni basate su orientamento sessuale e identità di genere nella Sicilia occidentale. Offre accoglienza, consulenza psicologica, legale e di mediazione familiare. È inoltre attivo il nodo palermitano dello Sportello UNAR, raggiungibile tramite il numero verde 800 901 010.',
		image: '/images/citta/palermo.webp',
		centri_gender: [
			{
				nome: 'Ambulatorio Identità di Genere — ARNAS Civico',
				citta: 'Palermo',
				indirizzo: 'Piazza Nicola Leotta 4, 90127 Palermo',
				telefono: '091 666 1111',
				sito: 'https://www.arnascivico.it',
				note: 'Ambulatorio di riferimento per la Sicilia occidentale. Offre valutazione psicologica, supporto endocrinologico e accompagnamento nel percorso di affermazione di genere.'
			},
			{
				nome: 'Ambulatorio di Endocrinologia — Policlinico Universitario Paolo Giaccone',
				citta: 'Palermo',
				indirizzo: 'Via del Vespro 129, 90127 Palermo',
				telefono: '091 655 2111',
				sito: 'https://www.policlinico.pa.it',
				note: 'Servizio endocrinologico universitario. Collabora con l\'ARNAS Civico per il monitoraggio della terapia ormonale e la ricerca nel campo della medicina di genere.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Palermo',
				tipo: 'lgbtq',
				citta: 'Palermo',
				indirizzo: 'Via Catania 8, 90141 Palermo',
				sito: 'https://www.arcigaypalermo.it',
				descrizione: 'Sezione palermitana di Arcigay, principale punto di riferimento per la comunità LGBTQ+ siciliana. Offre sportello di ascolto, consulenza legale, gruppi di supporto e organizza il Palermo Pride.'
			},
			{
				nome: 'Famiglie Arcobaleno Sicilia',
				tipo: 'genitori',
				citta: 'Palermo',
				sito: 'https://www.famigliearcobaleno.org',
				descrizione: 'Sezione siciliana dell\'associazione di famiglie omogenitoriali e LGBTQ+. Supporto e visibilità per le famiglie con genitori trans e non binari in Sicilia.'
			},
			{
				nome: 'Palermo Pride — Coordinamento',
				tipo: 'lgbtq',
				citta: 'Palermo',
				sito: 'https://www.palermopride.it',
				descrizione: 'Coordinamento che organizza il Palermo Pride annuale. Promuove campagne di sensibilizzazione, iniziative culturali e dibattiti sui diritti delle persone trans e LGBTQ+ in Sicilia.'
			},
			{
				nome: 'AGEDO Sicilia',
				tipo: 'genitori',
				citta: 'Palermo',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ in Sicilia. Incontri periodici a Palermo e supporto telefonico per famiglie di tutta l\'isola.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Palermo',
				tipo: 'psicologico',
				ente: 'Arcigay Palermo',
				citta: 'Palermo',
				indirizzo: 'Via Catania 8, 90141 Palermo',
				orari: 'Martedì e venerdì 16:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, accompagnamento per persone trans e LGBTQ+. Colloqui gratuiti con operatori formati.'
			},
			{
				nome: 'Sportello UNAR — Nodo Palermo',
				tipo: 'antidiscriminazione',
				ente: 'UNAR — Ufficio Nazionale Antidiscriminazioni Razziali',
				citta: 'Palermo',
				note: 'Punto di contatto territoriale per segnalazioni di discriminazione basate su identità di genere. Accessibile anche tramite il numero verde UNAR 800 901 010.'
			}
		],
		iter_sanitario: {
			intro: 'A Palermo il percorso di affermazione di genere fa capo all\'ARNAS Civico, l\'unica struttura con un ambulatorio dedicato in Sicilia occidentale. L\'iter richiede coordinamento tra medico di base, servizi ASP e centro ospedaliero, con tempi che possono essere più lunghi rispetto ai centri del Nord Italia.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita presso l\'Ambulatorio Identità di Genere dell\'ARNAS Civico di Palermo. Arcigay Palermo può fornire un primo orientamento.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-3 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'L\'équipe dell\'ARNAS Civico avvia un percorso di valutazione psicologica e accompagnamento. I colloqui sono finalizzati alla comprensione dell\'identità di genere della persona.',
					ente: 'ARNAS Civico — Ambulatorio Identità di Genere',
					tempiStimati: '4-8 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio della terapia ormonale',
					descrizione: 'L\'endocrinologo prescrive la terapia ormonale sostitutiva. I controlli periodici possono essere seguiti anche dal Policlinico Universitario Paolo Giaccone. I farmaci sono coperti dal SSN.',
					ente: 'ARNAS Civico / Policlinico Paolo Giaccone',
					tempiStimati: '2-4 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta di cambio del nome e del genere sui documenti si presenta al Tribunale Civile di Palermo. La consulenza di un avvocato specializzato è raccomandata.',
					ente: 'Tribunale Civile di Palermo',
					tempiStimati: '10-20 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere è generalmente necessario rivolgersi a centri fuori regione, come il CIG del Niguarda a Milano o il SAIFIP a Roma. Il SSN copre i costi con autorizzazione della ASP siciliana.',
					ente: 'Centri di riferimento nazionale (fuori regione)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'L\'ARNAS Civico di Palermo è il principale punto di riferimento per le persone trans in Sicilia occidentale.',
				'Per la chirurgia di affermazione di genere, la maggior parte delle persone siciliane si rivolge a centri fuori regione (Milano, Roma).',
				'La terapia ormonale è coperta dal SSN anche in Sicilia. I farmaci sono dispensati tramite prescrizione specialistica.',
				'Arcigay Palermo offre supporto fondamentale per orientarsi nel sistema sanitario regionale.'
			]
		},
		storia_queer: {
			intro: 'Palermo ha una storia significativa nel panorama dei diritti LGBTQ+ del Mezzogiorno, con una comunità che ha saputo costruire visibilità e servizi in un contesto regionale spesso difficile.',
			eventi: [
				{
					anno: 1995,
					titolo: 'Prime associazioni LGBTQ+ a Palermo',
					descrizione: 'Si costituiscono i primi gruppi organizzati per i diritti delle persone LGBTQ+ a Palermo. Le persone trans sono tra le prime a mobilitarsi, chiedendo servizi sanitari e dignità sociale.'
				},
				{
					anno: 2009,
					titolo: 'Primo Palermo Pride',
					descrizione: 'La città ospita il suo primo Pride ufficiale, con una partecipazione che supera le aspettative. La comunità trans palermitana è protagonista della manifestazione.'
				},
				{
					anno: 2015,
					titolo: 'Palermo "Città dei Diritti Umani"',
					descrizione: 'Il sindaco Leoluca Orlando promuove la Carta di Palermo e dichiara la città un luogo di accoglienza e diritti. Le politiche comunali includono esplicitamente la tutela delle persone LGBTQ+ e transgender.'
				},
				{
					anno: 2019,
					titolo: 'Attivazione dell\'ambulatorio identità di genere',
					descrizione: 'L\'ARNAS Civico di Palermo attiva un ambulatorio dedicato all\'identità di genere, offrendo per la prima volta in Sicilia occidentale un servizio strutturato per le persone trans.'
				},
				{
					anno: 2024,
					titolo: 'Carriera alias all\'Università di Palermo',
					descrizione: 'L\'Università degli Studi di Palermo consolida la procedura di carriera alias, permettendo a studenti transgender e non binari l\'uso del nome elettivo nella documentazione universitaria.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione a Palermo?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per l\'Ambulatorio Identità di Genere dell\'ARNAS Civico. Arcigay Palermo può aiutare con l\'orientamento iniziale.'
			},
			{
				domanda: 'Quali servizi per persone trans sono disponibili a Palermo?',
				risposta: 'L\'ARNAS Civico offre valutazione psicologica e terapia ormonale. Il Policlinico Universitario Paolo Giaccone collabora per il monitoraggio endocrinologico. Per la chirurgia è necessario rivolgersi a centri fuori regione.'
			},
			{
				domanda: 'È possibile fare la chirurgia di affermazione di genere a Palermo?',
				risposta: 'Attualmente, per la chirurgia di affermazione di genere è necessario rivolgersi a centri fuori regione come il CIG del Niguarda a Milano o il SAIFIP a Roma. Il SSN copre i costi tramite autorizzazione della ASP siciliana.'
			},
			{
				domanda: 'Ci sono gruppi di supporto per persone trans a Palermo?',
				risposta: 'Arcigay Palermo offre uno sportello di ascolto e gruppi di supporto per persone trans e LGBTQ+. AGEDO Sicilia fornisce supporto per le famiglie. Il Palermo Pride organizza anche momenti di aggregazione durante l\'anno.'
			},
			{
				domanda: 'L\'Università di Palermo offre la carriera alias?',
				risposta: 'Sì, l\'Università di Palermo ha attivato la carriera alias per studenti transgender e non binari, consentendo l\'uso del nome elettivo nei registri, nel badge e nella documentazione interna dell\'ateneo.'
			},
			{
				domanda: 'Esiste un centro per la disforia di genere a Palermo e in Sicilia?',
				risposta: 'Sì, a Palermo operano due strutture pubbliche. L\'ARNAS Civico ha aperto nel 2013 il primo ambulatorio in Sicilia dedicato alle persone trans. Il Policlinico Paolo Giaccone ospita il Progetto T.U.T.T.O. (Tutela Umana dei Transessuali e Transgender in ambito Ospedaliero), attivo dal 2019, con un\'équipe che integra psichiatria, endocrinologia e chirurgia plastica e ha seguito circa 50 pazienti.'
			},
			{
				domanda: 'Quali sono i tempi del percorso di transizione a Palermo?',
				risposta: 'I tempi variano in base alla struttura e al percorso individuale. La valutazione psicologica richiede generalmente 4-8 mesi, seguita da 2-4 mesi per l\'avvio della terapia ormonale. La rettificazione anagrafica presso il Tribunale Civile di Palermo può richiedere 10-20 mesi. Per la chirurgia, che richiede centri fuori regione come il Niguarda a Milano, le liste d\'attesa arrivano a 1-3 anni. I tempi complessivi possono essere più lunghi rispetto ai centri del Nord, poiché le strutture palermitane sono punto di riferimento per tutta la Sicilia occidentale.'
			},
			{
				domanda: 'Quali associazioni supportano le persone trans a Palermo?',
				risposta: 'Arcigay Palermo, con sede alle Officine Arcobaleno, è il principale punto di riferimento: dal 2016 offre accompagnamento alla transizione tramite il suo sportello psicologico, consulenza legale attiva dal 2010 e il Gruppo Trans* per socializzazione e confronto. Gestisce anche il Centro Antidiscriminazioni Protego, primo in Sicilia occidentale. AGEDO Sicilia offre gruppi di sostegno per familiari, mentre il coordinamento Palermo Pride promuove visibilità e sensibilizzazione durante tutto l\'anno.'
			},
			{
				domanda: 'Il percorso di transizione a Palermo è coperto dal SSN?',
				risposta: 'Sì, il percorso di transizione a Palermo è coperto dal Servizio Sanitario Nazionale. Dal 2020, due determine AIFA garantiscono la copertura dei farmaci ormonali per la terapia di virilizzazione e femminilizzazione su tutto il territorio nazionale, previa diagnosi di un\'équipe multidisciplinare. L\'ARNAS Civico e il Policlinico Giaccone offrono valutazione e monitoraggio gratuiti. Per la chirurgia fuori regione, il SSN copre i costi tramite autorizzazione della ASP siciliana.'
			},
			{
				domanda: 'Come posso iniziare il percorso di transizione a Palermo?',
				risposta: 'Il primo passo è rivolgersi al proprio medico di base per ottenere un\'impegnativa per l\'Ambulatorio Identità di Genere dell\'ARNAS Civico o per il Progetto T.U.T.T.O. del Policlinico Paolo Giaccone. Arcigay Palermo offre un primo orientamento gratuito e accompagnamento nel percorso tramite lo sportello psicologico (attivo dal 2016) e la consulenza legale. È possibile contattare Arcigay Palermo all\'indirizzo palermo@arcigay.it per fissare un primo colloquio.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'situazione-trans-italia',
			'salute-mentale-persone-trans'
		],
		ultimoAggiornamento: '2026-03-02'
	},
	{
		slug: 'trieste',
		nome: 'Trieste',
		regione: 'Friuli-Venezia Giulia',
		provincia: 'TS',
		intro: 'Trieste, città di confine con una profonda tradizione mitteleuropea, offre alle persone transgender e non binarie un contesto più aperto rispetto a molte realtà del Nordest. L\'ASUGI (Azienda Sanitaria Universitaria Giuliano Isontina) ospita servizi endocrinologici e psicologici che supportano i percorsi di affermazione di genere. Pur essendo una città di dimensioni contenute, Trieste si distingue per una tradizione di apertura culturale e per la presenza dell\'Università degli Studi, che contribuisce con ricerca accademica e politiche inclusive.',
		metaDescription: 'Risorse trans a Trieste: servizi ASUGI, associazioni LGBTQ+, sportelli, iter sanitario e storia del movimento nel Friuli-Venezia Giulia.',
		contesto_locale: '',
		centri_gender_intro: '',
		associazioni_intro: '',
		sportelli_intro: '',
		image: '/images/citta/trieste.webp',
		centri_gender: [
			{
				nome: 'Ambulatorio di Endocrinologia — ASUGI',
				citta: 'Trieste',
				indirizzo: 'Via della Pietà 2/2, 34129 Trieste',
				telefono: '040 399 4260',
				sito: 'https://asugi.sanita.fvg.it',
				note: 'Servizio endocrinologico per i percorsi di affermazione di genere. Offre prescrizione e monitoraggio della terapia ormonale sostitutiva. Accesso tramite impegnativa del medico di base.'
			},
			{
				nome: 'Servizio di Psicologia Clinica — ASUGI',
				citta: 'Trieste',
				indirizzo: 'Via Giovanni Sai 1-3, 34128 Trieste',
				telefono: '040 399 7575',
				sito: 'https://asugi.sanita.fvg.it',
				note: 'Servizio di valutazione e accompagnamento psicologico per persone con varianza di genere. Collabora con l\'ambulatorio endocrinologico per un percorso integrato.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Trieste — Arcobaleno',
				tipo: 'lgbtq',
				citta: 'Trieste',
				sito: 'https://www.arcigaytrieste.it',
				descrizione: 'Sezione triestina di Arcigay. Offre sportello di ascolto, consulenza legale, gruppi di socializzazione e organizza il Pride FVG. Punto di riferimento per le persone LGBTQ+ nella provincia di Trieste.'
			},
			{
				nome: 'AGEDO Friuli-Venezia Giulia',
				tipo: 'genitori',
				citta: 'Trieste',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ nel Friuli-Venezia Giulia. Incontri periodici a Trieste e Udine con supporto telefonico per le famiglie di tutta la regione.'
			},
			{
				nome: 'Lune — Associazione Trans e Non Binaria FVG',
				tipo: 'lgbtq',
				citta: 'Trieste',
				descrizione: 'Associazione dedicata alle persone trans e non binarie del Friuli-Venezia Giulia. Offre gruppi di auto-mutuo aiuto, accompagnamento ai servizi e iniziative di sensibilizzazione sulla varianza di genere.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Trieste',
				tipo: 'psicologico',
				ente: 'Arcigay Trieste',
				citta: 'Trieste',
				orari: 'Mercoledì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali per persone trans e LGBTQ+. Colloqui gratuiti con operatori e operatrici formate.'
			},
			{
				nome: 'Sportello UNAR — Nodo Friuli-Venezia Giulia',
				tipo: 'antidiscriminazione',
				ente: 'UNAR — Ufficio Nazionale Antidiscriminazioni Razziali',
				citta: 'Trieste',
				note: 'Punto di contatto regionale per segnalazioni di discriminazione basate su identità di genere. Raggiungibile anche tramite il numero verde UNAR 800 901 010.'
			}
		],
		iter_sanitario: {
			intro: 'A Trieste il percorso di affermazione di genere si appoggia ai servizi dell\'ASUGI, che offre supporto endocrinologico e psicologico. Per le fasi più specialistiche, come la chirurgia, è possibile rivolgersi ai centri di Padova o Milano. La dimensione contenuta della città facilita un rapporto più diretto con i professionisti sanitari.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica presso l\'ASUGI. Il medico di base può anche indirizzarti verso Arcigay Trieste o Lune per un primo orientamento.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Il Servizio di Psicologia Clinica dell\'ASUGI avvia un percorso di valutazione e accompagnamento. I colloqui mirano alla comprensione dell\'identità di genere e alla definizione del percorso individuale.',
					ente: 'ASUGI — Servizio di Psicologia Clinica',
					tempiStimati: '3-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio della terapia ormonale',
					descrizione: 'L\'endocrinologo dell\'ASUGI prescrive la terapia ormonale sostitutiva dopo la valutazione. I controlli periodici vengono seguiti localmente, con esami del sangue ogni 3-6 mesi.',
					ente: 'ASUGI — Ambulatorio di Endocrinologia',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta di cambio del nome e del genere si presenta al Tribunale Civile di Trieste. Non è obbligatorio l\'intervento chirurgico. Un avvocato specializzato è consigliato; la Rete Lenford offre consulenze gratuite.',
					ente: 'Tribunale Civile di Trieste',
					tempiStimati: '8-16 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere è necessario rivolgersi a centri fuori regione, come l\'AOU di Padova, il CIG del Niguarda a Milano o il SAIFIP a Roma. Il SSN copre i costi con autorizzazione dell\'ASUGI.',
					ente: 'Centri di riferimento nazionale (Padova, Milano, Roma)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'L\'ASUGI di Trieste offre un percorso integrato endocrinologico e psicologico per le persone trans.',
				'Per la chirurgia di affermazione di genere, i centri di riferimento più vicini sono l\'AOU di Padova e il CIG del Niguarda a Milano.',
				'La terapia ormonale è coperta dal SSN tramite prescrizione specialistica dell\'endocrinologo ASUGI.',
				'La dimensione contenuta di Trieste consente spesso un rapporto più diretto e personalizzato con i professionisti sanitari.'
			]
		},
		storia_queer: {
			intro: 'Trieste, città di confine e crocevia culturale, ha una tradizione di apertura legata alla sua storia mitteleuropea. Il movimento per i diritti LGBTQ+ ha trovato terreno fertile in questo contesto cosmopolita.',
			eventi: [
				{
					anno: 1990,
					titolo: 'Tradizione mitteleuropea di tolleranza',
					descrizione: 'Trieste eredita dalla sua storia asburgica e dalla sua posizione di confine una cultura di convivenza e apertura verso le diversità, che favorisce un contesto sociale relativamente accogliente per le persone LGBTQ+.'
				},
				{
					anno: 2005,
					titolo: 'Primo Pride del Friuli-Venezia Giulia',
					descrizione: 'Il Friuli-Venezia Giulia ospita il suo primo Pride regionale con una significativa partecipazione dalla comunità di Trieste. L\'evento segna un punto di svolta nella visibilità delle persone LGBTQ+ e trans nella regione.'
				},
				{
					anno: 2018,
					titolo: 'Potenziamento dei servizi ASUGI',
					descrizione: 'L\'ASUGI struttura un percorso dedicato alle persone con varianza di genere, integrando i servizi di endocrinologia e psicologia clinica per offrire un accompagnamento più completo.'
				},
				{
					anno: 2023,
					titolo: 'Carriera alias all\'Università di Trieste',
					descrizione: 'L\'Università degli Studi di Trieste attiva la procedura di carriera alias per studenti transgender e non binari, garantendo l\'uso del nome elettivo nei registri, nel badge e nella documentazione interna.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione a Trieste?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per i servizi dell\'ASUGI (endocrinologia e psicologia clinica). Arcigay Trieste e l\'associazione Lune possono aiutare con l\'orientamento iniziale.'
			},
			{
				domanda: 'Quali servizi per persone trans sono disponibili a Trieste?',
				risposta: 'L\'ASUGI offre un percorso integrato con valutazione psicologica e terapia ormonale. Per la chirurgia di affermazione di genere è necessario rivolgersi a centri fuori regione, come l\'AOU di Padova o il Niguarda a Milano.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans a Trieste?',
				risposta: 'Sì, l\'associazione Lune offre gruppi di auto-mutuo aiuto specifici per persone trans e non binarie. Arcigay Trieste gestisce uno sportello di ascolto settimanale. AGEDO FVG fornisce supporto per le famiglie.'
			},
			{
				domanda: 'Come si ottiene la rettificazione anagrafica a Trieste?',
				risposta: 'La richiesta va presentata al Tribunale Civile di Trieste. Non è obbligatorio l\'intervento chirurgico. È consigliato affidarsi a un avvocato specializzato; la Rete Lenford offre consulenze legali gratuite.'
			},
			{
				domanda: 'L\'Università di Trieste offre la carriera alias?',
				risposta: 'Sì, l\'Università di Trieste ha attivato la carriera alias per studenti transgender e non binari, permettendo l\'uso del nome elettivo nei registri accademici, nella posta elettronica e nel badge universitario.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans'
		],
		ultimoAggiornamento: '2026-02-25'
	}
];

export const cittaDettaglio: Map<string, CittaDettaglio> = new Map(
	dati.map((c) => [c.slug, c])
);
