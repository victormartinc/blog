/**
 * Textos de la interfície. El contingut dels números viu al Markdown; això
 * és només el marc: capçalera, portada, peus i missatges.
 *
 * `ca` és la llengua completa de referència. Les altres dues es tipen
 * contra ella (`Record<keyof typeof ca, string>`), o sigui que oblidar-se
 * una clau en afegir-la peta al `npm run check` en comptes de sortir en
 * blanc a producció.
 */

export const LLENGUES = ["ca", "es", "en"] as const;
export type Llengua = (typeof LLENGUES)[number];
export const LLENGUA_DEFECTE: Llengua = "ca";

/** Etiqueta del selector i atribut `lang`/`hreflang` complet. */
export const LLENGUA_INFO: Record<Llengua, { curt: string; nom: string; bcp47: string }> = {
  ca: { curt: "CA", nom: "Català", bcp47: "ca-ES" },
  es: { curt: "ES", nom: "Español", bcp47: "es-ES" },
  en: { curt: "EN", nom: "English", bcp47: "en" },
};

const ca = {
  "lloc.nom": "Marginalia",
  "lloc.lema": "Quadern mensual de tecnologia",
  "lloc.descripcio":
    "Notes al marge sobre programari, sistemes i IA aplicada. Un número al mes, escrit per Víctor Martín Castilla des de Manresa.",

  "a11y.saltar": "Salta al contingut",
  "a11y.tema": "Canvia el tema",
  "a11y.llengua": "Llengua",
  "a11y.inici": "Inici",

  "nav.portfolio": "victormartinc.com",
  "nav.feed": "RSS",

  "bandera.desde": "des de",
  "bandera.lloc": "Manresa, Catalunya",
  "bandera.unNumero": "1 número",
  "bandera.nNumeros": "{n} números",

  "portada.ultim": "últim número",
  "portada.hemeroteca": "hemeroteca",
  "portada.etiquetes": "índex d'etiquetes",
  "portada.buida":
    "Encara no hi ha cap número en català. El primer arribarà aviat; mentrestant, potser el trobes en una altra llengua.",
  "portada.llegir": "Llegeix el número",

  "num.abrev": "Núm.",
  "num.exemplar": "número",
  "num.lectura": "{n} min de lectura",
  "num.actualitzat": "Actualitzat el {data}",
  "num.sumari": "sumari del número",
  "num.anterior": "número anterior",
  "num.seguent": "número següent",
  "num.tambeEn": "També en",
  "num.copia": "copia",
  "num.copiat": "copiat",
  "num.ancora": "Enllaç a aquesta secció",

  "firma.text": "Víctor Martín Castilla",
  "firma.peu": "Enginyer de sistemes TIC · Manresa\nEscriu-me: victor@victormartinc.com",

  "etiqueta.titol": "Etiqueta",
  "etiqueta.compte": "{n} números amb aquesta etiqueta",
  "etiqueta.compte1": "1 número amb aquesta etiqueta",
  "etiqueta.tornar": "Tornar a la portada",

  "colofo.lema": "Les coses importants es pensen dues vegades.",
  "colofo.text":
    "Marginalia es compon en Fraunces, Source Serif 4 i IBM Plex Mono. Generat com a HTML estàtic amb Astro i servit des d'un VPS propi, sense rastrejadors de tercers. El codi és a {codi}.",
  "colofo.codi": "GitHub",
  "colofo.enllacos": "Enllaços",
  "colofo.portfolio": "Portfolio i CV",
  "colofo.correu": "Escriu-me",
  "colofo.feed": "Feed RSS",
  "colofo.drets": "© {any} Víctor Martín Castilla",

  "err.titol": "Aquest número no existeix",
  "err.text":
    "L'adreça no correspon a cap número publicat. Potser l'enllaç és antic o hi ha una errata en el camí.",
  "err.tornar": "Tornar a la portada",
  "err.segell": "404",
} as const;

const es: Record<keyof typeof ca, string> = {
  "lloc.nom": "Marginalia",
  "lloc.lema": "Cuaderno mensual de tecnología",
  "lloc.descripcio":
    "Notas al margen sobre software, sistemas e IA aplicada. Un número al mes, escrito por Víctor Martín Castilla desde Manresa.",

  "a11y.saltar": "Saltar al contenido",
  "a11y.tema": "Cambiar el tema",
  "a11y.llengua": "Idioma",
  "a11y.inici": "Inicio",

  "nav.portfolio": "victormartinc.com",
  "nav.feed": "RSS",

  "bandera.desde": "desde",
  "bandera.lloc": "Manresa, Cataluña",
  "bandera.unNumero": "1 número",
  "bandera.nNumeros": "{n} números",

  "portada.ultim": "último número",
  "portada.hemeroteca": "hemeroteca",
  "portada.etiquetes": "índice de etiquetas",
  "portada.buida":
    "Todavía no hay ningún número en castellano. El primero llegará pronto; mientras tanto, quizá lo encuentres en otro idioma.",
  "portada.llegir": "Leer el número",

  "num.abrev": "Núm.",
  "num.exemplar": "número",
  "num.lectura": "{n} min de lectura",
  "num.actualitzat": "Actualizado el {data}",
  "num.sumari": "sumario del número",
  "num.anterior": "número anterior",
  "num.seguent": "número siguiente",
  "num.tambeEn": "También en",
  "num.copia": "copiar",
  "num.copiat": "copiado",
  "num.ancora": "Enlace a esta sección",

  "firma.text": "Víctor Martín Castilla",
  "firma.peu": "Ingeniero de sistemas TIC · Manresa\nEscríbeme: victor@victormartinc.com",

  "etiqueta.titol": "Etiqueta",
  "etiqueta.compte": "{n} números con esta etiqueta",
  "etiqueta.compte1": "1 número con esta etiqueta",
  "etiqueta.tornar": "Volver a la portada",

  "colofo.lema": "Las cosas importantes se piensan dos veces.",
  "colofo.text":
    "Marginalia se compone en Fraunces, Source Serif 4 e IBM Plex Mono. Generado como HTML estático con Astro y servido desde un VPS propio, sin rastreadores de terceros. El código está en {codi}.",
  "colofo.codi": "GitHub",
  "colofo.enllacos": "Enlaces",
  "colofo.portfolio": "Portfolio y CV",
  "colofo.correu": "Escríbeme",
  "colofo.feed": "Feed RSS",
  "colofo.drets": "© {any} Víctor Martín Castilla",

  "err.titol": "Este número no existe",
  "err.text":
    "La dirección no corresponde a ningún número publicado. Quizá el enlace sea antiguo o haya una errata en la ruta.",
  "err.tornar": "Volver a la portada",
  "err.segell": "404",
};

const en: Record<keyof typeof ca, string> = {
  "lloc.nom": "Marginalia",
  "lloc.lema": "A monthly notebook on technology",
  "lloc.descripcio":
    "Notes in the margin on software, systems and applied AI. One issue a month, written by Víctor Martín Castilla from Manresa.",

  "a11y.saltar": "Skip to content",
  "a11y.tema": "Toggle theme",
  "a11y.llengua": "Language",
  "a11y.inici": "Home",

  "nav.portfolio": "victormartinc.com",
  "nav.feed": "RSS",

  "bandera.desde": "since",
  "bandera.lloc": "Manresa, Catalonia",
  "bandera.unNumero": "1 issue",
  "bandera.nNumeros": "{n} issues",

  "portada.ultim": "latest issue",
  "portada.hemeroteca": "back issues",
  "portada.etiquetes": "tag index",
  "portada.buida":
    "There are no issues in English yet. The first one is on its way; in the meantime, you may find it in another language.",
  "portada.llegir": "Read the issue",

  "num.abrev": "No.",
  "num.exemplar": "issue",
  "num.lectura": "{n} min read",
  "num.actualitzat": "Updated on {data}",
  "num.sumari": "in this issue",
  "num.anterior": "previous issue",
  "num.seguent": "next issue",
  "num.tambeEn": "Also in",
  "num.copia": "copy",
  "num.copiat": "copied",
  "num.ancora": "Link to this section",

  "firma.text": "Víctor Martín Castilla",
  "firma.peu": "ICT systems engineer · Manresa\nGet in touch: victor@victormartinc.com",

  "etiqueta.titol": "Tag",
  "etiqueta.compte": "{n} issues with this tag",
  "etiqueta.compte1": "1 issue with this tag",
  "etiqueta.tornar": "Back to the front page",

  "colofo.lema": "The things that matter get thought through twice.",
  "colofo.text":
    "Marginalia is set in Fraunces, Source Serif 4 and IBM Plex Mono. Built as static HTML with Astro and served from a self-hosted VPS, with no third-party trackers. The source lives on {codi}.",
  "colofo.codi": "GitHub",
  "colofo.enllacos": "Links",
  "colofo.portfolio": "Portfolio & CV",
  "colofo.correu": "Get in touch",
  "colofo.feed": "RSS feed",
  "colofo.drets": "© {any} Víctor Martín Castilla",

  "err.titol": "This issue does not exist",
  "err.text":
    "That address doesn't match any published issue. The link may be old, or there may be a typo in the path.",
  "err.tornar": "Back to the front page",
  "err.segell": "404",
};

export const UI = { ca, es, en } as const;
export type ClauUI = keyof typeof ca;

/**
 * Traductor per a una llengua. El segon argument substitueix els
 * marcadors `{nom}` del text.
 *
 *   const t = traductor("es");
 *   t("num.lectura", { n: 7 })   // → "7 min de lectura"
 */
export function traductor(llengua: Llengua) {
  const dicc = UI[llengua] ?? UI[LLENGUA_DEFECTE];
  return function t(clau: ClauUI, valors?: Record<string, string | number>): string {
    let text: string = dicc[clau] ?? UI[LLENGUA_DEFECTE][clau] ?? clau;
    if (valors) {
      for (const [nom, valor] of Object.entries(valors)) {
        text = text.replaceAll(`{${nom}}`, String(valor));
      }
    }
    return text;
  };
}

/** `true` si el codi rebut és una de les tres llengües del lloc. */
export function esLlengua(valor: unknown): valor is Llengua {
  return typeof valor === "string" && (LLENGUES as readonly string[]).includes(valor);
}
