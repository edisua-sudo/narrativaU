export interface ScrollyCard {
  id: string;
  category: 'QUÉ' | 'DÓNDE' | 'CÓMO';
  categoryNumber: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  archivalBadge: string;
  details: string[];
  quote: string;
  quoteAuthor: string;
  aspectTag: string;
}

export const SCROLLY_CARDS: ScrollyCard[] = [
  // QUÉ (01 - 03)
  {
    id: 'que-arqueologia',
    category: 'QUÉ',
    categoryNumber: '01',
    number: '01.01',
    title: 'Arqueología Literaria & Crítica Textual',
    subtitle: 'El texto no nació encuadernado: fue esculpido a lo largo de milenios.',
    description: 'Abordamos la literatura bíblica no como un monolito inmutable, sino como un palimpsesto vivo donde confluyen variantes textuales masoréticas, fragmentos del Mar Muerto (Qumrán) y la Septuaginta griega.',
    archivalBadge: 'Códice B19a · Qumrán 1QIsa',
    details: [
      'Cotejo paleográfico de variantes manuscritas',
      'Desarticulación de erratas de copistas antiguos',
      'Reconstrucción de la vocalización tiberiana'
    ],
    quote: 'La letra escrita en piedra o cuero guarda la memoria de comunidades en crisis política y teológica.',
    quoteAuthor: 'Prof. Emmanuel Tov, Crítica Textual',
    aspectTag: 'Paleografía'
  },
  {
    id: 'que-hermeneutica',
    category: 'QUÉ',
    categoryNumber: '01',
    number: '01.02',
    title: 'Hermenéutica Universitaria & Estructuralismo',
    subtitle: 'Decodificar la poética hebrea en su matriz sintáctica y retórica.',
    description: 'Enseñamos a desglosar las estructuras quiásticas, los paralelismos antitéticos y la polifonía de narradores. La universidad es el espacio idóneo para devolverle al texto su complejidad literaria.',
    archivalBadge: 'Poética & Retórica Semítica',
    details: [
      'Análisis de quiasmos (A-B-C-B-A) en la prosa narrativa',
      'Caracterización psicológica de personajes arquetípicos',
      'Desmitificación de tropos patriarcales y relectura crítica'
    ],
    quote: 'El arte de la narrativa bíblica radica en lo que calla tanto como en lo que nombra.',
    quoteAuthor: 'Robert Alter, The Art of Biblical Narrative',
    aspectTag: 'Estructuralismo'
  },
  {
    id: 'que-semiotica',
    category: 'QUÉ',
    categoryNumber: '01',
    number: '01.03',
    title: 'Semiótica de los Géneros Literarios',
    subtitle: 'Del mito de orígenes a la novela de corte y la literatura apocalíptica.',
    description: 'Distinguir entre crónica monárquica de propaganda, sátira profética y canto cúltico es el primer deber del exégeta riguroso. Cada género impone sus propias reglas de verosimilitud.',
    archivalBadge: 'Gattungsgeschichte · Formgeschichte',
    details: [
      'Gattung (tipo literario) y Sitz im Leben (contexto vital)',
      'La sátira política en los oráculos contra las naciones',
      'Subversión narrativa en los libros de Jonás y Rut'
    ],
    quote: 'Leer poesía como si fuera historia o historia como si fuera doctrina es una mutilación textual.',
    quoteAuthor: 'Hermann Gunkel, Crítica de las Formas',
    aspectTag: 'Semiótica'
  },

  // DÓNDE (02)
  {
    id: 'donde-catedras',
    category: 'DÓNDE',
    categoryNumber: '02',
    number: '02.01',
    title: 'Cátedras Universitarias y Aulas Abiertas',
    subtitle: 'El claustro académico como territorio de indagación libre y sin censura.',
    description: 'Presencia en facultades de Humanidades, Filosofía, Literatura y Ciencias Sociales en América Latina y Europa. Espacios dialécticos donde conviven laicismo, fe y duda metódica.',
    archivalBadge: 'Campus Presencial & Sincrónico',
    details: [
      'Seminarios de lectura lenta (Close Reading)',
      'Debates en torno a manuscritos digitalizados en ultra-alta resolución',
      'Encuentros multidisciplinarios con departamentos de Lingüística'
    ],
    quote: 'El aula universitaria restituye al estudiante la soberanía sobre su propia lectura.',
    quoteAuthor: 'Gabinete Académico NarrativaU',
    aspectTag: 'Campus Universitario'
  },
  {
    id: 'donde-laboratorios',
    category: 'DÓNDE',
    categoryNumber: '02',
    number: '02.02',
    title: 'Laboratorios Digitales de Papirología',
    subtitle: 'Tecnología espectral al servicio de la filología clásica.',
    description: 'Nuestra plataforma virtual conecta a investigadores con los archivos fotográficos infrarrojos del Códice Sinaítico, los Papiros Bodmer y la Biblioteca Vaticana con herramientas de anotación colaborativa.',
    archivalBadge: 'Archivo Digitalizado · 8K Multispectral',
    details: [
      'Visores de imágenes multiespectrales para tintas borradas (palimpsestos)',
      'Herramientas de transcripción filológica interlineal',
      'Repositorio abierto de artículos arbitrados'
    ],
    quote: 'Ver los poros del pergamino nos recuerda la humanidad de quien empuñó la pluma.',
    quoteAuthor: 'Dra. María Elena Restrepo',
    aspectTag: 'Papirología'
  },

  // CÓMO (03)
  {
    id: 'como-capas',
    category: 'CÓMO',
    categoryNumber: '03',
    number: '03.01',
    title: 'Decodificación por Capas Arqueológicas',
    subtitle: 'El método central de NarrativaU: pelar las capas del texto como un estrato geológico.',
    description: '1) El sustrato material y lingüístico; 2) La redacción pre-exílica y exílica; 3) La canonización helenística; y 4) La recepción contemporánea en la literatura universal.',
    archivalBadge: 'Metodología Estratigráfica',
    details: [
      'Capa Material: Paleografía, copistas, lecciones variantes',
      'Capa Histórica: Contexto geopolítico de Babilonia, Persia y Roma',
      'Capa Retórica: Dispositivos estéticos y persuasión'
    ],
    quote: 'Desenterrar el texto no lo destruye; le otorga vida duradera.',
    quoteAuthor: 'NarrativaU Metodología MMXXVI',
    aspectTag: 'Scrollytelling'
  },
  {
    id: 'como-exegesis',
    category: 'CÓMO',
    categoryNumber: '03',
    number: '03.02',
    title: 'Exégesis Histórico-Crítica Desdogmatizada',
    subtitle: 'Rigor filológico por encima de cualquier presupuesto doctrinal preconcebido.',
    description: 'Nos distanciamos de interpretaciones apologéticas o fundamentalistas. Tratamos el texto con el mismo respeto y agudeza analítica con que un helenista aborda la Ilíada o la Odisea.',
    archivalBadge: 'Filología Rigurosa',
    details: [
      'Independencia académica y pensamiento crítico universitario',
      'Herramientas semíticas comparativas (Ugarítico, Arameo, Acadio)',
      'Publicaciones en revistas indexadas de humanidades'
    ],
    quote: 'La honestidad intelectual es el único tributo legítimo que merece la gran literatura.',
    quoteAuthor: 'Paul Ricoeur, Hermenéutica',
    aspectTag: 'Exégesis'
  }
];

export interface ManuscriptHotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  label: string;
  term: string;
  hebrew: string;
  etymology: string;
  significance: string;
}

export const MANUSCRIPT_SAMPLE = {
  title: 'El Relato Cosmoteológico (Bereshit / Génesis 1:1-3)',
  codex: 'Codex Leningradensis (B19a)',
  shelfmark: 'Firkovich B 19 A, fol. 1v',
  date: '1008 d.C. (Tradición Masorética de Aaron ben Asher)',
  material: 'Pergamino de vitela curtida, tinta de carbón vegetal y agallas de roble',
  
  layer1: {
    title: 'Capa I: Papiro & Tinta Histórica',
    subtitle: 'Arqueología del soporte y paleografía masorética',
    description: 'Observe la textura de la piel animal, los trazos caligráficos cuadrados y las notas masoréticas marginales (Masora Parva y Masora Magna) preservadas por escribas tiberianos.',
    visualNote: 'Trazos en negro ferrogalico con degradación natural del siglo XI d.C.'
  },
  layer2: {
    title: 'Capa II: Transcripción & Filología',
    subtitle: 'Lectura paleo-hebrea, vocalización tiberiana y lemas',
    hebrewText: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃',
    transliteration: 'Bəre’shīt bará’ ’Elohīm ’ēt hashāmayīm wə’ēt ha’ārets.',
    phonetic: 'be-reh-SHEET bah-RAH e-lo-HEEM et ha-sha-MA-yim ve-et ha-AH-rets',
    translation: '«En el principio de la creación divina del cielo y la tierra... [o bien: Cuando en un principio comenzó Dios a crear...]»',
    description: 'La sintaxis del versículo 1 es una cláusula temporal en estado constructo (*bəre’shīt* sin artículo determinado), dialogando directamente con el poema babilónico Enuma Elish.'
  },
  layer3: {
    title: 'Capa III: Hermenéutica & Crítica Universitaria',
    subtitle: 'Retórica sacerdotal, desmitificación cósmica y teología política',
    description: 'El relato no es un manual de física ni un catecismo doctrinal: es una obra maestra de resistencia literaria redactada durante el Exilio en Babilonia (siglo VI a.C.). El sol y la luna no son dioses (como Shamash o Sin), sino meras "luminarias" (*me’orot*), artefactos mecánicos puestos al servicio de la vida.',
    chiasmStructure: 'Estructura Simétrica de 7 Días: Tríada de Separaciones (Días 1-3) / Tríada de Poblaciones (Días 4-6) / El Clímax del Sábado (Día 7)',
    academicKeywords: ['Desmitificación sacerdotal', 'Enuma Elish intertextual', 'Cosmología del Antiguo Cercano Oriente']
  },

  hotspots: [
    {
      id: 'spot-bereshit',
      x: 82,
      y: 28,
      label: 'Bəre’shīt',
      term: 'בְּרֵאשִׁית',
      hebrew: 'בְּרֵאשִׁית',
      etymology: 'Raíz ר-א-ש (rosh, cabeza o comienzo) con preposición בְּ en estado constructo.',
      significance: 'Al carecer de artículo determinado ("ha-"), el hebreo no dice "En EL principio absoluto", sino "Al comienzo de crear...". Abre la posibilidad de preexistencia del caos acuático primordial (*tehom*).'
    },
    {
      id: 'spot-bara',
      x: 64,
      y: 28,
      label: 'Bará’',
      term: 'בָּרָא',
      hebrew: 'בָּרָא',
      etymology: 'Verbo que en la Biblia hebrea tiene EXCLUSIVAMENTE a Dios como sujeto gramatical.',
      significance: 'Ningún ser humano "bará". Implica una acción creadora sin esfuerzo físico ni teomaquia (guerra entre dioses), transformando el caos en orden mediante la palabra poética.'
    },
    {
      id: 'spot-ruach',
      x: 45,
      y: 56,
      label: 'Rūaḥ ’Elohīm',
      term: 'רוּחַ אֱלֹהִים',
      hebrew: 'רוּחַ אֱלֹהִים',
      etymology: 'Rūaḥ: Viento, aliento vital, espíritu tempestuoso.',
      significance: 'El viento divino que aletea (*merajéfet*) sobre las aguas abismales (*tehom*, cognado del monstruo Tiamat). Imagen de un ave protegiendo su nido o un viento impetuoso previo al amanecer.'
    }
  ]
};

export const LUISA_CAJAMARCA_TESTIMONIAL = {
  quote: "Descubrir la narrativa bíblica en la universidad no fue solo un ejercicio académico; fue desenterrar las voces silenciadas del texto, comprender la poética hebrea en su matriz original y recuperar una lectura crítica que desafía el dogmatismo contemporáneo.",
  author: "Luisa Cajamarca",
  role: "Investigadora en Literatura Comparada & Becaria NarrativaU",
  institution: "Facultad de Humanidades · Cátedra de Estudios Bíblicos Críticos",
  year: "Cohorte 2025-2026",
  essayTitle: "«El silencio de Sara y la polifonía del Génesis: una lectura despatriarcalizada»"
};
