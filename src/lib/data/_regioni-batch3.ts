import type { RegioneDettaglio } from './regioni-dettaglio';

export const batch3: RegioneDettaglio[] = [
	{
		slug: 'basilicata',
		nome: 'Basilicata',
		capoluogo: 'Potenza',
		intro: `La Basilicata è una delle regioni più piccole d\'Italia e presenta una realtà particolarmente difficile per le persone transgender e non binarie. I servizi sanitari specializzati nell\'affermazione di genere sono molto limitati sul territorio lucano, e la maggior parte delle persone trans deve spostarsi verso centri più grandi come Napoli, Bari o Roma per accedere a percorsi strutturati. L\'ASP di Potenza e l\'ASP di Matera offrono servizi di base, ma non dispongono di centri gender dedicati. L\'associazionismo LGBTQ+ locale, pur essendo meno numeroso rispetto a regioni più popolose, svolge un ruolo fondamentale di orientamento e supporto. Arcigay Basilicata rappresenta il principale punto di riferimento per la comunità, offrendo sportelli di ascolto e accompagnamento. La regione risente anche dell\'isolamento geografico di molte aree interne, che rende ancora più complesso l\'accesso ai servizi per chi vive lontano dai capoluoghi. Nonostante queste difficoltà, negli ultimi anni si registra una maggiore consapevolezza e una crescente rete di solidarietà.`,
		metaDescription: 'Risorse trans in Basilicata: servizi sanitari a Potenza e Matera, associazioni, iter ASL e indicazioni per centri gender nelle regioni vicine.',
		centri_gender: [
			{
				nome: 'Ambulatorio di Endocrinologia — ASP Potenza',
				citta: 'Potenza',
				indirizzo: 'Via Potito Petrone, 85100 Potenza',
				telefono: '0971 613 111',
				sito: 'https://www.aspbasilicata.it',
				note: 'Servizio endocrinologico di base. Per percorsi strutturati di affermazione di genere è necessario rivolgersi ai centri di Napoli (AOU Federico II) o Bari (Policlinico).'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Basilicata — Noi Siamo',
				tipo: 'lgbtq',
				citta: 'Potenza',
				sito: 'https://www.arcigay.it/basilicata',
				descrizione: 'Sezione lucana di Arcigay. Punto di riferimento per la comunità LGBTQ+ regionale, offre sportello di ascolto, orientamento ai servizi e organizza eventi di sensibilizzazione.'
			},
			{
				nome: 'Lucania Pride',
				tipo: 'lgbtq',
				citta: 'Potenza',
				descrizione: 'Collettivo che organizza il Pride lucano e promuove iniziative di visibilità e sensibilizzazione sui diritti delle persone LGBTQ+ in Basilicata.'
			},
			{
				nome: 'AGEDO Basilicata',
				tipo: 'genitori',
				citta: 'Potenza',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppo di sostegno per genitori e familiari di persone LGBTQ+ in Basilicata. Incontri periodici e supporto telefonico.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Basilicata',
				tipo: 'psicologico',
				ente: 'Arcigay Basilicata',
				citta: 'Potenza',
				orari: 'Su appuntamento',
				note: 'Ascolto, orientamento ai servizi sanitari e legali. Possibilità di colloqui anche da remoto per chi vive in aree interne.'
			}
		],
		iter_sanitario: {
			intro: 'In Basilicata non esistono centri gender strutturati. Il percorso di affermazione di genere inizia presso le ASP locali (Potenza e Matera) ma per le fasi specialistiche è necessario rivolgersi a centri fuori regione, in particolare a Napoli o Bari.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica. Il medico di base può indirizzarti verso i servizi dell\'ASP di Potenza o di Matera, oppure direttamente verso centri fuori regione.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'La valutazione può iniziare presso i servizi di salute mentale dell\'ASP, ma per un percorso strutturato è consigliabile rivolgersi ai centri gender di Napoli (AOU Federico II) o Bari (Policlinico).',
					ente: 'ASP Potenza / ASP Matera / centri fuori regione',
					tempiStimati: '3-8 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'La prescrizione della terapia ormonale avviene presso un centro gender specializzato (fuori regione). Il monitoraggio può proseguire con l\'endocrinologo dell\'ASP locale.',
					ente: 'Centro gender di riferimento / ASP locale per follow-up',
					tempiStimati: '2-4 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta di cambio nome e genere si presenta al Tribunale Civile competente (Potenza o Matera). I tempi della giustizia in Basilicata possono essere variabili.',
					ente: 'Tribunale Civile di Potenza / Matera',
					tempiStimati: '8-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Non sono disponibili interventi di chirurgia di affermazione di genere in Basilicata. È necessario rivolgersi a centri specializzati come il CIG del Niguarda (Milano), il SAIFIP (Roma) o l\'AOU Federico II (Napoli).',
					ente: 'Centri fuori regione (Niguarda, SAIFIP, Federico II)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'La Basilicata non dispone di centri gender dedicati: la maggior parte del percorso richiede spostamenti verso Napoli, Bari o Roma.',
				'La terapia ormonale è coperta dal SSN anche per chi deve spostarsi fuori regione, tramite autorizzazione della ASP.',
				'Le associazioni locali possono aiutare a navigare il sistema e a individuare i percorsi più accessibili.',
				'Per chi vive in aree interne, molte associazioni offrono supporto anche da remoto.'
			]
		},
		storia_queer: {
			intro: 'La Basilicata, pur essendo una regione di dimensioni ridotte, ha partecipato ai cambiamenti sociali e culturali che hanno riguardato le persone LGBTQ+ in Italia, con una crescente visibilità negli ultimi decenni.',
			eventi: [
				{
					anno: 1982,
					titolo: 'Impatto della Legge 164 in Basilicata',
					descrizione: 'L\'approvazione della legge 164/1982 offre per la prima volta un quadro giuridico alle persone trans lucane, anche se l\'accesso ai servizi resta difficile per l\'assenza di centri specializzati nella regione.'
				},
				{
					anno: 2010,
					titolo: 'Nascita di Arcigay Basilicata',
					descrizione: 'Si costituisce formalmente la sezione lucana di Arcigay, offrendo per la prima volta un punto di riferimento strutturato per la comunità LGBTQ+ regionale.'
				},
				{
					anno: 2017,
					titolo: 'Primo Lucania Pride',
					descrizione: 'Si svolge il primo Pride in Basilicata, con la partecipazione della comunità trans locale. L\'evento segna una svolta nella visibilità delle persone LGBTQ+ nella regione.'
				},
				{
					anno: 2023,
					titolo: 'Crescita della rete di supporto',
					descrizione: 'Le associazioni lucane consolidano le reti di supporto per le persone trans, con sportelli di ascolto da remoto e collaborazioni con i centri gender delle regioni limitrofe.'
				}
			]
		},
		faq: [
			{
				domanda: 'Esistono centri gender in Basilicata?',
				risposta: 'Non esistono centri gender strutturati in Basilicata. Per percorsi di affermazione di genere è necessario rivolgersi ai centri delle regioni vicine: l\'AOU Federico II di Napoli, il Policlinico di Bari o il SAIFIP di Roma.'
			},
			{
				domanda: 'Come si inizia un percorso di transizione in Basilicata?',
				risposta: 'Il primo passo è parlare con il medico di base per ottenere un\'impegnativa verso un centro specializzato fuori regione. Arcigay Basilicata può aiutare nell\'orientamento ai servizi.'
			},
			{
				domanda: 'La terapia ormonale è disponibile in Basilicata?',
				risposta: 'La prescrizione iniziale deve avvenire presso un centro gender specializzato (fuori regione), ma il monitoraggio può proseguire con un endocrinologo dell\'ASP locale. I farmaci sono coperti dal SSN.'
			},
			{
				domanda: 'Come si ottiene la rettificazione anagrafica in Basilicata?',
				risposta: 'La richiesta va presentata al Tribunale Civile di Potenza o Matera. Non è obbligatorio l\'intervento chirurgico. Un avvocato specializzato può facilitare il percorso; la Rete Lenford offre consulenze gratuite.'
			},
			{
				domanda: 'Ci sono gruppi di supporto per persone trans in Basilicata?',
				risposta: 'Arcigay Basilicata offre uno sportello di ascolto e orientamento, anche da remoto. AGEDO Basilicata fornisce supporto per le famiglie. Per gruppi specificamente trans, spesso ci si collega alle realtà delle regioni vicine.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'trans-e-sanita',
			'salute-mentale-persone-trans',
			'situazione-trans-italia'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'molise',
		nome: 'Molise',
		capoluogo: 'Campobasso',
		intro: `Il Molise è la regione più piccola d\'Italia per popolazione e presenta sfide significative per le persone transgender e non binarie. L\'offerta di servizi sanitari specializzati nell\'affermazione di genere è estremamente limitata, e nella pratica le persone trans molisane devono affidarsi quasi interamente ai centri delle regioni confinanti: Napoli, Roma e in misura minore Bari. L\'ASREM (Azienda Sanitaria Regionale del Molise), che gestisce l\'intera sanità regionale, non dispone di un centro gender dedicato, sebbene offra servizi di endocrinologia e psicologia di base. L\'associazionismo LGBTQ+ in Molise è giovane ma in crescita, con Arcigay Molise che rappresenta il principale riferimento per la comunità. La piccola dimensione della regione e la dispersione della popolazione nelle aree interne rendono particolarmente importante il ruolo delle reti online e del supporto a distanza. Nonostante le difficoltà strutturali, la comunità trans molisana ha trovato modi per organizzarsi e ottenere visibilità, contribuendo a sensibilizzare un territorio tradizionalmente conservatore.`,
		metaDescription: 'Risorse trans in Molise: servizi ASREM, associazioni a Campobasso, iter sanitario e indicazioni per centri gender fuori regione.',
		centri_gender: [
			{
				nome: 'Servizio di Endocrinologia — ASREM Campobasso',
				citta: 'Campobasso',
				indirizzo: 'Ospedale Cardarelli, Contrada Tappino, 86100 Campobasso',
				telefono: '0874 409 111',
				sito: 'https://www.asrem.gov.it',
				note: 'Servizio endocrinologico di base. Non è un centro gender strutturato. Per percorsi completi è necessario rivolgersi ai centri di Roma (SAIFIP) o Napoli (AOU Federico II).'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Molise',
				tipo: 'lgbtq',
				citta: 'Campobasso',
				sito: 'https://www.arcigay.it/molise',
				descrizione: 'Sezione molisana di Arcigay. Offre sportello di ascolto, orientamento ai servizi e rappresenta il principale punto di riferimento LGBTQ+ della regione.'
			},
			{
				nome: 'Molise Pride',
				tipo: 'lgbtq',
				citta: 'Campobasso',
				descrizione: 'Collettivo che organizza il Pride molisano e promuove iniziative culturali e di sensibilizzazione sui diritti delle persone LGBTQ+ nella regione.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Molise',
				tipo: 'psicologico',
				ente: 'Arcigay Molise',
				citta: 'Campobasso',
				orari: 'Su appuntamento',
				note: 'Ascolto, orientamento e accompagnamento ai servizi. Disponibile anche in modalità telefonica e online per chi vive lontano da Campobasso.'
			}
		],
		iter_sanitario: {
			intro: 'In Molise non esistono centri gender dedicati. L\'ASREM offre servizi sanitari di base, ma il percorso di affermazione di genere richiede nella maggior parte dei casi lo spostamento verso centri specializzati nelle regioni limitrofe, in particolare Roma e Napoli.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica. Il medico può indirizzarti verso i servizi dell\'ASREM o direttamente verso centri specializzati fuori regione.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'La valutazione iniziale può svolgersi presso il servizio di salute mentale dell\'ASREM. Per un inquadramento completo è consigliabile rivolgersi al SAIFIP di Roma o all\'AOU Federico II di Napoli.',
					ente: 'ASREM / SAIFIP Roma / AOU Federico II Napoli',
					tempiStimati: '3-8 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'La prescrizione avviene presso il centro gender di riferimento fuori regione. Il monitoraggio può continuare con l\'endocrinologo dell\'ASREM a Campobasso o Isernia.',
					ente: 'Centro gender di riferimento / ASREM per follow-up',
					tempiStimati: '2-4 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta di cambio nome e genere si presenta al Tribunale Civile di Campobasso. I tempi possono variare a seconda del carico del tribunale.',
					ente: 'Tribunale Civile di Campobasso',
					tempiStimati: '8-18 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Non sono disponibili interventi di chirurgia di affermazione di genere in Molise. È necessario rivolgersi a centri come il SAIFIP di Roma, il CIG del Niguarda di Milano o l\'AOU Federico II di Napoli.',
					ente: 'Centri fuori regione (SAIFIP, Niguarda, Federico II)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Il Molise non dispone di centri gender: l\'intero percorso specialistico richiede spostamenti fuori regione.',
				'L\'ASREM è l\'unica azienda sanitaria della regione e gestisce tutti i servizi sanitari territoriali.',
				'La terapia ormonale è coperta dal SSN; il follow-up può essere gestito localmente dopo la prescrizione iniziale.',
				'Arcigay Molise può fornire orientamento e accompagnamento virtuale per chi ha difficoltà a spostarsi.'
			]
		},
		storia_queer: {
			intro: 'Il Molise, pur essendo una regione di piccole dimensioni, ha visto negli ultimi anni una crescita significativa della visibilità LGBTQ+, con la comunità trans che ha contribuito attivamente al cambiamento culturale.',
			eventi: [
				{
					anno: 1982,
					titolo: 'La Legge 164 e il Molise',
					descrizione: 'L\'approvazione della legge 164/1982 riguarda anche le persone trans molisane, ma l\'assenza di servizi locali rende l\'accesso alla rettificazione particolarmente complesso nella regione.'
				},
				{
					anno: 2014,
					titolo: 'Nascita di Arcigay Molise',
					descrizione: 'Si costituisce la sezione molisana di Arcigay, primo punto di riferimento strutturato per la comunità LGBTQ+ della regione. L\'associazione offre da subito sportello di ascolto e orientamento.'
				},
				{
					anno: 2018,
					titolo: 'Primo Molise Pride',
					descrizione: 'Campobasso ospita il primo Pride della storia del Molise, con una significativa partecipazione della comunità trans. L\'evento ha un forte impatto mediatico regionale.'
				},
				{
					anno: 2022,
					titolo: 'Sportelli online e reti di supporto',
					descrizione: 'Le associazioni molisane attivano sportelli di ascolto online e telefonici, rendendo il supporto accessibile anche alle persone trans che vivono nelle aree interne della regione.'
				}
			]
		},
		faq: [
			{
				domanda: 'Esistono centri gender in Molise?',
				risposta: 'No, il Molise non dispone di centri gender strutturati. Per percorsi di affermazione di genere è necessario rivolgersi a centri fuori regione: il SAIFIP di Roma o l\'AOU Federico II di Napoli sono i più vicini.'
			},
			{
				domanda: 'Come si accede ai servizi trans vivendo in Molise?',
				risposta: 'Il primo passo è parlare con il medico di base per ottenere un\'impegnativa. Arcigay Molise può aiutare nell\'orientamento. Il percorso specialistico si svolge presso centri gender fuori regione, ma il monitoraggio può proseguire localmente.'
			},
			{
				domanda: 'L\'ASREM copre i costi del percorso di transizione?',
				risposta: 'Sì, i costi sono coperti dal Servizio Sanitario Nazionale anche per le prestazioni effettuate fuori regione, previa autorizzazione dell\'ASREM. La terapia ormonale è gratuita con esenzione specifica.'
			},
			{
				domanda: 'Ci sono gruppi di supporto per persone trans in Molise?',
				risposta: 'Arcigay Molise offre sportello di ascolto e orientamento, anche online. Per gruppi specificamente dedicati alle persone trans, spesso si partecipa a quelli organizzati nelle regioni vicine o in modalità virtuale.'
			},
			{
				domanda: 'Quanto incide la distanza dai centri specializzati?',
				risposta: 'La distanza è una delle principali difficoltà per le persone trans molisane. Roma dista circa 2-3 ore da Campobasso, Napoli circa 2 ore. Le associazioni possono aiutare a pianificare gli spostamenti e alcune visite di controllo si possono fare localmente.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'trans-e-sanita',
			'salute-mentale-persone-trans',
			'situazione-trans-italia',
			'diritti-trans-mancanti'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'umbria',
		nome: 'Umbria',
		capoluogo: 'Perugia',
		intro: `L\'Umbria è una regione di medie dimensioni nel centro Italia che offre alcuni servizi per le persone transgender, sebbene in forma meno strutturata rispetto alle grandi regioni limitrofe come Lazio e Toscana. Perugia, il capoluogo, ospita l\'Azienda Ospedaliera di Perugia e la USL Umbria 1, che offrono servizi endocrinologici e psicologici di base utilizzabili nel percorso di affermazione di genere. L\'Università degli Studi di Perugia ha contribuito alla ricerca e alla formazione in ambito di medicina di genere. Tuttavia, per percorsi pienamente strutturati e per la chirurgia, molte persone umbre si spostano verso Roma (SAIFIP) o Firenze (AOU Careggi). L\'associazionismo LGBTQ+ umbro è attivo, con Arcigay Perugia e Omphalos che rappresentano punti di riferimento storici per la comunità. Omphalos, in particolare, è una delle realtà LGBTQ+ più consolidate del Centro Italia e offre servizi dedicati alle persone trans, tra cui sportelli di ascolto e gruppi di sostegno. La regione si distingue per un tessuto sociale relativamente aperto e per la presenza dell\'Università, che favorisce un ambiente più inclusivo.`,
		metaDescription: 'Risorse trans in Umbria: servizi sanitari a Perugia, associazioni come Omphalos, iter USL e percorsi verso centri gender di Roma e Firenze.',
		centri_gender: [
			{
				nome: 'Ambulatorio di Endocrinologia — Azienda Ospedaliera di Perugia',
				citta: 'Perugia',
				indirizzo: 'Piazzale Menghini 1, 06129 Perugia',
				telefono: '075 578 1',
				sito: 'https://www.ospedale.perugia.it',
				note: 'Servizio endocrinologico che può supportare la terapia ormonale. Per percorsi completi è consigliabile rivolgersi ai centri gender di Roma (SAIFIP) o Firenze (Careggi).'
			},
			{
				nome: 'Servizio di Psicologia — USL Umbria 1',
				citta: 'Perugia',
				sito: 'https://www.uslumbria1.it',
				note: 'Servizio di salute mentale territoriale. Può offrire supporto psicologico iniziale nel percorso di affermazione di genere, in attesa dell\'accesso ai centri specializzati.'
			}
		],
		associazioni: [
			{
				nome: 'Omphalos LGBTI',
				tipo: 'lgbtq',
				citta: 'Perugia',
				indirizzo: 'Via della Viola 1, 06122 Perugia',
				telefono: '075 572 0603',
				sito: 'https://www.omphalos.it',
				descrizione: 'Una delle realtà LGBTQ+ più consolidate del Centro Italia. Offre sportello trans, consulenza legale, gruppi di auto-mutuo-aiuto e organizza il Perugia Pride.'
			},
			{
				nome: 'Arcigay Perugia',
				tipo: 'lgbtq',
				citta: 'Perugia',
				sito: 'https://www.arcigay.it/perugia',
				descrizione: 'Sezione perugina di Arcigay. Collabora con Omphalos per le attività sul territorio e offre supporto e orientamento alla comunità LGBTQ+.'
			},
			{
				nome: 'AGEDO Umbria',
				tipo: 'genitori',
				citta: 'Perugia',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppo di sostegno per genitori e familiari di persone LGBTQ+ in Umbria. Incontri periodici e supporto telefonico.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello Trans — Omphalos',
				tipo: 'psicologico',
				ente: 'Omphalos LGBTI',
				citta: 'Perugia',
				indirizzo: 'Via della Viola 1, 06122 Perugia',
				orari: 'Giovedì 17:00-19:00',
				note: 'Ascolto, orientamento ai servizi sanitari e legali, gruppi di sostegno. Aperto a persone trans e non binarie.'
			},
			{
				nome: 'Sportello Legale LGBTQ+',
				tipo: 'legale',
				ente: 'Omphalos LGBTI',
				citta: 'Perugia',
				orari: 'Su appuntamento',
				note: 'Consulenza legale gratuita su rettificazione anagrafica, discriminazione e diritti delle persone trans.'
			}
		],
		iter_sanitario: {
			intro: 'In Umbria il percorso di affermazione di genere si appoggia ai servizi delle USL locali e dell\'Azienda Ospedaliera di Perugia per la parte di base. Per le fasi specialistiche, è spesso necessario spostarsi verso i centri gender di Roma o Firenze.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica. Il medico può indirizzarti ai servizi della USL Umbria 1 (Perugia) o USL Umbria 2 (Terni), oppure verso centri fuori regione.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'La valutazione può iniziare presso i servizi di salute mentale della USL. Per un percorso strutturato è consigliabile rivolgersi al SAIFIP di Roma o all\'AOU Careggi di Firenze.',
					ente: 'USL Umbria 1 o 2 / centri fuori regione',
					tempiStimati: '3-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'La prescrizione iniziale avviene presso il centro gender di riferimento. Il monitoraggio può proseguire con l\'endocrinologo dell\'Azienda Ospedaliera di Perugia o dell\'Ospedale di Terni.',
					ente: 'Centro gender di riferimento / AO Perugia per follow-up',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta si presenta al Tribunale Civile di Perugia o Terni. Non è obbligatorio l\'intervento chirurgico. Omphalos offre orientamento legale per questa fase.',
					ente: 'Tribunale Civile di Perugia / Terni',
					tempiStimati: '6-15 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Non sono disponibili interventi di chirurgia di affermazione di genere in Umbria. I centri di riferimento sono il SAIFIP di Roma, il CIG del Niguarda di Milano e l\'AOU Careggi di Firenze.',
					ente: 'Centri fuori regione (SAIFIP, Niguarda, Careggi)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'L\'Umbria non ha un centro gender dedicato, ma i servizi sanitari di base possono supportare parte del percorso.',
				'Roma e Firenze sono raggiungibili in circa 2 ore da Perugia, facilitando gli spostamenti per le visite specialistiche.',
				'Omphalos è il principale punto di riferimento per orientamento e accompagnamento delle persone trans in Umbria.',
				'La terapia ormonale è coperta dal SSN; il follow-up endocrinologico può essere gestito localmente.'
			]
		},
		storia_queer: {
			intro: 'L\'Umbria ha una tradizione associativa LGBTQ+ significativa per una regione delle sue dimensioni, con realtà che hanno contribuito al movimento dei diritti a livello nazionale.',
			eventi: [
				{
					anno: 1982,
					titolo: 'La Legge 164 e l\'Umbria',
					descrizione: 'L\'approvazione della legge 164/1982 apre nuove possibilità per le persone trans umbre, anche se l\'accesso ai servizi richiede fin dall\'inizio spostamenti verso Roma.'
				},
				{
					anno: 1994,
					titolo: 'Fondazione di Omphalos',
					descrizione: 'Nasce a Perugia Omphalos, che diventerà una delle associazioni LGBTQ+ più importanti del Centro Italia. Fin dall\'inizio offre servizi dedicati anche alle persone trans.'
				},
				{
					anno: 2003,
					titolo: 'Primo Perugia Pride',
					descrizione: 'Perugia ospita il suo primo Pride, con una partecipazione significativa della comunità trans regionale. L\'evento diventa un appuntamento annuale.'
				},
				{
					anno: 2019,
					titolo: 'Carriera alias nelle università umbre',
					descrizione: 'L\'Università degli Studi di Perugia adotta il sistema della carriera alias per gli studenti trans, permettendo l\'uso del nome scelto nei documenti universitari.'
				}
			]
		},
		faq: [
			{
				domanda: 'Esistono centri gender in Umbria?',
				risposta: 'Non esiste un centro gender strutturato in Umbria, ma l\'Azienda Ospedaliera di Perugia offre servizi endocrinologici e psicologici di base. Per percorsi completi ci si rivolge ai centri di Roma (SAIFIP) o Firenze (Careggi).'
			},
			{
				domanda: 'Qual è il ruolo di Omphalos per le persone trans?',
				risposta: 'Omphalos è il principale punto di riferimento per le persone trans in Umbria. Offre sportello di ascolto, gruppi di sostegno, consulenza legale e orientamento ai servizi sanitari regionali e fuori regione.'
			},
			{
				domanda: 'Quanto dista l\'Umbria dai centri gender più vicini?',
				risposta: 'Roma (SAIFIP) è raggiungibile in circa 2 ore da Perugia. Firenze (Careggi) dista circa 2 ore. Questa vicinanza facilita l\'accesso ai percorsi specializzati per le persone trans umbre.'
			},
			{
				domanda: 'La terapia ormonale si può gestire localmente in Umbria?',
				risposta: 'La prescrizione iniziale deve avvenire presso un centro gender specializzato, ma il monitoraggio periodico può proseguire con un endocrinologo dell\'Azienda Ospedaliera di Perugia. I farmaci sono coperti dal SSN.'
			},
			{
				domanda: 'L\'Università di Perugia prevede la carriera alias?',
				risposta: 'Sì, l\'Università degli Studi di Perugia ha adottato il sistema della carriera alias, che permette agli studenti trans di utilizzare il nome scelto nei documenti universitari, nel badge e nel registro.'
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
		slug: 'trentino-alto-adige',
		nome: 'Trentino Alto Adige',
		capoluogo: 'Trento',
		intro: `Il Trentino Alto Adige è una regione autonoma a statuto speciale con caratteristiche uniche nel panorama italiano, grazie alla compresenza delle culture italiana e tedesca e all\'ampia autonomia delle Province di Trento e Bolzano. Per le persone transgender, questa dualità si riflette anche nei servizi: entrambe le province dispongono di servizi sanitari propri, gestiti rispettivamente dall\'APSS (Azienda Provinciale per i Servizi Sanitari) di Trento e dall\'Azienda Sanitaria dell\'Alto Adige (ASDAA) di Bolzano. Sebbene non esistano centri gender strutturati nella regione, i servizi endocrinologici e psicologici locali possono supportare parte del percorso. Per le fasi più specializzate, molte persone si rivolgono ai centri di Verona (Azienda Ospedaliera Universitaria Integrata), Padova o Bologna. L\'associazionismo LGBTQ+ è presente in entrambe le province, con Centaurus a Bolzano e Arcigay Trentino a Trento come principali punti di riferimento. La regione si distingue per una sensibilità particolare verso i diritti civili, influenzata anche dalla vicinanza culturale con l\'Austria e il mondo germanofono, dove i diritti delle persone trans sono generalmente più avanzati.`,
		metaDescription: 'Risorse trans in Trentino Alto Adige: servizi a Trento e Bolzano, associazioni, iter APSS/ASDAA e percorsi verso centri gender del Veneto.',
		centri_gender: [
			{
				nome: 'Servizio di Endocrinologia — Ospedale Santa Chiara (APSS)',
				citta: 'Trento',
				indirizzo: 'Largo Medaglie d\'Oro 9, 38122 Trento',
				telefono: '0461 903 111',
				sito: 'https://www.apss.tn.it',
				note: 'Servizio endocrinologico provinciale. Può supportare la terapia ormonale e il monitoraggio. Per percorsi completi ci si rivolge ai centri di Verona o Padova.'
			},
			{
				nome: 'Servizio di Endocrinologia — Ospedale di Bolzano (ASDAA)',
				citta: 'Bolzano',
				indirizzo: 'Via Lorenz Bohler 5, 39100 Bolzano',
				telefono: '0471 908 111',
				sito: 'https://www.sabes.it',
				note: 'Servizio endocrinologico dell\'Alto Adige. Per percorsi strutturati di affermazione di genere è consigliabile rivolgersi ai centri di Verona (AOUI) o Innsbruck (Austria).'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Trentino — Alto Adige del Trentino',
				tipo: 'lgbtq',
				citta: 'Trento',
				sito: 'https://www.arcigaytrentino.it',
				descrizione: 'Sezione trentina di Arcigay. Offre sportello di ascolto, orientamento ai servizi e organizza eventi culturali e di advocacy per la comunità LGBTQ+.'
			},
			{
				nome: 'Centaurus — Arcigay Alto Adige Sudtirol',
				tipo: 'lgbtq',
				citta: 'Bolzano',
				indirizzo: 'Via dei Vanga 32, 39100 Bolzano',
				telefono: '0471 976 342',
				sito: 'https://www.centaurus.org',
				descrizione: 'Associazione LGBTQ+ bilingue (italiano/tedesco) dell\'Alto Adige. Offre sportello di ascolto, consulenza e gruppi di socializzazione. Punto di riferimento per la comunità trans altoatesina.'
			},
			{
				nome: 'AGEDO Trentino',
				tipo: 'genitori',
				citta: 'Trento',
				sito: 'https://www.agedo.org',
				descrizione: 'Gruppo di sostegno per genitori e familiari di persone LGBTQ+ in Trentino. Incontri periodici e supporto telefonico.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto — Centaurus',
				tipo: 'psicologico',
				ente: 'Centaurus',
				citta: 'Bolzano',
				indirizzo: 'Via dei Vanga 32, 39100 Bolzano',
				orari: 'Lunedì e mercoledì 17:00-19:00',
				note: 'Ascolto e orientamento in italiano e tedesco. Aperto a persone trans, non binarie e ai loro familiari.'
			},
			{
				nome: 'Sportello LGBTQ+ — Arcigay Trentino',
				tipo: 'psicologico',
				ente: 'Arcigay Trentino',
				citta: 'Trento',
				orari: 'Su appuntamento',
				note: 'Ascolto, orientamento ai servizi e supporto per persone LGBTQ+ nella provincia di Trento.'
			}
		],
		iter_sanitario: {
			intro: 'In Trentino Alto Adige il sistema sanitario è gestito separatamente dalle due province autonome: l\'APSS per Trento e l\'ASDAA per Bolzano. Non esistono centri gender dedicati, ma i servizi locali possono supportare parte del percorso. Per le fasi specialistiche ci si rivolge ai centri del Veneto o dell\'Emilia-Romagna.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica. Il medico può indirizzarti ai servizi dell\'APSS (Trento) o dell\'ASDAA (Bolzano), oppure verso centri specializzati fuori regione.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'La valutazione può iniziare presso i servizi di salute mentale provinciali. Per un percorso strutturato è consigliabile rivolgersi all\'AOUI di Verona o all\'AOU di Padova.',
					ente: 'APSS Trento / ASDAA Bolzano / centri fuori regione',
					tempiStimati: '3-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'La prescrizione iniziale avviene presso il centro gender di riferimento fuori regione. Il monitoraggio può proseguire con gli endocrinologi locali a Trento o Bolzano.',
					ente: 'Centro gender di riferimento / APSS o ASDAA per follow-up',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta si presenta al Tribunale Civile di Trento o Bolzano. La documentazione può essere presentata in italiano o tedesco. Non è obbligatorio l\'intervento chirurgico.',
					ente: 'Tribunale Civile di Trento / Bolzano',
					tempiStimati: '6-15 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Non sono disponibili interventi di chirurgia di affermazione di genere nella regione. I centri di riferimento sono l\'AOUI di Verona, il CIG del Niguarda di Milano e il SAIFIP di Roma. Per chi risiede in Alto Adige, anche la clinica universitaria di Innsbruck (Austria) può essere un\'opzione.',
					ente: 'Centri fuori regione (Verona, Niguarda, SAIFIP)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'Il Trentino Alto Adige ha due sistemi sanitari provinciali distinti (APSS e ASDAA) con procedure e tempistiche proprie.',
				'La vicinanza con l\'Austria può offrire opzioni aggiuntive per chi risiede in Alto Adige, anche se le normative sono diverse.',
				'La terapia ormonale è coperta dal SSN; il follow-up può essere gestito localmente dopo la prescrizione iniziale.',
				'Centaurus a Bolzano offre supporto bilingue (italiano/tedesco), particolarmente utile per la popolazione germanofona.'
			]
		},
		storia_queer: {
			intro: 'Il Trentino Alto Adige ha una storia particolare nel panorama dei diritti LGBTQ+ italiani, influenzata dalla sua posizione di confine e dalla duplice cultura italiana e tedesca.',
			eventi: [
				{
					anno: 1982,
					titolo: 'La Legge 164 nel contesto bilingue',
					descrizione: 'L\'approvazione della legge 164/1982 si inserisce in un contesto regionale dove la comunità germanofona guarda anche ai modelli di tutela dei Paesi di lingua tedesca, creando aspettative di avanzamento nei diritti.'
				},
				{
					anno: 1993,
					titolo: 'Fondazione di Centaurus',
					descrizione: 'Nasce a Bolzano Centaurus, associazione LGBTQ+ bilingue che diventa punto di riferimento per la comunità altoatesina, incluse le persone trans. L\'approccio bilingue la rende unica nel panorama italiano.'
				},
				{
					anno: 2012,
					titolo: 'Dolomiti Pride',
					descrizione: 'Si svolge il primo Dolomiti Pride, evento itinerante che si tiene alternativamente a Trento e Bolzano, con una forte partecipazione della comunità trans regionale.'
				},
				{
					anno: 2020,
					titolo: 'Carriera alias nell\'Università di Trento',
					descrizione: 'L\'Università degli Studi di Trento adotta il sistema della carriera alias per gli studenti trans, allineandosi alle migliori pratiche nazionali in materia di inclusione.'
				}
			]
		},
		faq: [
			{
				domanda: 'Esistono centri gender in Trentino Alto Adige?',
				risposta: 'Non esistono centri gender strutturati nella regione. I servizi endocrinologici di Trento e Bolzano possono supportare parte del percorso, ma per le fasi specialistiche ci si rivolge ai centri di Verona, Padova o Bologna.'
			},
			{
				domanda: 'Ci sono differenze tra i servizi a Trento e a Bolzano?',
				risposta: 'Le due province hanno sistemi sanitari autonomi (APSS a Trento, ASDAA a Bolzano) con procedure simili ma indipendenti. A Bolzano i servizi sono disponibili anche in lingua tedesca.'
			},
			{
				domanda: 'È possibile accedere a servizi in Austria dall\'Alto Adige?',
				risposta: 'Per chi risiede in Alto Adige, la clinica universitaria di Innsbruck può rappresentare un\'opzione, soprattutto per la vicinanza geografica e linguistica. Tuttavia, le normative e i costi sono diversi e l\'assistenza transfrontaliera richiede autorizzazioni specifiche.'
			},
			{
				domanda: 'Quali associazioni supportano le persone trans nella regione?',
				risposta: 'Centaurus a Bolzano e Arcigay Trentino a Trento sono i principali riferimenti. Centaurus offre supporto bilingue (italiano/tedesco), mentre Arcigay Trentino copre la provincia di Trento. AGEDO Trentino supporta le famiglie.'
			},
			{
				domanda: 'La rettificazione anagrafica si può fare in tedesco?',
				risposta: 'Sì, nella provincia di Bolzano la documentazione per la rettificazione anagrafica può essere presentata anche in lingua tedesca, in conformità con la tutela del bilinguismo garantita dallo Statuto speciale.'
			}
		],
		articoli_correlati: [
			'legge-164-italia',
			'iniziare-transizione',
			'terapia-ormonale-guida',
			'cambio-documenti-trans',
			'situazione-trans-italia',
			'diritti-trans-mancanti'
		],
		ultimoAggiornamento: '2026-02-24'
	},
	{
		slug: 'valle-d-aosta',
		nome: 'Valle d\'Aosta',
		capoluogo: 'Aosta',
		intro: `La Valle d\'Aosta è la regione più piccola d\'Italia per superficie e popolazione, con poco più di 120.000 abitanti. Questa dimensione ridotta si riflette inevitabilmente nei servizi disponibili per le persone transgender e non binarie: la regione non dispone di centri gender dedicati e l\'offerta sanitaria specializzata è molto limitata. L\'USL della Valle d\'Aosta, unica azienda sanitaria regionale, offre servizi endocrinologici e psicologici di base presso l\'Ospedale Parini di Aosta, ma per percorsi strutturati di affermazione di genere è necessario rivolgersi ai centri delle regioni limitrofe, in particolare Torino (AOU Città della Salute e della Scienza) che dista circa un\'ora e mezza di viaggio. La piccola dimensione della regione comporta anche una maggiore visibilità delle persone trans, che può rappresentare sia una sfida in termini di privacy sia un\'opportunità di sensibilizzazione della comunità locale. L\'associazionismo LGBTQ+ valdostano è presente ma di dimensioni ridotte, con Arcigay Valle d\'Aosta come riferimento principale. La vicinanza con la Francia e la Svizzera offre ulteriori possibilità di confronto culturale e, in alcuni casi, di accesso a servizi transfrontalieri.`,
		metaDescription: 'Risorse trans in Valle d\'Aosta: servizi USL ad Aosta, associazioni, iter sanitario e percorsi verso i centri gender di Torino.',
		centri_gender: [
			{
				nome: 'Servizio di Endocrinologia — Ospedale Parini',
				citta: 'Aosta',
				indirizzo: 'Viale Ginevra 3, 11100 Aosta',
				telefono: '0165 543 111',
				sito: 'https://www.ausl.vda.it',
				note: 'Servizio endocrinologico di base. Per percorsi strutturati di affermazione di genere è necessario rivolgersi al centro gender dell\'AOU Città della Salute e della Scienza di Torino.'
			}
		],
		associazioni: [
			{
				nome: 'Arcigay Valle d\'Aosta',
				tipo: 'lgbtq',
				citta: 'Aosta',
				sito: 'https://www.arcigay.it/valle-d-aosta',
				descrizione: 'Sezione valdostana di Arcigay. Principale punto di riferimento per la comunità LGBTQ+ regionale, offre sportello di ascolto, orientamento e organizza eventi di sensibilizzazione.'
			},
			{
				nome: 'Aosta Pride',
				tipo: 'lgbtq',
				citta: 'Aosta',
				descrizione: 'Collettivo che promuove la visibilità LGBTQ+ in Valle d\'Aosta attraverso eventi culturali e il Pride valdostano.'
			}
		],
		sportelli: [
			{
				nome: 'Sportello di Ascolto LGBTQ+ — Arcigay Valle d\'Aosta',
				tipo: 'psicologico',
				ente: 'Arcigay Valle d\'Aosta',
				citta: 'Aosta',
				orari: 'Su appuntamento',
				note: 'Ascolto, orientamento ai servizi sanitari e legali. Disponibile anche online e per telefono data la dispersione della popolazione sul territorio montano.'
			}
		],
		iter_sanitario: {
			intro: 'In Valle d\'Aosta non esistono centri gender dedicati. L\'USL regionale offre servizi sanitari di base presso l\'Ospedale Parini di Aosta, ma per il percorso di affermazione di genere è necessario affidarsi quasi interamente ai centri specializzati di Torino, raggiungibile in circa un\'ora e mezza.',
			passi: [
				{
					ordine: 1,
					titolo: 'Primo contatto con il medico di base',
					descrizione: 'Richiedi un\'impegnativa per una visita endocrinologica o psicologica. Il medico può indirizzarti ai servizi dell\'USL Valle d\'Aosta o direttamente verso l\'AOU Città della Salute e della Scienza di Torino.',
					ente: 'Medico di Medicina Generale',
					tempiStimati: '1-2 settimane'
				},
				{
					ordine: 2,
					titolo: 'Valutazione psicologica',
					descrizione: 'La valutazione iniziale può svolgersi presso il servizio di salute mentale dell\'USL Valle d\'Aosta. Per un percorso completo è consigliabile rivolgersi al centro di Torino.',
					ente: 'USL Valle d\'Aosta / AOU Torino',
					tempiStimati: '3-6 mesi'
				},
				{
					ordine: 3,
					titolo: 'Avvio terapia ormonale',
					descrizione: 'La prescrizione iniziale avviene presso il centro gender di Torino. Il monitoraggio periodico può proseguire con l\'endocrinologo dell\'Ospedale Parini di Aosta, evitando spostamenti frequenti.',
					ente: 'AOU Torino / Ospedale Parini per follow-up',
					tempiStimati: '1-3 mesi dalla valutazione'
				},
				{
					ordine: 4,
					titolo: 'Rettificazione anagrafica',
					descrizione: 'La richiesta di cambio nome e genere si presenta al Tribunale Civile di Aosta. Non è obbligatorio l\'intervento chirurgico. La documentazione può essere presentata anche in francese, in virtù del bilinguismo regionale.',
					ente: 'Tribunale Civile di Aosta',
					tempiStimati: '6-15 mesi'
				},
				{
					ordine: 5,
					titolo: 'Percorso chirurgico (facoltativo)',
					descrizione: 'Non sono disponibili interventi di chirurgia di affermazione di genere in Valle d\'Aosta. I centri di riferimento sono l\'AOU di Torino, il CIG del Niguarda di Milano e il SAIFIP di Roma.',
					ente: 'Centri fuori regione (Torino, Niguarda, SAIFIP)',
					tempiStimati: '1-3 anni di lista d\'attesa'
				}
			],
			note_importanti: [
				'La Valle d\'Aosta non dispone di centri gender: il percorso specialistico si svolge quasi interamente a Torino.',
				'Torino dista circa 1 ora e 30 minuti da Aosta in auto o pullman, rendendo gli spostamenti relativamente gestibili.',
				'La terapia ormonale è coperta dal SSN; il follow-up può essere effettuato localmente all\'Ospedale Parini.',
				'La regione a statuto speciale garantisce il bilinguismo italiano-francese, anche nella documentazione sanitaria e legale.'
			]
		},
		storia_queer: {
			intro: 'La Valle d\'Aosta, per le sue dimensioni ridotte, ha una storia LGBTQ+ meno documentata rispetto alle grandi regioni, ma negli ultimi anni la comunità ha guadagnato visibilità e organizzazione.',
			eventi: [
				{
					anno: 1982,
					titolo: 'La Legge 164 e la Valle d\'Aosta',
					descrizione: 'L\'approvazione della legge 164/1982 riguarda anche le persone trans valdostane, ma la mancanza di servizi locali rende il percorso particolarmente dipendente dai centri di Torino.'
				},
				{
					anno: 2010,
					titolo: 'Nascita di Arcigay Valle d\'Aosta',
					descrizione: 'Si costituisce la sezione valdostana di Arcigay, dando per la prima volta un riferimento strutturato alla comunità LGBTQ+ regionale in una delle regioni più piccole d\'Italia.'
				},
				{
					anno: 2017,
					titolo: 'Primo Aosta Pride',
					descrizione: 'Aosta ospita il suo primo Pride, un evento di grande impatto simbolico per una delle città più piccole d\'Italia a organizzare una manifestazione per i diritti LGBTQ+.'
				}
			]
		},
		faq: [
			{
				domanda: 'Esistono centri gender in Valle d\'Aosta?',
				risposta: 'No, la Valle d\'Aosta non dispone di centri gender. Per percorsi di affermazione di genere ci si rivolge all\'AOU Città della Salute e della Scienza di Torino, raggiungibile in circa un\'ora e mezza da Aosta.'
			},
			{
				domanda: 'Come si inizia un percorso di transizione dalla Valle d\'Aosta?',
				risposta: 'Il primo passo è parlare con il medico di base per ottenere un\'impegnativa verso il centro gender di Torino. Arcigay Valle d\'Aosta può offrire orientamento e accompagnamento nel percorso.'
			},
			{
				domanda: 'È possibile fare il follow-up della terapia ormonale ad Aosta?',
				risposta: 'Sì, dopo la prescrizione iniziale presso il centro di Torino, il monitoraggio periodico (esami del sangue, visite di controllo) può essere gestito dall\'endocrinologo dell\'Ospedale Parini di Aosta.'
			},
			{
				domanda: 'La documentazione sanitaria è disponibile anche in francese?',
				risposta: 'Sì, in Valle d\'Aosta vige il bilinguismo italiano-francese. La documentazione sanitaria e legale può essere redatta e presentata in entrambe le lingue.'
			},
			{
				domanda: 'Ci sono gruppi di supporto per persone trans in Valle d\'Aosta?',
				risposta: 'Arcigay Valle d\'Aosta offre sportello di ascolto e orientamento. Per gruppi specificamente dedicati alle persone trans, data la piccola dimensione della comunità, spesso si partecipa a quelli organizzati a Torino o in modalità online.'
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
