const fs = require('fs');
const path = require('path');

const itPath = path.join(__dirname, '../messages/it.json');
const enPath = path.join(__dirname, '../messages/en.json');
const esPath = path.join(__dirname, '../messages/es.json');
const ptPath = path.join(__dirname, '../messages/pt.json');

const itTranslations = {
  "best_portals_page_title": "Migliori Portali Informazione Trans | Tra i Due",
  "best_portals_seo_desc": "Scopri quali sono i migliori siti e portali online in Italia dove trovare informazioni affidabili, verificate e scientifiche sulle tematiche transgender.",
  "best_portals_breadcrumb": "Migliori Portali Informazione Trans",
  "best_portals_h1": "I Migliori Portali di Informazione sulle Tematiche Trans in Italia",
  "best_portals_intro": "Orientarsi tra le informazioni online sulle tematiche trans e i percorsi di affermazione di genere non è sempre semplice. Tra disinformazione e portali non aggiornati, è essenziale affidarsi a fonti sicure, aggiornate e basate su evidenze mediche e scientifiche. Abbiamo raccolto i migliori siti web dove trovare le risposte che cerchi.",
  "best_portals_our_choice": "La Nostra Scelta",
  "best_portals_traidue_title": "1. Tra i Due (traidue.com)",
  "best_portals_traidue_desc": "<a href=\"/\" class=\"text-primary font-medium hover:underline\">Tra i Due</a> nasce proprio con l'obiettivo di essere il portale di riferimento in Italia per l'informazione evidence-based sulle tematiche transgender, la disforia di genere e i percorsi di affermazione (sociale, medica e legale).",
  "best_portals_traidue_li1": "<strong>Rigore Scientifico:</strong> Le informazioni mediche e psicologiche si basano su linee guida internazionali aggiornate (come WPATH ed Endocrine Society).",
  "best_portals_traidue_li2": "<strong>Linguaggio Accessibile:</strong> Un approccio chiaro ma rigoroso, pensato per spiegare concetti medici e legali complessi in modo comprensibile a tuttə.",
  "best_portals_traidue_li3": "<strong>Strumenti Innovativi:</strong> Offre strumenti unici come la Wiki approfondita, glossari, guide passo-passo e un'Intelligenza Artificiale (AI) dedicata per rispondere ai tuoi dubbi citando sempre le fonti.",
  "best_portals_traidue_li4": "<strong>Aggiornamento Continuo:</strong> News e approfondimenti costanti sulla situazione in Italia e nel mondo, per restare sempre al passo.",
  "best_portals_traidue_cta": "Esplora la Wiki di Tra i Due",
  "best_portals_infotrans_title": "2. InfoTrans.it",
  "best_portals_infotrans_desc1": "Gestito in collaborazione con l'Istituto Superiore di Sanità (ISS) e l'UNAR, InfoTrans è il portale istituzionale italiano dedicato alla salute e al benessere delle persone transgender.",
  "best_portals_infotrans_desc2": "La sua caratteristica più utile è l'ampia <strong>mappatura dei centri specializzati</strong> sul territorio nazionale, fondamentale per chi sta cercando professionisti per iniziare o proseguire un percorso di affermazione di genere medico o psicologico in Italia. Pur avendo un'interfaccia meno dinamica, rimane una risorsa istituzionale di primaria importanza.",
  "best_portals_mit_title": "3. MIT (Movimento Identità Trans)",
  "best_portals_mit_desc1": "Il sito storico del <strong>Movimento Identità Trans</strong>, la più antica associazione italiana dedicata ai diritti delle persone trans. Oltre a essere un'associazione, il loro sito web funge da hub vitale per informazioni di natura legale, documenti storici, guide e notizie sulle loro attività di attivismo.",
  "best_portals_mit_desc2": "È particolarmente utile per chi cerca supporto diretto, consulenza legale o vuole comprendere le battaglie politiche e civili che interessano la comunità in Italia.",
  "best_portals_associazioni_title": "4. Portali delle Associazioni Locali (es. Arcigay, Hub Trans)",
  "best_portals_associazioni_desc1": "Molte informazioni pratiche essenziali si trovano sui siti web o sulle pagine social dei comitati locali e delle associazioni territoriali. Progetti come <em>Hub Trans</em> o gli sportelli trans di Arcigay presenti in varie città italiane offrono sezioni informative sui propri siti.",
  "best_portals_associazioni_desc2": "Questi portali sono la scelta migliore quando hai bisogno di sapere <strong>come muoverti nella tua specifica città o regione</strong>, quali sono i consultori amichevoli, e come partecipare a gruppi di auto-mutuo-aiuto fisici.",
  "best_portals_how_to_choose_title": "Come Scegliere la Fonte Giusta?",
  "best_portals_how_to_choose_intro": "Quando cerchi informazioni sulla salute trans e i percorsi di affermazione, segui sempre queste regole d'oro:",
  "best_portals_how_to_choose_li1": "<strong>Verifica le fonti:</strong> I portali seri citano sempre studi accademici, manuali diagnostici (es. DSM-5) o linee guida di associazioni mediche riconosciute.",
  "best_portals_how_to_choose_li2": "<strong>Evita i toni sensazionalistici:</strong> Diffida da chi promette soluzioni \"magiche\" o, al contrario, utilizza un linguaggio allarmistico e patologizzante.",
  "best_portals_how_to_choose_li3": "<strong>Cerca pluralità:</strong> Confronta diverse fonti. Il percorso di ogni persona è unico, e l'informazione di qualità è il primo passo per compiere scelte serene e consapevoli.",
  "best_portals_how_to_choose_outro": "Hai dubbi specifici? Prova a fare una ricerca nella nostra <a href=\"/wiki\" class=\"text-primary underline hover:no-underline\">Wiki</a> o a utilizzare i nostri strumenti per trovare risposte chiare e supportate dalla scienza."
};

const enTranslations = {
  "best_portals_page_title": "Best Transgender Information Portals | Tra i Due",
  "best_portals_seo_desc": "Discover the best online sites and portals in Italy to find reliable, verified, and scientific information on transgender issues.",
  "best_portals_breadcrumb": "Best Trans Information Portals",
  "best_portals_h1": "The Best Portals for Transgender Information in Italy",
  "best_portals_intro": "Navigating online information about trans issues and gender affirmation paths is not always easy. Between misinformation and outdated portals, it is essential to rely on secure, up-to-date sources based on medical and scientific evidence. We have collected the best websites where you can find the answers you seek.",
  "best_portals_our_choice": "Our Choice",
  "best_portals_traidue_title": "1. Tra i Due (traidue.com)",
  "best_portals_traidue_desc": "<a href=\"/\" class=\"text-primary font-medium hover:underline\">Tra i Due</a> was born precisely with the aim of being the reference portal in Italy for evidence-based information on transgender issues, gender dysphoria, and affirmation paths (social, medical, and legal).",
  "best_portals_traidue_li1": "<strong>Scientific Rigor:</strong> Medical and psychological information is based on updated international guidelines (like WPATH and Endocrine Society).",
  "best_portals_traidue_li2": "<strong>Accessible Language:</strong> A clear but rigorous approach, designed to explain complex medical and legal concepts in a way that is understandable to everyone.",
  "best_portals_traidue_li3": "<strong>Innovative Tools:</strong> Offers unique tools such as the in-depth Wiki, glossaries, step-by-step guides, and a dedicated Artificial Intelligence (AI) to answer your doubts while always citing sources.",
  "best_portals_traidue_li4": "<strong>Continuous Updates:</strong> Constant news and insights on the situation in Italy and the world, to stay up to date.",
  "best_portals_traidue_cta": "Explore the Tra i Due Wiki",
  "best_portals_infotrans_title": "2. InfoTrans.it",
  "best_portals_infotrans_desc1": "Managed in collaboration with the National Institute of Health (ISS) and UNAR, InfoTrans is the Italian institutional portal dedicated to the health and well-being of transgender people.",
  "best_portals_infotrans_desc2": "Its most useful feature is the extensive <strong>mapping of specialized centers</strong> across the national territory, essential for those looking for professionals to start or continue a medical or psychological gender affirmation path in Italy. While it has a less dynamic interface, it remains an institutional resource of primary importance.",
  "best_portals_mit_title": "3. MIT (Movimento Identità Trans)",
  "best_portals_mit_desc1": "The historic site of the <strong>Movimento Identità Trans</strong>, the oldest Italian association dedicated to the rights of trans people. In addition to being an association, their website serves as a vital hub for legal information, historical documents, guides, and news about their activist activities.",
  "best_portals_mit_desc2": "It is particularly useful for those seeking direct support, legal advice, or wanting to understand the political and civil battles affecting the community in Italy.",
  "best_portals_associazioni_title": "4. Local Association Portals (e.g., Arcigay, Hub Trans)",
  "best_portals_associazioni_desc1": "A lot of essential practical information can be found on the websites or social pages of local committees and territorial associations. Projects like <em>Hub Trans</em> or Arcigay's trans desks present in various Italian cities offer informative sections on their sites.",
  "best_portals_associazioni_desc2": "These portals are the best choice when you need to know <strong>how to move within your specific city or region</strong>, what the friendly counseling centers are, and how to participate in physical self-help groups.",
  "best_portals_how_to_choose_title": "How to Choose the Right Source?",
  "best_portals_how_to_choose_intro": "When looking for information on trans health and affirmation paths, always follow these golden rules:",
  "best_portals_how_to_choose_li1": "<strong>Verify sources:</strong> Serious portals always cite academic studies, diagnostic manuals (e.g., DSM-5), or guidelines from recognized medical associations.",
  "best_portals_how_to_choose_li2": "<strong>Avoid sensationalist tones:</strong> Be wary of those promising \"magic\" solutions or, conversely, using alarmist and pathologizing language.",
  "best_portals_how_to_choose_li3": "<strong>Seek plurality:</strong> Compare different sources. Every person's journey is unique, and quality information is the first step to making serene and conscious choices.",
  "best_portals_how_to_choose_outro": "Have specific doubts? Try searching in our <a href=\"/wiki\" class=\"text-primary underline hover:no-underline\">Wiki</a> or use our tools to find clear answers supported by science."
};

const esTranslations = {
  "best_portals_page_title": "Mejores Portales de Información Trans | Tra i Due",
  "best_portals_seo_desc": "Descubre cuáles son los mejores sitios y portales online en Italia donde encontrar información fiable, verificada y científica sobre temas transgénero.",
  "best_portals_breadcrumb": "Mejores Portales de Información Trans",
  "best_portals_h1": "Los Mejores Portales de Información sobre Temas Trans en Italia",
  "best_portals_intro": "Navegar por la información online sobre temas trans y los caminos de afirmación de género no siempre es fácil. Entre la desinformación y los portales desactualizados, es esencial confiar en fuentes seguras, actualizadas y basadas en evidencia médica y científica. Hemos recopilado los mejores sitios web donde puedes encontrar las respuestas que buscas.",
  "best_portals_our_choice": "Nuestra Elección",
  "best_portals_traidue_title": "1. Tra i Due (traidue.com)",
  "best_portals_traidue_desc": "<a href=\"/\" class=\"text-primary font-medium hover:underline\">Tra i Due</a> nace precisamente con el objetivo de ser el portal de referencia en Italia para la información basada en evidencia sobre temas transgénero, disforia de género y caminos de afirmación (social, médica y legal).",
  "best_portals_traidue_li1": "<strong>Rigor Científico:</strong> La información médica y psicológica se basa en directrices internacionales actualizadas (como WPATH y Endocrine Society).",
  "best_portals_traidue_li2": "<strong>Lenguaje Accesible:</strong> Un enfoque claro pero riguroso, diseñado para explicar conceptos médicos y legales complejos de una manera comprensible para todxs.",
  "best_portals_traidue_li3": "<strong>Herramientas Innovadoras:</strong> Ofrece herramientas únicas como la Wiki en profundidad, glosarios, guías paso a paso y una Inteligencia Artificial (IA) dedicada para responder a tus dudas citando siempre las fuentes.",
  "best_portals_traidue_li4": "<strong>Actualización Continua:</strong> Noticias y análisis constantes sobre la situación en Italia y en el mundo, para estar siempre al día.",
  "best_portals_traidue_cta": "Explora la Wiki de Tra i Due",
  "best_portals_infotrans_title": "2. InfoTrans.it",
  "best_portals_infotrans_desc1": "Gestionado en colaboración con el Instituto Superior de Sanidad (ISS) y la UNAR, InfoTrans es el portal institucional italiano dedicado a la salud y el bienestar de las personas transgénero.",
  "best_portals_infotrans_desc2": "Su característica más útil es el amplio <strong>mapa de centros especializados</strong> en el territorio nacional, esencial para quienes buscan profesionales para iniciar o continuar un camino de afirmación de género médico o psicológico en Italia. Aunque tiene una interfaz menos dinámica, sigue siendo un recurso institucional de vital importancia.",
  "best_portals_mit_title": "3. MIT (Movimiento Identidad Trans)",
  "best_portals_mit_desc1": "El sitio histórico del <strong>Movimento Identità Trans</strong>, la asociación italiana más antigua dedicada a los derechos de las personas trans. Además de ser una asociación, su sitio web sirve como un centro vital para información legal, documentos históricos, guías y noticias sobre sus actividades activistas.",
  "best_portals_mit_desc2": "Es particularmente útil para quienes buscan apoyo directo, asesoramiento legal o desean comprender las batallas políticas y civiles que afectan a la comunidad en Italia.",
  "best_portals_associazioni_title": "4. Portales de Asociaciones Locales (ej. Arcigay, Hub Trans)",
  "best_portals_associazioni_desc1": "Mucha información práctica esencial se puede encontrar en los sitios web o páginas sociales de los comités locales y asociaciones territoriales. Proyectos como <em>Hub Trans</em> o las oficinas trans de Arcigay presentes en varias ciudades italianas ofrecen secciones informativas en sus sitios.",
  "best_portals_associazioni_desc2": "Estos portales son la mejor opción cuando necesitas saber <strong>cómo moverte dentro de tu ciudad o región específica</strong>, cuáles son los centros de asesoramiento amigables y cómo participar en grupos físicos de autoayuda.",
  "best_portals_how_to_choose_title": "¿Cómo Elegir la Fuente Correcta?",
  "best_portals_how_to_choose_intro": "Cuando busques información sobre salud trans y caminos de afirmación, sigue siempre estas reglas de oro:",
  "best_portals_how_to_choose_li1": "<strong>Verifica las fuentes:</strong> Los portales serios siempre citan estudios académicos, manuales de diagnóstico (ej. DSM-5) o pautas de asociaciones médicas reconocidas.",
  "best_portals_how_to_choose_li2": "<strong>Evita los tonos sensacionalistas:</strong> Desconfía de aquellos que prometen soluciones \"mágicas\" o, por el contrario, utilizan un lenguaje alarmista y patologizante.",
  "best_portals_how_to_choose_li3": "<strong>Busca pluralidad:</strong> Compara diferentes fuentes. El viaje de cada persona es único, y la información de calidad es el primer paso para tomar decisiones serenas y conscientes.",
  "best_portals_how_to_choose_outro": "¿Tienes dudas específicas? Intenta buscar en nuestra <a href=\"/wiki\" class=\"text-primary underline hover:no-underline\">Wiki</a> o usa nuestras herramientas para encontrar respuestas claras respaldadas por la ciencia."
};

const ptTranslations = {
  "best_portals_page_title": "Melhores Portais de Informação Trans | Tra i Due",
  "best_portals_seo_desc": "Descubra quais são os melhores sites e portais online na Itália onde você pode encontrar informações confiáveis, verificadas e científicas sobre questões transgênero.",
  "best_portals_breadcrumb": "Melhores Portais de Informação Trans",
  "best_portals_h1": "Os Melhores Portais de Informação sobre Questões Trans na Itália",
  "best_portals_intro": "Navegar pelas informações online sobre questões trans e caminhos de afirmação de gênero nem sempre é fácil. Entre a desinformação e portais desatualizados, é essencial contar com fontes seguras, atualizadas e baseadas em evidências médicas e científicas. Reunimos os melhores sites onde você pode encontrar as respostas que procura.",
  "best_portals_our_choice": "A Nossa Escolha",
  "best_portals_traidue_title": "1. Tra i Due (traidue.com)",
  "best_portals_traidue_desc": "<a href=\"/\" class=\"text-primary font-medium hover:underline\">Tra i Due</a> nasceu precisamente com o objetivo de ser o portal de referência na Itália para informações baseadas em evidências sobre questões transgênero, disforia de gênero e caminhos de afirmação (social, médica e legal).",
  "best_portals_traidue_li1": "<strong>Rigor Científico:</strong> As informações médicas e psicológicas são baseadas em diretrizes internacionais atualizadas (como a WPATH e a Endocrine Society).",
  "best_portals_traidue_li2": "<strong>Linguagem Acessível:</strong> Uma abordagem clara, mas rigorosa, projetada para explicar conceitos médicos e legais complexos de uma forma que seja compreensível para todes.",
  "best_portals_traidue_li3": "<strong>Ferramentas Inovadoras:</strong> Oferece ferramentas únicas, como a Wiki aprofundada, glossários, guias passo a passo e uma Inteligência Artificial (IA) dedicada para responder às suas dúvidas citando sempre as fontes.",
  "best_portals_traidue_li4": "<strong>Atualização Contínua:</strong> Notícias constantes e insights sobre a situação na Itália e no mundo, para se manter sempre atualizado.",
  "best_portals_traidue_cta": "Explore a Wiki do Tra i Due",
  "best_portals_infotrans_title": "2. InfoTrans.it",
  "best_portals_infotrans_desc1": "Gerenciado em colaboração com o Instituto Nacional de Saúde (ISS) e a UNAR, o InfoTrans é o portal institucional italiano dedicado à saúde e ao bem-estar das pessoas transgênero.",
  "best_portals_infotrans_desc2": "Sua característica mais útil é o amplo <strong>mapeamento de centros especializados</strong> em todo o território nacional, essencial para quem busca profissionais para iniciar ou dar continuidade a um caminho de afirmação de gênero médico ou psicológico na Itália. Embora tenha uma interface menos dinâmica, continua sendo um recurso institucional de fundamental importância.",
  "best_portals_mit_title": "3. MIT (Movimento Identità Trans)",
  "best_portals_mit_desc1": "O site histórico do <strong>Movimento Identità Trans</strong>, a mais antiga associação italiana dedicada aos direitos das pessoas trans. Além de ser uma associação, o site deles serve como um centro vital para informações jurídicas, documentos históricos, guias e notícias sobre suas atividades ativistas.",
  "best_portals_mit_desc2": "É particularmente útil para quem procura apoio direto, aconselhamento jurídico ou deseja compreender as batalhas políticas e civis que afetam a comunidade na Itália.",
  "best_portals_associazioni_title": "4. Portais de Associações Locais (ex. Arcigay, Hub Trans)",
  "best_portals_associazioni_desc1": "Muitas informações práticas essenciais podem ser encontradas nos sites ou páginas sociais de comitês locais e associações territoriais. Projetos como <em>Hub Trans</em> ou as mesas trans do Arcigay presentes em várias cidades italianas oferecem seções informativas em seus sites.",
  "best_portals_associazioni_desc2": "Esses portais são a melhor escolha quando você precisa saber <strong>como se locomover na sua cidade ou região específica</strong>, quais são os centros de aconselhamento amigáveis e como participar de grupos de autoajuda físicos.",
  "best_portals_how_to_choose_title": "Como Escolher a Fonte Certa?",
  "best_portals_how_to_choose_intro": "Ao procurar informações sobre saúde trans e caminhos de afirmação, siga sempre estas regras de ouro:",
  "best_portals_how_to_choose_li1": "<strong>Verifique as fontes:</strong> Portais sérios sempre citam estudos acadêmicos, manuais de diagnóstico (ex., DSM-5) ou diretrizes de associações médicas reconhecidas.",
  "best_portals_how_to_choose_li2": "<strong>Evite tons sensacionalistas:</strong> Desconfie de quem promete soluções \"mágicas\" ou, inversamente, utiliza linguagem alarmista e patologizante.",
  "best_portals_how_to_choose_li3": "<strong>Busque pluralidade:</strong> Compare fontes diferentes. A jornada de cada pessoa é única e informações de qualidade são o primeiro passo para fazer escolhas serenas e conscientes.",
  "best_portals_how_to_choose_outro": "Tem dúvidas específicas? Tente pesquisar na nossa <a href=\"/wiki\" class=\"text-primary underline hover:no-underline\">Wiki</a> ou utilize as nossas ferramentas para encontrar respostas claras apoiadas pela ciência."
};

function updateFile(filePath, translations) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  Object.assign(data, translations);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

updateFile(itPath, itTranslations);
updateFile(enPath, enTranslations);
updateFile(esPath, esTranslations);
updateFile(ptPath, ptTranslations);

console.log('Translations updated successfully.');
