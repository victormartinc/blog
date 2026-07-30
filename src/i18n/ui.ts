/**
 * Textos de la interfície. El contingut dels posts viu al Markdown; això és
 * només el marc: capçalera, portada, peus i missatges.
 *
 * `ca` és la llengua completa de referència. Les altres dues es tipen contra
 * ella (`Record<keyof typeof ca, string>`), o sigui que oblidar-se una clau
 * en afegir-la peta al `npm run check` en comptes de sortir en blanc a
 * producció.
 *
 * Vocabulari: es diuen **posts** a les tres llengües, no «números». El
 * disseny continua sent de revista (segell, capçalera de diari, colofó) però
 * la paraula que llegeix l'usuari és la que espera d'un blog.
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
  "lloc.nom": "Víctor Martín",
  "lloc.lema": "Quadern de tecnologia",
  "lloc.descripcio":
    "Notes al marge sobre programari, sistemes i IA aplicada. Posts sense periodicitat fixa, escrits per Víctor Martín Castilla des de Manresa.",

  "a11y.saltar": "Salta al contingut",
  "a11y.tema": "Canvia el tema",
  "a11y.llengua": "Llengua",
  "a11y.inici": "Inici",

  "nav.portfolio": "victormartinc.com",
  "nav.feed": "RSS",

  "portada.ultim": "últim post",
  "portada.hemeroteca": "tots els posts",
  "portada.etiquetes": "índex d'etiquetes",
  "portada.buida":
    "Encara no hi ha cap post en català. El primer arribarà aviat; mentrestant, potser el trobes en una altra llengua.",
  "portada.llegir": "Llegeix-lo",

  "post.abrev": "Post",
  "post.lectura": "{n} min de lectura",
  "post.actualitzat": "Actualitzat el {data}",
  "post.sumari": "sumari",
  "post.anterior": "post anterior",
  "post.seguent": "post següent",
  "post.copia": "copia",
  "post.copiat": "copiat",
  "post.ancora": "Enllaç a aquesta secció",

  "firma.text": "Víctor Martín Castilla",
  "firma.peu": "Enginyer de sistemes TIC · Manresa\nEscriu-me: victor@victormartinc.com",

  "etiqueta.titol": "Etiqueta",
  "etiqueta.compte": "{n} posts amb aquesta etiqueta",
  "etiqueta.compte1": "1 post amb aquesta etiqueta",
  "etiqueta.tornar": "Tornar a la portada",

  "colofo.lema": "Les coses importants es pensen dues vegades.",
  "colofo.text":
    "Generat com a HTML estàtic amb Astro i servit des d'un VPS propi, sense rastrejadors de tercers. El codi és a {codi}.",
  "colofo.codi": "GitHub",
  "colofo.enllacos": "Enllaços",
  "colofo.portfolio": "Portfolio i CV",
  "colofo.correu": "Escriu-me",
  "colofo.feed": "Feed RSS",
  "colofo.drets": "© {any} Víctor Martín Castilla",

  "err.titol": "Aquest post no existeix",
  "err.text":
    "L'adreça no correspon a cap post publicat. Potser l'enllaç és antic o hi ha una errata en el camí.",
  "err.tornar": "Tornar a la portada",
  "err.segell": "404",
} as const;

const es: Record<keyof typeof ca, string> = {
  "lloc.nom": "Víctor Martín",
  "lloc.lema": "Cuaderno de tecnología",
  "lloc.descripcio":
    "Notas al margen sobre software, sistemas e IA aplicada. Posts sin periodicidad fija, escritos por Víctor Martín Castilla desde Manresa.",

  "a11y.saltar": "Saltar al contenido",
  "a11y.tema": "Cambiar el tema",
  "a11y.llengua": "Idioma",
  "a11y.inici": "Inicio",

  "nav.portfolio": "victormartinc.com",
  "nav.feed": "RSS",

  "portada.ultim": "último post",
  "portada.hemeroteca": "todos los posts",
  "portada.etiquetes": "índice de etiquetas",
  "portada.buida":
    "Todavía no hay ningún post en castellano. El primero llegará pronto; mientras tanto, quizá lo encuentres en otro idioma.",
  "portada.llegir": "Leerlo",

  "post.abrev": "Post",
  "post.lectura": "{n} min de lectura",
  "post.actualitzat": "Actualizado el {data}",
  "post.sumari": "sumario",
  "post.anterior": "post anterior",
  "post.seguent": "post siguiente",
  "post.copia": "copiar",
  "post.copiat": "copiado",
  "post.ancora": "Enlace a esta sección",

  "firma.text": "Víctor Martín Castilla",
  "firma.peu": "Ingeniero de sistemas TIC · Manresa\nEscríbeme: victor@victormartinc.com",

  "etiqueta.titol": "Etiqueta",
  "etiqueta.compte": "{n} posts con esta etiqueta",
  "etiqueta.compte1": "1 post con esta etiqueta",
  "etiqueta.tornar": "Volver a la portada",

  "colofo.lema": "Las cosas importantes se piensan dos veces.",
  "colofo.text":
    "Generado como HTML estático con Astro y servido desde un VPS propio, sin rastreadores de terceros. El código está en {codi}.",
  "colofo.codi": "GitHub",
  "colofo.enllacos": "Enlaces",
  "colofo.portfolio": "Portfolio y CV",
  "colofo.correu": "Escríbeme",
  "colofo.feed": "Feed RSS",
  "colofo.drets": "© {any} Víctor Martín Castilla",

  "err.titol": "Este post no existe",
  "err.text":
    "La dirección no corresponde a ningún post publicado. Quizá el enlace sea antiguo o haya una errata en la ruta.",
  "err.tornar": "Volver a la portada",
  "err.segell": "404",
};

const en: Record<keyof typeof ca, string> = {
  "lloc.nom": "Víctor Martín",
  "lloc.lema": "A notebook on technology",
  "lloc.descripcio":
    "Notes in the margin on software, systems and applied AI. Posts on no fixed schedule, written by Víctor Martín Castilla from Manresa.",

  "a11y.saltar": "Skip to content",
  "a11y.tema": "Toggle theme",
  "a11y.llengua": "Language",
  "a11y.inici": "Home",

  "nav.portfolio": "victormartinc.com",
  "nav.feed": "RSS",

  "portada.ultim": "latest post",
  "portada.hemeroteca": "all posts",
  "portada.etiquetes": "tag index",
  "portada.buida":
    "There are no posts in English yet. The first one is on its way; in the meantime, you may find it in another language.",
  "portada.llegir": "Read it",

  "post.abrev": "Post",
  "post.lectura": "{n} min read",
  "post.actualitzat": "Updated on {data}",
  "post.sumari": "contents",
  "post.anterior": "previous post",
  "post.seguent": "next post",
  "post.copia": "copy",
  "post.copiat": "copied",
  "post.ancora": "Link to this section",

  "firma.text": "Víctor Martín Castilla",
  "firma.peu": "ICT systems engineer · Manresa\nGet in touch: victor@victormartinc.com",

  "etiqueta.titol": "Tag",
  "etiqueta.compte": "{n} posts with this tag",
  "etiqueta.compte1": "1 post with this tag",
  "etiqueta.tornar": "Back to the front page",

  "colofo.lema": "The things that matter get thought through twice.",
  "colofo.text":
    "Built as static HTML with Astro and served from a self-hosted VPS, with no third-party trackers. The source lives on {codi}.",
  "colofo.codi": "GitHub",
  "colofo.enllacos": "Links",
  "colofo.portfolio": "Portfolio & CV",
  "colofo.correu": "Get in touch",
  "colofo.feed": "RSS feed",
  "colofo.drets": "© {any} Víctor Martín Castilla",

  "err.titol": "This post does not exist",
  "err.text":
    "That address doesn't match any published post. The link may be old, or there may be a typo in the path.",
  "err.tornar": "Back to the front page",
  "err.segell": "404",
};

export const UI = { ca, es, en } as const;
export type ClauUI = keyof typeof ca;

/**
 * Traductor per a una llengua. El segon argument substitueix els marcadors
 * `{nom}` del text.
 *
 *   const t = traductor("es");
 *   t("post.lectura", { n: 7 })   // → "7 min de lectura"
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
