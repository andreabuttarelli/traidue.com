import type { RegioneDettaglio } from './regioni-dettaglio';

export const batch2: RegioneDettaglio[] = [
	{
		slug: 'puglia',
		nome: 'Puglia',
		capoluogo: 'Bari',
		intro: 'La Puglia offre alle persone transgender un panorama di servizi in crescita, con Bari come polo principale per i percorsi di affermazione di genere. Il Policlinico di Bari è il punto di riferimento regionale per l\'endocrinologia e la psicologia clinica legate alla disforia di genere, mentre l\'Ospedale Vito Fazzi di Lecce rappresenta un\'opzione per il territorio salentino. L\'associazionismo pugliese è radicato e attivo, con Arcigay presente in diverse città e realtà specifiche come l\'Associazione LGBTI Ferrante Ferranti a Lecce. La regione affronta sfide legate alla distribuzione territoriale dei servizi: le province più distanti da Bari possono incontrare difficoltà di accesso. Tuttavia, il tessuto sociale sta cambiando e il Bari Pride è diventato un appuntamento fisso che contribuisce alla visibilità della comunità trans pugliese. L\'iter sanitario passa attraverso le ASL provinciali e richiede un coordinamento attento tra medico di base e centri specializzati.',
		metaDescription: 'Risorse trans in Puglia: centri gender a Bari e Lecce, associazioni LGBTQ+, iter sanitario ASL e storia del movimento.',
		centri_gender: [
			{
				nome: 'Ambulatorio di Endocrinologia e Disforia di Genere — Policlinico di Bari',
				citta: 'Bari',
				indirizzo: 'Piazza Giulio Cesare 11, 70124 Bari',
				telefono: '080 559 2111',
				sito: 'https://www.policlinico.ba.it',
				note: 'Centro di riferimento regionale per i percorsi di affermazione di genere. Endocrinologia, psicologia clinica e supporto multidisciplinare.'
			},
			{
				nome: 'U.O.C. Endocrinologia — Ospedale Vito Fazzi',
				citta: 'Lecce',
				indirizzo: 'Piazzetta Filippo Muratore 1, 73100 Lecce',
				telefono: '0832 661 111',
				sito: 'https://www.sanita.puglia.it',
				note: 'Servizio endocrinologico per il Salento. Supporto per terapia ormonale con impegnativa del medico di base.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Bari',
				tipo: 'lgbtq',
				citta: 'Bari',
				sito: 'https://www.arcigaybari.it',
				descrizione: 'Sezione barese di Arcigay. Offre sportello di ascolto, consulenza legale e organizza eventi culturali e il Bari Pride.'
			},
			{
				nome: 'Associazione LGBTI Ferrante Ferranti',
				tipo: 'lgbtq',
				citta: 'Lecce',
				descrizione: 'Realtà leccese attiva per i diritti LGBTQ+ nel Salento. Organizza eventi, incontri di sensibilizzazione e offre supporto tra pari per persone trans.'
			},
			{
				nome: 'AGEDO Puglia',
				tipo: 'genitori',
				citta: 'Bari',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ in Puglia. Incontri periodici a Bari e supporto telefonico.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Bari',
				tipo: 'psicologico',
				ente: 'Arcigay Bari',
				citta: 'Bari',
				orari: 'Mercoledì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali per persone trans e LGBTQ+.'
			},
			{
				nome: 'Sportello Antidiscriminazione — Comune di Bari',
				tipo: 'antidiscriminazione',
				ente: 'Comune di Bari',
				citta: 'Bari',
				note: 'Segnalazione di episodi di discriminazione basati su identità di genere e orientamento sessuale.'
			}
		],
		iter_sanitario: {
			intro: 'In Puglia il percorso di affermazione di genere fa riferimento alle ASL provinciali e al Policlinico di Bari come centro specializzato regionale. L\'iter richiede un buon coordinamento tra medico di base e strutture ospedaliere.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica presso il Policlinico di Bari. Il medico di base può anche indirizzarti ai servizi territoriali della ASL di competenza.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-3 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui di valutazione presso il servizio di psicologia clinica del Policlinico di Bari. Il percorso mira all\'accompagnamento e alla comprensione dell\'identità di genere della persona.',
					ente: 'Policlinico di Bari — Psicologia Clinica',
					tempiStimati: '3-8 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo del Policlinico di Bari prescrive la terapia ormonale sostitutiva. I controlli sono periodici (ogni 3-6 mesi). Per chi vive nel Salento, l\'Ospedale Fazzi di Lecce può seguire i controlli.',
					ente: 'Policlinico di Bari / Ospedale Fazzi Lecce',
					tempiStimati: '2-4 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere sui documenti si richiede al Tribunale Civile competente (Bari, Lecce, Foggia, Taranto o Brindisi). I tempi variano a seconda del tribunale.',
					ente: 'Tribunale Civile',
					tempiStimati: '8-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere è spesso necessario rivolgersi a centri fuori regione, come il CIG del Niguarda a Milano o il SAIFIP a Roma. Il SSN copre i costi anche fuori regione con autorizzazione.',
					ente: 'Centri di riferimento nazionale (fuori regione)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Il Policlinico di Bari è il centro di riferimento regionale: accetta pazienti da tutta la Puglia.',
				'Per la chirurgia, la maggior parte delle persone pugliesi si rivolge a centri fuori regione (Milano, Roma).',
				'La terapia ormonale è coperta dal SSN tramite esenzione specifica anche in Puglia.',
				'Le associazioni locali possono facilitare l\'orientamento nel sistema sanitario regionale.'
			]
		},
		storia_queer: {
			intro: 'La Puglia ha una storia significativa nel panorama dei diritti LGBTQ+ del Sud Italia, con un movimento che ha saputo crescere nonostante le difficoltà del contesto sociale.',
			eventi: [
				{
					anno: 1985,
					titolo: 'Primi collettivi LGBTQ+ a Bari',
					descrizione: 'Nascono i primi gruppi organizzati per i diritti delle persone LGBTQ+ a Bari, in un contesto sociale ancora molto chiuso. Le persone trans sono tra le prime a rendersi visibili.'
				},
				{
					anno: 2003,
					titolo: 'Fondazione di Arcigay Bari',
					descrizione: 'Arcigay Bari si struttura come sezione locale e diventa un punto di riferimento stabile per la comunità LGBTQ+ pugliese, offrendo servizi e promuovendo diritti.'
				},
				{
					anno: 2009,
					titolo: 'Primo Bari Pride',
					descrizione: 'La città di Bari ospita il suo primo Pride, con una partecipazione significativa e una forte presenza della comunità trans. L\'evento segna un punto di svolta nella visibilità LGBTQ+ in Puglia.'
				},
				{
					anno: 2019,
					titolo: 'Crescita del movimento trans pugliese',
					descrizione: 'Le associazioni pugliesi consolidano sportelli e servizi dedicati alle persone trans, con una rete sempre più strutturata tra Bari, Lecce e Foggia.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Puglia?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per il Policlinico di Bari, che è il centro di riferimento regionale. Arcigay Bari può aiutare nell\'orientamento ai servizi.'
			},
			{
				domanda: 'Ci sono centri gender anche fuori Bari in Puglia?',
				risposta: 'L\'Ospedale Vito Fazzi di Lecce offre servizi di endocrinologia per il Salento. Per le altre province, il centro di riferimento rimane il Policlinico di Bari, raggiungibile con impegnativa del medico di base.'
			},
			{
				domanda: 'È possibile fare la chirurgia di affermazione di genere in Puglia?',
				risposta: 'Attualmente, per la chirurgia di affermazione di genere la maggior parte delle persone pugliesi si rivolge a centri fuori regione come il CIG del Niguarda a Milano o il SAIFIP a Roma. Il SSN copre i costi con autorizzazione.'
			},
			{
				domanda: 'La terapia ormonale è gratuita in Puglia?',
				risposta: 'Sì, la terapia ormonale sostitutiva per la disforia di genere è coperta dal Servizio Sanitario Nazionale. È necessaria la prescrizione di un endocrinologo e l\'esenzione specifica.'
			},
			{
				domanda: 'Esistono gruppi di supporto per persone trans in Puglia?',
				risposta: 'Arcigay Bari offre uno sportello di ascolto e gruppi di supporto. A Lecce l\'Associazione Ferrante Ferranti organizza incontri tra pari. AGEDO Puglia accoglie le famiglie di persone LGBTQ+.'
			},
			{
				domanda: 'Quanto tempo richiede la rettificazione anagrafica in Puglia?',
				risposta: 'I tempi variano da 8 a 18 mesi a seconda del Tribunale competente. Un avvocato specializzato può aiutare a velocizzare il procedimento. La Rete Lenford offre consulenze gratuite.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'situazione-trans-italia',
			'trans-e-sanita'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'sicilia',
		nome: 'Sicilia',
		capoluogo: 'Palermo',
		intro: 'La Sicilia rappresenta una realtà complessa per le persone transgender, dove la vivacità dell\'associazionismo si confronta con una rete sanitaria ancora in via di consolidamento. Palermo è il principale centro per i servizi di affermazione di genere sull\'isola, con il Policlinico Universitario Paolo Giaccone che offre percorsi endocrinologici e psicologici. Catania dispone di servizi presso l\'Azienda Ospedaliero-Universitaria Policlinico. L\'associazionismo siciliano è particolarmente vivace: Arcigay Palermo e il coordinamento Catania Pride hanno costruito reti di supporto importanti per le persone trans. La Sicilia presenta sfide specifiche legate alla distribuzione territoriale dei servizi e ai tempi del sistema sanitario e giudiziario. Tuttavia, il movimento per i diritti trans sull\'isola ha una storia significativa, con figure come la comunità trans palermitana che ha saputo costruire spazi di visibilità e solidarietà anche in contesti difficili.',
		metaDescription: 'Risorse trans in Sicilia: centri gender a Palermo e Catania, associazioni, iter sanitario ASL e storia del movimento.',
		centri_gender: [
			{
				nome: 'Ambulatorio Disforia di Genere — Policlinico Paolo Giaccone',
				citta: 'Palermo',
				indirizzo: 'Via del Vespro 129, 90127 Palermo',
				telefono: '091 655 2111',
				sito: 'https://www.policlinico.pa.it',
				note: 'Centro di riferimento per la Sicilia occidentale. Percorso endocrinologico e psicologico per la disforia di genere.'
			},
			{
				nome: 'U.O.C. Endocrinologia — AOU Policlinico di Catania',
				citta: 'Catania',
				indirizzo: 'Via Santa Sofia 78, 95123 Catania',
				telefono: '095 378 1111',
				sito: 'https://www.policlinico.unict.it',
				note: 'Servizio endocrinologico per la Sicilia orientale. Supporto per terapia ormonale e monitoraggio clinico.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Palermo',
				tipo: 'lgbtq',
				citta: 'Palermo',
				sito: 'https://www.arcigaypalermo.it',
				descrizione: 'Sezione palermitana di Arcigay. Offre sportello di ascolto, consulenza legale, gruppi di supporto e organizza il Palermo Pride.'
			},
			{
				nome: 'Arcigay Catania',
				tipo: 'lgbtq',
				citta: 'Catania',
				sito: 'https://www.arcigaycatania.it',
				descrizione: 'Sezione catanese di Arcigay. Attiva con sportelli, eventi culturali e supporto per persone LGBTQ+ nella Sicilia orientale.'
			},
			{
				nome: 'AGEDO Sicilia',
				tipo: 'genitori',
				citta: 'Palermo',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ in Sicilia. Incontri a Palermo e Catania.'
			},
			{
				nome: 'Famiglie Arcobaleno Sicilia',
				tipo: 'genitori',
				citta: 'Palermo',
				descrizione: 'Associazione che sostiene le famiglie LGBTQ+ in Sicilia, offrendo supporto e promuovendo la visibilità delle famiglie con genitori trans.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans — Arcigay Palermo',
				tipo: 'psicologico',
				ente: 'Arcigay Palermo',
				citta: 'Palermo',
				orari: 'Giovedì 16:00-18:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, supporto tra pari per persone trans.'
			},
			{
				nome: 'Sportello Legale LGBTQ+ — Arcigay Catania',
				tipo: 'legale',
				ente: 'Arcigay Catania',
				citta: 'Catania',
				orari: 'Su appuntamento',
				note: 'Consulenza legale gratuita su rettificazione anagrafica e discriminazione.'
			}
		],
		iter_sanitario: {
			intro: 'In Sicilia il percorso di affermazione di genere passa attraverso le ASP (Aziende Sanitarie Provinciali) e i policlinici universitari di Palermo e Catania. I tempi possono essere significativi, ma la rete di servizi si sta rafforzando.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica presso il Policlinico di Palermo o il Policlinico di Catania, a seconda della zona di residenza.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-3 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con il servizio di psicologia clinica del policlinico di riferimento. Il percorso è orientato all\'accompagnamento e alla definizione delle esigenze della persona.',
					ente: 'Policlinico Giaccone / Policlinico Catania',
					tempiStimati: '4-10 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo prescrive la terapia ormonale sostitutiva dopo la valutazione. I controlli sono periodici. In Sicilia le ASP possono supportare il monitoraggio sul territorio.',
					ente: 'Policlinico Giaccone / Policlinico Catania',
					tempiStimati: '2-5 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile competente (Palermo, Catania, Messina, ecc.). I tempi della giustizia in Sicilia possono essere lunghi.',
					ente: 'Tribunale Civile',
					tempiStimati: '12-24 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere è generalmente necessario rivolgersi a centri fuori regione (Niguarda a Milano, SAIFIP a Roma). Il SSN copre i costi con autorizzazione della ASP.',
					ente: 'Centri di riferimento nazionale (fuori regione)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'In Sicilia le ASL sono chiamate ASP (Aziende Sanitarie Provinciali).',
				'I due poli principali sono Palermo per la Sicilia occidentale e Catania per quella orientale.',
				'Per la chirurgia, la quasi totalità delle persone siciliane si rivolge a centri del continente.',
				'Le associazioni locali sono fondamentali per orientarsi nel sistema sanitario regionale.'
			]
		},
		storia_queer: {
			intro: 'La Sicilia ha una storia peculiare nel panorama dei diritti LGBTQ+ italiano, dove la lotta per la visibilità si intreccia con un contesto culturale complesso e contraddittorio.',
			eventi: [
				{
					anno: 1981,
					titolo: 'Primi collettivi LGBTQ+ in Sicilia',
					descrizione: 'Nascono i primi gruppi organizzati per i diritti delle persone LGBTQ+ a Palermo e Catania, spesso in connessione con i movimenti di sinistra e femministi.'
				},
				{
					anno: 1990,
					titolo: 'Attivismo contro l\'AIDS e visibilità trans',
					descrizione: 'La crisi dell\'AIDS porta alla nascita di iniziative di solidarietà che coinvolgono anche la comunità trans siciliana, creando nuove forme di aggregazione e attivismo.'
				},
				{
					anno: 2002,
					titolo: 'Primo Catania Pride',
					descrizione: 'Catania ospita il primo grande Pride della Sicilia orientale, con una forte partecipazione della comunità trans e un grande impatto mediatico regionale.'
				},
				{
					anno: 2013,
					titolo: 'Palermo Pride diventa un evento stabile',
					descrizione: 'Il Palermo Pride si consolida come appuntamento annuale, diventando uno dei più partecipati del Sud Italia e simbolo della visibilità LGBTQ+ in Sicilia.'
				},
				{
					anno: 2022,
					titolo: 'Alias universitari negli atenei siciliani',
					descrizione: 'Le università di Palermo e Catania adottano la carriera alias per studenti trans, un passo significativo per l\'inclusione nelle istituzioni siciliane.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Sicilia?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per il Policlinico di Palermo o quello di Catania. Le associazioni come Arcigay Palermo e Arcigay Catania possono fornire orientamento.'
			},
			{
				domanda: 'Ci sono centri gender in Sicilia?',
				risposta: 'I due principali poli sono il Policlinico Paolo Giaccone di Palermo e il Policlinico di Catania. Per le province più distanti (Agrigento, Trapani, Ragusa, Siracusa, Enna, Caltanissetta, Messina) è necessario spostarsi verso questi due centri.'
			},
			{
				domanda: 'È possibile fare la chirurgia di affermazione di genere in Sicilia?',
				risposta: 'Attualmente, per la chirurgia di affermazione di genere la quasi totalità delle persone siciliane si rivolge a centri fuori regione. Il SSN copre i costi con autorizzazione della ASP.'
			},
			{
				domanda: 'I tempi del percorso sono più lunghi in Sicilia?',
				risposta: 'I tempi tendono a essere più lunghi rispetto alle regioni del Nord, sia per le visite specialistiche che per la rettificazione anagrafica. Un buon orientamento iniziale può aiutare a ridurre i tempi.'
			},
			{
				domanda: 'Esistono servizi per persone trans minori in Sicilia?',
				risposta: 'I policlinici di Palermo e Catania possono accogliere anche adolescenti con il coinvolgimento dei genitori. Il percorso per i minori prevede un approccio graduale, partendo dal supporto psicologico.'
			},
			{
				domanda: 'Ci sono gruppi di supporto per famiglie di persone trans in Sicilia?',
				risposta: 'AGEDO Sicilia organizza gruppi di sostegno per genitori e familiari a Palermo e Catania. Famiglie Arcobaleno Sicilia offre supporto specifico per le famiglie LGBTQ+.'
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
		slug: 'sardegna',
		nome: 'Sardegna',
		capoluogo: 'Cagliari',
		intro: 'La Sardegna presenta per le persone transgender sfide uniche legate alla sua condizione insulare, che può complicare l\'accesso ai servizi specializzati non disponibili sull\'isola. Cagliari è il centro principale per i percorsi di affermazione di genere, con l\'AOU di Cagliari e il Policlinico Universitario Duilio Casula che offrono servizi di endocrinologia e supporto psicologico. Sassari rappresenta il secondo polo con l\'AOU di Sassari. L\'associazionismo sardo è attivo e radicato, con Arcigay Cagliari e ARC Sassari che forniscono supporto concreto e organizzano eventi di visibilità. La condizione insulare rende particolarmente oneroso il ricorso a servizi chirurgici fuori regione, e le associazioni locali svolgono un ruolo fondamentale nell\'accompagnamento delle persone trans nei percorsi sanitari e legali. Il Sardegna Pride è diventato un appuntamento importante per la visibilità della comunità LGBTQ+ isolana.',
		metaDescription: 'Risorse trans in Sardegna: centri a Cagliari e Sassari, associazioni, iter sanitario ATS e sfide dell\'insularità.',
		centri_gender: [
			{
				nome: 'U.O.C. Endocrinologia — AOU di Cagliari (Policlinico Duilio Casula)',
				citta: 'Cagliari',
				indirizzo: 'SS 554, Bivio per Sestu, 09042 Monserrato (CA)',
				telefono: '070 609 5200',
				sito: 'https://www.aoucagliari.it',
				note: 'Centro di riferimento per la Sardegna meridionale. Percorso endocrinologico e psicologico per la disforia di genere.'
			},
			{
				nome: 'Clinica Endocrinologica — AOU di Sassari',
				citta: 'Sassari',
				indirizzo: 'Viale San Pietro 8, 07100 Sassari',
				telefono: '079 228 000',
				sito: 'https://www.aousassari.it',
				note: 'Servizio endocrinologico per la Sardegna settentrionale. Supporto per terapia ormonale e monitoraggio clinico.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Cagliari',
				tipo: 'lgbtq',
				citta: 'Cagliari',
				sito: 'https://www.arcigaycagliari.it',
				descrizione: 'Sezione cagliaritana di Arcigay. Offre sportello di ascolto, consulenza legale e organizza il Sardegna Pride.'
			},
			{
				nome: 'ARC — Associazione Radicale Catena Ferraro Sassari',
				tipo: 'lgbtq',
				citta: 'Sassari',
				descrizione: 'Associazione attiva per i diritti LGBTQ+ nella Sardegna settentrionale. Organizza eventi culturali, incontri di sensibilizzazione e offre supporto tra pari.'
			},
			{
				nome: 'AGEDO Sardegna',
				tipo: 'genitori',
				citta: 'Cagliari',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ in Sardegna. Incontri periodici a Cagliari.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Cagliari',
				tipo: 'psicologico',
				ente: 'Arcigay Cagliari',
				citta: 'Cagliari',
				orari: 'Martedì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, supporto tra pari per persone trans.'
			}
		],
		iter_sanitario: {
			intro: 'In Sardegna il percorso di affermazione di genere passa attraverso le ATS (Azienda per la Tutela della Salute) e i policlinici universitari di Cagliari e Sassari. La condizione insulare pone sfide specifiche per l\'accesso ai servizi chirurgici.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica presso l\'AOU di Cagliari o l\'AOU di Sassari, a seconda della zona di residenza.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-3 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui di valutazione presso il servizio di psicologia clinica del policlinico di riferimento. Il percorso prevede un accompagnamento orientato alla comprensione dell\'identità di genere.',
					ente: 'AOU Cagliari / AOU Sassari',
					tempiStimati: '3-8 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo prescrive la terapia ormonale sostitutiva dopo la valutazione. I controlli periodici possono essere effettuati presso il policlinico di riferimento.',
					ente: 'AOU Cagliari / AOU Sassari',
					tempiStimati: '2-4 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile competente (Cagliari o Sassari). I tempi della giustizia in Sardegna sono nella media nazionale.',
					ente: 'Tribunale Civile di Cagliari / Sassari',
					tempiStimati: '8-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere è necessario recarsi fuori regione (Niguarda a Milano, SAIFIP a Roma). La condizione insulare rende il viaggio più impegnativo e costoso. Il SSN copre i costi con autorizzazione ATS.',
					ente: 'Centri di riferimento nazionale (fuori regione)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'La Sardegna ha una ATS unica (ATS Sardegna) che coordina i servizi sanitari sul territorio.',
				'La condizione insulare rende i viaggi per chirurgia fuori regione più onerosi rispetto ad altre regioni.',
				'Le associazioni locali possono aiutare con informazioni pratiche su viaggi e logistica.',
				'La terapia ormonale è coperta dal SSN anche in Sardegna tramite esenzione specifica.'
			]
		},
		storia_queer: {
			intro: 'La Sardegna ha costruito un proprio percorso di visibilità e diritti LGBTQ+, con un movimento che ha saputo crescere in un contesto insulare e con dinamiche culturali specifiche.',
			eventi: [
				{
					anno: 1986,
					titolo: 'Primi gruppi LGBTQ+ in Sardegna',
					descrizione: 'Nascono i primi gruppi organizzati per i diritti delle persone LGBTQ+ a Cagliari, in un contesto sociale dove l\'omosessualità e la transessualità erano ancora fortemente stigmatizzate.'
				},
				{
					anno: 2005,
					titolo: 'Nascita di Arcigay Cagliari',
					descrizione: 'Arcigay Cagliari si struttura come sezione locale e diventa il principale punto di riferimento per la comunità LGBTQ+ sarda, offrendo servizi concreti e promuovendo visibilità.'
				},
				{
					anno: 2012,
					titolo: 'Primo Sardegna Pride',
					descrizione: 'Cagliari ospita il primo grande Pride della Sardegna, con una partecipazione che supera le aspettative e dimostra la vitalità della comunità LGBTQ+ isolana.'
				},
				{
					anno: 2021,
					titolo: 'Carriera alias nelle università sarde',
					descrizione: 'L\'Università di Cagliari adotta la carriera alias per studenti trans, un passo significativo per l\'inclusione nell\'isola.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Sardegna?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per l\'AOU di Cagliari o l\'AOU di Sassari. Arcigay Cagliari può fornire orientamento e supporto nell\'accesso ai servizi.'
			},
			{
				domanda: 'È un problema vivere in Sardegna per il percorso di transizione?',
				risposta: 'L\'insularità crea difficoltà soprattutto per la chirurgia, che richiede viaggi nella penisola. Per la terapia ormonale e il supporto psicologico, i policlinici di Cagliari e Sassari offrono servizi accessibili. Le associazioni possono aiutare con la logistica.'
			},
			{
				domanda: 'La chirurgia di affermazione di genere si può fare in Sardegna?',
				risposta: 'Attualmente no. È necessario recarsi fuori regione, tipicamente al Niguarda a Milano o al SAIFIP a Roma. Il SSN copre i costi con autorizzazione ATS, ma le spese di viaggio e soggiorno sono a carico del paziente.'
			},
			{
				domanda: 'Esistono servizi trans anche a Sassari?',
				risposta: 'L\'AOU di Sassari offre servizi di endocrinologia. A Sassari è attiva l\'associazione ARC che fornisce supporto alla comunità LGBTQ+ della Sardegna settentrionale.'
			},
			{
				domanda: 'La terapia ormonale è gratuita in Sardegna?',
				risposta: 'Sì, la terapia ormonale sostitutiva è coperta dal SSN tramite esenzione specifica. È necessaria la prescrizione dell\'endocrinologo del centro di riferimento.'
			},
			{
				domanda: 'Ci sono gruppi di supporto per persone trans in Sardegna?',
				risposta: 'Arcigay Cagliari offre uno sportello di ascolto e orientamento. AGEDO Sardegna organizza gruppi di sostegno per le famiglie. Le attività sono concentrate a Cagliari ma raggiungono anche altre zone tramite supporto telefonico e online.'
			}
		],
		articoli_correlati: [
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans',
			'trans-e-sanita',
			'diritti-trans-mancanti'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'calabria',
		nome: 'Calabria',
		capoluogo: 'Catanzaro',
		intro: 'La Calabria rappresenta una delle regioni più sfidanti per le persone transgender in Italia, con una rete di servizi specializzati ancora limitata e una distribuzione territoriale che concentra le risorse nei principali capoluoghi. L\'Azienda Ospedaliera Pugliese-Ciaccio di Catanzaro e l\'Azienda Ospedaliera di Cosenza sono i principali punti di riferimento per i percorsi endocrinologici. L\'associazionismo calabrese, pur in un contesto difficile, ha saputo costruire reti di supporto importanti: Arcigay Cosenza e Arcigay Reggio Calabria sono le realtà più strutturate. La regione soffre di una carenza di servizi chirurgici specifici, rendendo quasi sempre necessario il ricorso a centri fuori regione. Nonostante le difficoltà, il movimento per i diritti LGBTQ+ in Calabria sta crescendo, con i Pride locali che stanno aumentando la visibilità della comunità trans e promuovendo un cambiamento culturale significativo.',
		metaDescription: 'Risorse trans in Calabria: centri a Catanzaro e Cosenza, associazioni LGBTQ+, iter sanitario ASP e supporto disponibile.',
		centri_gender: [
			{
				nome: 'U.O.C. Endocrinologia — AO Pugliese-Ciaccio',
				citta: 'Catanzaro',
				indirizzo: 'Viale Pio X, 88100 Catanzaro',
				telefono: '0961 883 111',
				sito: 'https://www.aocatanzaro.it',
				note: 'Servizio endocrinologico di riferimento regionale. Supporto per terapia ormonale con impegnativa del medico di base.'
			},
			{
				nome: 'U.O.C. Endocrinologia — AO di Cosenza',
				citta: 'Cosenza',
				indirizzo: 'Via Felice Migliori, 87100 Cosenza',
				telefono: '0984 681 111',
				sito: 'https://www.aocosenza.it',
				note: 'Servizio endocrinologico per la provincia di Cosenza. Disponibile per il monitoraggio della terapia ormonale.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Cosenza',
				tipo: 'lgbtq',
				citta: 'Cosenza',
				sito: 'https://www.arcigaycosenza.it',
				descrizione: 'Sezione cosentina di Arcigay. Offre sportello di ascolto, consulenza e organizza il Cosenza Pride. Punto di riferimento per le persone LGBTQ+ dell\'area.'
			},
			{
				nome: 'Arcigay Reggio Calabria — I Due Mari',
				tipo: 'lgbtq',
				citta: 'Reggio Calabria',
				descrizione: 'Sezione reggina di Arcigay. Attiva con sportelli, eventi culturali e supporto per persone LGBTQ+ nella Calabria meridionale.'
			},
			{
				nome: 'AGEDO Calabria',
				tipo: 'genitori',
				citta: 'Cosenza',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppo di sostegno per genitori e familiari di persone LGBTQ+ in Calabria. Incontri periodici e supporto telefonico.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Cosenza',
				tipo: 'psicologico',
				ente: 'Arcigay Cosenza',
				citta: 'Cosenza',
				orari: 'Venerdì 16:00-18:00',
				note: 'Ascolto, orientamento ai servizi e supporto tra pari. Attivo anche per persone trans.'
			}
		],
		iter_sanitario: {
			intro: 'In Calabria il percorso di affermazione di genere passa attraverso le ASP (Aziende Sanitarie Provinciali) e i reparti di endocrinologia delle aziende ospedaliere. La rete di servizi specializzati è ancora in costruzione.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica presso l\'AO Pugliese-Ciaccio di Catanzaro o l\'AO di Cosenza. Il medico di base è il primo interlocutore per avviare il percorso.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-4 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Per la valutazione psicologica potrebbe essere necessario rivolgersi a professionisti privati o a centri fuori regione, data la limitata disponibilità di servizi specializzati in disforia di genere sul territorio calabrese.',
					ente: 'Servizi di psicologia ASP / professionisti privati',
					tempiStimati: '3-10 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo dell\'AO Pugliese-Ciaccio o dell\'AO di Cosenza può prescrivere e monitorare la terapia ormonale sostitutiva. I controlli sono periodici.',
					ente: 'AO Pugliese-Ciaccio / AO Cosenza',
					tempiStimati: '2-5 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile competente (Catanzaro, Cosenza, Reggio Calabria, Crotone, Vibo Valentia). I tempi possono essere lunghi.',
					ente: 'Tribunale Civile',
					tempiStimati: '12-24 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere è necessario rivolgersi a centri fuori regione (Niguarda a Milano, SAIFIP a Roma). Il SSN copre i costi con autorizzazione ASP.',
					ente: 'Centri di riferimento nazionale (fuori regione)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'La Calabria ha una rete di servizi specializzati in disforia di genere ancora limitata.',
				'Le associazioni locali (Arcigay Cosenza, Arcigay Reggio Calabria) sono risorse fondamentali per l\'orientamento.',
				'Per la chirurgia è quasi sempre necessario rivolgersi a centri fuori regione.',
				'Valutare la possibilità di un percorso psicologico con professionisti specializzati, anche attraverso la telemedicina.'
			]
		},
		storia_queer: {
			intro: 'Il movimento per i diritti LGBTQ+ in Calabria ha dovuto confrontarsi con un contesto sociale particolarmente complesso, ma ha saputo costruire spazi di visibilità e supporto significativi.',
			eventi: [
				{
					anno: 1990,
					titolo: 'Primi gruppi LGBTQ+ in Calabria',
					descrizione: 'Nascono le prime forme di aggregazione LGBTQ+ organizzata a Cosenza e Reggio Calabria, spesso legate ai centri sociali e ai movimenti di sinistra.'
				},
				{
					anno: 2005,
					titolo: 'Fondazione di Arcigay Cosenza',
					descrizione: 'Arcigay Cosenza si struttura e diventa il primo punto di riferimento stabile per la comunità LGBTQ+ calabrese, offrendo servizi e promuovendo visibilità.'
				},
				{
					anno: 2014,
					titolo: 'Primo Cosenza Pride',
					descrizione: 'Cosenza ospita il primo grande Pride calabrese, con una partecipazione che sorprende e dimostra la crescita del movimento LGBTQ+ nella regione.'
				},
				{
					anno: 2019,
					titolo: 'Crescita del movimento trans in Calabria',
					descrizione: 'Le associazioni calabresi attivano sportelli dedicati alle persone trans e rafforzano la rete di supporto sul territorio, con iniziative di sensibilizzazione nelle scuole e nelle istituzioni.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Calabria?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per il reparto di endocrinologia dell\'AO Pugliese-Ciaccio di Catanzaro o dell\'AO di Cosenza. Arcigay Cosenza può fornire orientamento.'
			},
			{
				domanda: 'Ci sono centri gender specializzati in Calabria?',
				risposta: 'La Calabria non dispone di centri gender dedicati come quelli di Milano o Roma. I servizi di endocrinologia delle aziende ospedaliere possono seguire la terapia ormonale, ma per percorsi completi è spesso necessario rivolgersi fuori regione.'
			},
			{
				domanda: 'È possibile fare la chirurgia di affermazione di genere in Calabria?',
				risposta: 'No, attualmente è necessario rivolgersi a centri fuori regione (Niguarda a Milano, SAIFIP a Roma). Il SSN copre i costi con autorizzazione della ASP di appartenenza.'
			},
			{
				domanda: 'La terapia ormonale è disponibile in Calabria?',
				risposta: 'Sì, i reparti di endocrinologia delle AO di Catanzaro e Cosenza possono prescrivere e monitorare la terapia ormonale. È coperta dal SSN con esenzione specifica.'
			},
			{
				domanda: 'Dove trovare supporto psicologico per persone trans in Calabria?',
				risposta: 'Arcigay Cosenza e Arcigay Reggio Calabria offrono sportelli di ascolto. Per un percorso psicologico specializzato, potrebbe essere utile rivolgersi a professionisti privati o considerare la telemedicina con centri specializzati.'
			},
			{
				domanda: 'Ci sono gruppi di supporto per famiglie in Calabria?',
				risposta: 'AGEDO Calabria organizza gruppi di sostegno per genitori e familiari di persone LGBTQ+. Arcigay Cosenza offre anche supporto e orientamento alle famiglie.'
			}
		],
		articoli_correlati: [
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans',
			'situazione-trans-italia',
			'diritti-trans-mancanti'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'abruzzo',
		nome: 'Abruzzo',
		capoluogo: "L'Aquila",
		intro: 'L\'Abruzzo offre alle persone transgender una rete di servizi in crescita, concentrata principalmente nei capoluoghi di provincia. L\'Aquila, capoluogo di regione, e Pescara, città più grande, rappresentano i principali poli per i percorsi di affermazione di genere. L\'Ospedale San Salvatore dell\'Aquila e l\'Ospedale Spirito Santo di Pescara offrono servizi di endocrinologia accessibili con impegnativa del medico di base. L\'associazionismo abruzzese è attivo con realtà come Arcigay Chieti-Pescara e Arcigay Teramo che forniscono supporto e orientamento. La regione si caratterizza per una dimensione più raccolta rispetto alle grandi regioni, il che facilita i rapporti personali con le strutture sanitarie ma limita la specializzazione dei servizi. Per la chirurgia di affermazione di genere è necessario rivolgersi a centri fuori regione. L\'Abruzzo Pride sta crescendo in partecipazione e contribuisce a rendere visibile la comunità trans nella regione.',
		metaDescription: 'Risorse trans in Abruzzo: centri a L\'Aquila e Pescara, associazioni LGBTQ+, iter sanitario ASL e supporto disponibile.',
		centri_gender: [
			{
				nome: 'U.O.C. Endocrinologia — Ospedale San Salvatore',
				citta: "L'Aquila",
				indirizzo: 'Via Lorenzo Natali 1, 67100 L\'Aquila',
				telefono: '0862 368 111',
				sito: 'https://www.asl1abruzzo.it',
				note: 'Servizio endocrinologico dell\'ospedale regionale. Disponibile per terapia ormonale con impegnativa del medico di base.'
			},
			{
				nome: 'U.O.C. Endocrinologia — Ospedale Spirito Santo',
				citta: 'Pescara',
				indirizzo: 'Via Renato Paolini 47, 65124 Pescara',
				telefono: '085 425 2111',
				sito: 'https://www.asl.pe.it',
				note: 'Servizio endocrinologico per la provincia di Pescara e Chieti. Supporto per terapia ormonale e monitoraggio.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Chieti-Pescara — Sylvia Rivera',
				tipo: 'lgbtq',
				citta: 'Pescara',
				sito: 'https://www.arcigaypescara.it',
				descrizione: 'Sezione di Arcigay per le province di Chieti e Pescara. Offre sportello di ascolto, consulenza legale e organizza il Pride abruzzese.'
			},
			{
				nome: 'Arcigay Teramo',
				tipo: 'lgbtq',
				citta: 'Teramo',
				descrizione: 'Sezione teramana di Arcigay. Attiva con sportelli di ascolto, eventi culturali e supporto per persone LGBTQ+ nella provincia.'
			},
			{
				nome: 'AGEDO Abruzzo',
				tipo: 'genitori',
				citta: 'Pescara',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ in Abruzzo. Incontri periodici a Pescara e supporto telefonico.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Chieti-Pescara',
				tipo: 'psicologico',
				ente: 'Arcigay Chieti-Pescara',
				citta: 'Pescara',
				orari: 'Mercoledì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, supporto tra pari per persone trans e LGBTQ+.'
			},
			{
				nome: 'Sportello Legale LGBTQ+',
				tipo: 'legale',
				ente: 'Arcigay Chieti-Pescara',
				citta: 'Pescara',
				orari: 'Su appuntamento',
				note: 'Consulenza legale gratuita su rettificazione anagrafica, discriminazione e diritto del lavoro.'
			}
		],
		iter_sanitario: {
			intro: 'In Abruzzo il percorso di affermazione di genere fa riferimento alle ASL provinciali e ai reparti di endocrinologia degli ospedali principali. La regione offre servizi di base ma per percorsi più complessi può essere necessario rivolgersi fuori regione.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica presso l\'Ospedale San Salvatore dell\'Aquila o l\'Ospedale Spirito Santo di Pescara, a seconda della zona di residenza.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-3 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con il servizio di psicologia della ASL o con professionisti specializzati. In Abruzzo potrebbe essere utile rivolgersi a professionisti con esperienza specifica in disforia di genere, anche attraverso la telemedicina.',
					ente: 'ASL / professionisti specializzati',
					tempiStimati: '2-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo prescrive la terapia ormonale sostitutiva. Il monitoraggio può essere effettuato presso l\'ospedale di riferimento provinciale.',
					ente: 'Ospedale San Salvatore / Ospedale Spirito Santo',
					tempiStimati: '2-4 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile competente (L\'Aquila, Pescara, Chieti, Teramo). I tempi variano a seconda del tribunale.',
					ente: 'Tribunale Civile',
					tempiStimati: '8-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere è necessario rivolgersi a centri fuori regione. Roma (SAIFIP) è la destinazione più accessibile dall\'Abruzzo. Il SSN copre i costi con autorizzazione ASL.',
					ente: 'Centri di riferimento nazionale (fuori regione)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'L\'Abruzzo non dispone di centri gender dedicati, ma i reparti di endocrinologia possono seguire la terapia ormonale.',
				'Roma (SAIFIP) è il centro di riferimento più vicino per percorsi completi e chirurgia.',
				'Le associazioni Arcigay locali sono la migliore risorsa per orientarsi nel sistema sanitario regionale.',
				'La terapia ormonale è coperta dal SSN anche in Abruzzo tramite esenzione specifica.'
			]
		},
		storia_queer: {
			intro: 'L\'Abruzzo ha sviluppato un movimento per i diritti LGBTQ+ con dinamiche proprie, segnato dalla dimensione regionale raccolta e dalla vicinanza con Roma.',
			eventi: [
				{
					anno: 1995,
					titolo: 'Prime associazioni LGBTQ+ in Abruzzo',
					descrizione: 'Nascono i primi gruppi organizzati per i diritti LGBTQ+ a Pescara e L\'Aquila, spesso collegati a circoli culturali e associazioni nazionali.'
				},
				{
					anno: 2007,
					titolo: 'Fondazione di Arcigay Chieti-Pescara',
					descrizione: 'Arcigay Chieti-Pescara si struttura e diventa il principale punto di riferimento per la comunità LGBTQ+ abruzzese, coprendo le due province più popolose.'
				},
				{
					anno: 2012,
					titolo: 'Primo Abruzzo Pride',
					descrizione: 'L\'Abruzzo ospita il suo primo Pride itinerante, che si svolge in diverse città della regione negli anni successivi, aumentando la visibilità della comunità LGBTQ+ e trans.'
				},
				{
					anno: 2020,
					titolo: 'Rafforzamento dei servizi durante la pandemia',
					descrizione: 'Le associazioni abruzzesi attivano servizi di supporto online durante la pandemia, raggiungendo persone trans isolate nelle aree interne della regione.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione in Abruzzo?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per il reparto di endocrinologia dell\'Ospedale San Salvatore (L\'Aquila) o dell\'Ospedale Spirito Santo (Pescara). Arcigay Chieti-Pescara può fornire orientamento.'
			},
			{
				domanda: 'Ci sono centri gender specializzati in Abruzzo?',
				risposta: 'L\'Abruzzo non ha centri gender dedicati come quelli di Milano o Roma. I servizi di endocrinologia ospedalieri possono seguire la terapia ormonale. Per percorsi completi, il SAIFIP di Roma è il centro più accessibile.'
			},
			{
				domanda: 'È possibile fare la chirurgia di affermazione di genere in Abruzzo?',
				risposta: 'No, è necessario rivolgersi fuori regione. Roma (SAIFIP) è la destinazione più accessibile dall\'Abruzzo grazie ai buoni collegamenti ferroviari e autostradali. Il SSN copre i costi con autorizzazione ASL.'
			},
			{
				domanda: 'La terapia ormonale è disponibile in Abruzzo?',
				risposta: 'Sì, i reparti di endocrinologia degli ospedali principali possono prescrivere e monitorare la terapia ormonale. È coperta dal SSN con esenzione specifica.'
			},
			{
				domanda: 'Dove trovare supporto psicologico per persone trans in Abruzzo?',
				risposta: 'Arcigay Chieti-Pescara offre uno sportello di ascolto. Per un percorso psicologico specializzato, può essere utile rivolgersi a professionisti con esperienza in disforia di genere, anche tramite telemedicina.'
			},
			{
				domanda: 'Ci sono gruppi di supporto per famiglie di persone trans in Abruzzo?',
				risposta: 'AGEDO Abruzzo organizza gruppi di sostegno per genitori e familiari a Pescara. Arcigay Chieti-Pescara offre anche supporto e orientamento alle famiglie.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans',
			'trans-e-sanita'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'marche',
		nome: 'Marche',
		capoluogo: 'Ancona',
		intro: 'Le Marche offrono alle persone transgender una rete di servizi che, sebbene meno strutturata rispetto alle grandi regioni, si sta progressivamente consolidando. Ancona è il principale polo sanitario della regione, con l\'Azienda Ospedaliero-Universitaria Ospedali Riuniti che rappresenta il centro di riferimento per i percorsi endocrinologici legati alla disforia di genere. L\'associazionismo marchigiano è presente con realtà come Arcigay Comunitas Ancona e il Gruppo Trans Marche che forniscono supporto e orientamento. La regione si caratterizza per una dimensione raccolta che, da un lato, limita il numero di servizi specializzati disponibili, ma dall\'altro favorisce un rapporto più diretto con le strutture sanitarie. Per i percorsi chirurgici è necessario rivolgersi fuori regione, tipicamente a Roma o Bologna. Il Marche Pride è un appuntamento che contribuisce alla visibilità della comunità trans nella regione.',
		metaDescription: 'Risorse trans nelle Marche: centri ad Ancona, associazioni LGBTQ+, iter sanitario ASUR e supporto disponibile.',
		centri_gender: [
			{
				nome: 'U.O.C. Endocrinologia — AOU Ospedali Riuniti di Ancona',
				citta: 'Ancona',
				indirizzo: 'Via Conca 71, 60126 Ancona',
				telefono: '071 596 3582',
				sito: 'https://www.ospedaliriuniti.marche.it',
				note: 'Centro di riferimento regionale per l\'endocrinologia. Disponibile per percorsi di terapia ormonale con impegnativa del medico di base.'
			},
			{
				nome: 'Ambulatorio di Endocrinologia — Ospedale di Pesaro',
				citta: 'Pesaro',
				indirizzo: 'Piazzale Cinelli 4, 61121 Pesaro',
				telefono: '0721 361 111',
				sito: 'https://www.ospedalemarchemord.it',
				note: 'Servizio endocrinologico per la provincia di Pesaro-Urbino. Supporto per monitoraggio della terapia ormonale.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Comunitas Ancona',
				tipo: 'lgbtq',
				citta: 'Ancona',
				sito: 'https://www.arcigayancona.it',
				descrizione: 'Sezione anconetana di Arcigay. Offre sportello di ascolto, consulenza legale e organizza il Marche Pride.'
			},
			{
				nome: 'Arcigay Agorà Pesaro-Urbino',
				tipo: 'lgbtq',
				citta: 'Pesaro',
				descrizione: 'Sezione pesarese di Arcigay. Attiva con sportelli, eventi culturali e supporto per persone LGBTQ+ nella provincia di Pesaro-Urbino.'
			},
			{
				nome: 'AGEDO Marche',
				tipo: 'genitori',
				citta: 'Ancona',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppi di sostegno per genitori e familiari di persone LGBTQ+ nelle Marche. Incontri periodici ad Ancona e supporto telefonico.'
			},
			{
				nome: 'Rete Lenford — referenti Marche',
				tipo: 'legale',
				citta: 'Ancona',
				sito: 'https://www.retelenford.it',
				descrizione: 'Avvocati della Rete Lenford nelle Marche. Consulenza gratuita su rettificazione anagrafica, discriminazione e diritti LGBTQ+.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Ancona',
				tipo: 'psicologico',
				ente: 'Arcigay Comunitas Ancona',
				citta: 'Ancona',
				orari: 'Giovedì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, supporto tra pari per persone trans e LGBTQ+.'
			},
			{
				nome: 'Sportello Legale LGBTQ+',
				tipo: 'legale',
				ente: 'Arcigay Comunitas Ancona',
				citta: 'Ancona',
				orari: 'Su appuntamento',
				note: 'Consulenza legale gratuita su rettificazione anagrafica e diritti delle persone trans.'
			}
		],
		iter_sanitario: {
			intro: 'Nelle Marche il percorso di affermazione di genere fa riferimento all\'ASUR (Azienda Sanitaria Unica Regionale) e agli ospedali principali. L\'AOU di Ancona è il centro di riferimento per l\'endocrinologia.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica presso l\'AOU Ospedali Riuniti di Ancona o l\'Ospedale di Pesaro. Il medico di base è il primo interlocutore per avviare il percorso.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-3 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'Colloqui con il servizio di psicologia della ASUR o con professionisti specializzati. Per la valutazione specifica in disforia di genere può essere utile rivolgersi a professionisti con esperienza nel campo.',
					ente: 'ASUR Marche / professionisti specializzati',
					tempiStimati: '2-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'L\'endocrinologo dell\'AOU di Ancona o dell\'Ospedale di Pesaro prescrive la terapia ormonale sostitutiva. I controlli sono periodici (ogni 3-6 mesi).',
					ente: 'AOU Ancona / Ospedale di Pesaro',
					tempiStimati: '2-4 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'Il cambio del nome e del genere si richiede al Tribunale Civile competente (Ancona, Pesaro, Macerata, Fermo, Ascoli Piceno). I tempi variano a seconda del tribunale.',
					ente: 'Tribunale Civile',
					tempiStimati: '8-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Per la chirurgia di affermazione di genere è necessario rivolgersi fuori regione. Bologna (Policlinico Sant\'Orsola) e Roma (SAIFIP) sono le destinazioni più accessibili dalle Marche. Il SSN copre i costi con autorizzazione ASUR.',
					ente: 'Centri di riferimento nazionale (fuori regione)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Le Marche hanno l\'ASUR come azienda sanitaria unica regionale, che coordina i servizi sul territorio.',
				'L\'AOU di Ancona è il centro di riferimento regionale per l\'endocrinologia.',
				'Bologna e Roma sono i centri più accessibili per la chirurgia di affermazione di genere.',
				'La terapia ormonale è coperta dal SSN anche nelle Marche tramite esenzione specifica.'
			]
		},
		storia_queer: {
			intro: 'Le Marche hanno sviluppato un movimento per i diritti LGBTQ+ con tempistiche e dinamiche proprie, caratterizzate dalla dimensione regionale raccolta e dalla vicinanza con l\'Emilia-Romagna.',
			eventi: [
				{
					anno: 1996,
					titolo: 'Prime associazioni LGBTQ+ nelle Marche',
					descrizione: 'Si formano i primi gruppi organizzati per i diritti LGBTQ+ ad Ancona e Pesaro, spesso collegati alle sedi universitarie e ai circoli culturali.'
				},
				{
					anno: 2008,
					titolo: 'Fondazione di Arcigay Ancona',
					descrizione: 'Arcigay Comunitas Ancona si struttura e diventa il punto di riferimento per la comunità LGBTQ+ marchigiana, offrendo sportelli e servizi.'
				},
				{
					anno: 2015,
					titolo: 'Primo Marche Pride',
					descrizione: 'Le Marche ospitano il loro primo Pride, itinerante tra le città della regione, con una crescente partecipazione e visibilità della comunità trans.'
				},
				{
					anno: 2021,
					titolo: 'Carriera alias nelle università marchigiane',
					descrizione: 'L\'Università Politecnica delle Marche e l\'Università di Urbino adottano la carriera alias per studenti trans, migliorando l\'inclusività degli atenei regionali.'
				}
			]
		},
		faq: [
			{
				domanda: 'Come si accede al percorso di transizione nelle Marche?',
				risposta: 'Il primo passo è ottenere un\'impegnativa dal medico di base per l\'endocrinologia dell\'AOU Ospedali Riuniti di Ancona. Arcigay Comunitas Ancona può fornire orientamento e supporto.'
			},
			{
				domanda: 'Ci sono centri gender specializzati nelle Marche?',
				risposta: 'Le Marche non hanno centri gender dedicati. L\'endocrinologia dell\'AOU di Ancona è il servizio di riferimento per la terapia ormonale. Per percorsi completi, Bologna e Roma offrono centri specializzati facilmente raggiungibili.'
			},
			{
				domanda: 'È possibile fare la chirurgia di affermazione di genere nelle Marche?',
				risposta: 'No, è necessario rivolgersi fuori regione. Bologna (Sant\'Orsola) e Roma (SAIFIP) sono le opzioni più accessibili. Il SSN copre i costi con autorizzazione ASUR.'
			},
			{
				domanda: 'La terapia ormonale è disponibile nelle Marche?',
				risposta: 'Sì, i reparti di endocrinologia dell\'AOU di Ancona e dell\'Ospedale di Pesaro possono prescrivere e monitorare la terapia ormonale. È coperta dal SSN con esenzione specifica.'
			},
			{
				domanda: 'Dove trovare supporto psicologico per persone trans nelle Marche?',
				risposta: 'Arcigay Comunitas Ancona offre uno sportello di ascolto. Per un percorso psicologico specializzato, può essere utile rivolgersi a professionisti con esperienza in disforia di genere, anche tramite telemedicina.'
			},
			{
				domanda: 'Ci sono gruppi di supporto per famiglie di persone trans nelle Marche?',
				risposta: 'AGEDO Marche organizza gruppi di sostegno per genitori e familiari ad Ancona. Arcigay Comunitas Ancona offre anche supporto e orientamento alle famiglie.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'salute-mentale-persone-trans',
			'discriminazione-lavoro-trans-italia'
		],
		ultimoAggiornamento: '2026-02-24'
	}
];
